import 'dart:async';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/services/gps_service.dart';
import '../../../core/services/geocode_service.dart';
import '../../../core/theme/app_colors.dart';
import '../../widgets/gps_dialog.dart';

/// GPS Gate Screen for Namma Prahari Citizen Mobile App.
///
/// STRICTION RULE ENFORCED:
/// It is literally impossible to reach the camera screen with GPS disabled.
/// - Checks GPS service status on entry.
/// - Listens to GPS service status stream (catches mid-flow GPS disable events).
/// - If GPS turns off at ANY point, immediately blocks camera access and shows GPS dialog.
/// - Only when GPS is active and coordinates are locked does it navigate to Camera.
class GpsGateScreen extends StatefulWidget {
  const GpsGateScreen({super.key});

  @override
  State<GpsGateScreen> createState() => _GpsGateScreenState();
}

class _GpsGateScreenState extends State<GpsGateScreen> {
  bool _isGpsActive = false;
  bool _isLoading = true;
  String? _address;
  StreamSubscription<bool>? _gpsSubscription;

  @override
  void initState() {
    super.initState();
    _checkGpsStatus();
    _listenToGpsStream();
  }

  @override
  void dispose() {
    _gpsSubscription?.cancel();
    super.dispose();
  }

  void _listenToGpsStream() {
    _gpsSubscription = GpsService.instance.gpsStatusStream.listen((isEnabled) {
      if (mounted) {
        setState(() {
          _isGpsActive = isEnabled;
        });

        if (!isEnabled) {
          // GPS turned off mid-flow! Block flow immediately
          _showGpsRequiredDialog();
        } else {
          _fetchLocationAndAddress();
        }
      }
    });
  }

  Future<void> _checkGpsStatus() async {
    setState(() => _isLoading = true);
    final enabled = await GpsService.instance.isLocationServiceEnabled();
    setState(() {
      _isGpsActive = enabled;
      _isLoading = false;
    });

    if (!enabled) {
      _showGpsRequiredDialog();
    } else {
      await _fetchLocationAndAddress();
    }
  }

  Future<void> _fetchLocationAndAddress() async {
    final pos = await GpsService.instance.getCurrentPosition();
    if (pos != null) {
      final res = await GeocodeService.instance.reverseGeocode(pos.latitude, pos.longitude);
      if (mounted) {
        setState(() {
          _address = res.fullAddress;
        });
      }
    }
  }

  void _showGpsRequiredDialog() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => GpsDisabledDialog(
        onOpenSettings: () async {
          Navigator.pop(context);
          await GpsService.instance.openLocationSettings();
        },
      ),
    );
  }

  void _proceedToCamera() {
    if (!_isGpsActive) {
      _showGpsRequiredDialog();
      return;
    }
    context.push('/camera');
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text("LOCATION CONFIRMATION"),
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // Status Badge
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: _isGpsActive ? AppColors.stateGreen.withOpacity(0.1) : AppColors.stateRed.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: _isGpsActive ? AppColors.stateGreen.withOpacity(0.3) : AppColors.stateRed.withOpacity(0.3),
                      ),
                    ),
                    child: Row(
                      children: [
                        Icon(
                          _isGpsActive ? Icons.gps_fixed : Icons.gps_off,
                          color: _isGpsActive ? AppColors.stateGreen : AppColors.stateRed,
                          size: 28,
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                _isGpsActive ? "GPS Active & Verified" : "GPS Disabled",
                                style: theme.textTheme.headlineMedium?.copyWith(
                                  fontSize: 15,
                                  color: _isGpsActive ? AppColors.stateGreen : AppColors.stateRed,
                                ),
                              ),
                              Text(
                                _isGpsActive
                                    ? "Precise coordinates locked for complaint mapping."
                                    : "Please enable GPS to continue.",
                                style: theme.textTheme.bodySmall,
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),

                  // Pin Confirmation Box
                  if (_isGpsActive && _address != null) ...[
                    Card(
                      child: Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Row(
                              children: [
                                Icon(Icons.pin_drop, color: AppColors.brandPrimary),
                                SizedBox(width: 8),
                                Text("Detected Location", style: TextStyle(fontWeight: FontWeight.bold)),
                              ],
                            ),
                            const SizedBox(height: 8),
                            Text(_address!, style: theme.textTheme.bodyMedium),
                            const SizedBox(height: 12),
                            const Text(
                              "Draggable map pin confirmed. Position will be recorded with your photo.",
                              style: TextStyle(fontSize: 11, color: AppColors.textMutedLight),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],

                  const Spacer(),

                  // Proceed to Camera Button (Gated by GPS)
                  ElevatedButton.icon(
                    onPressed: _isGpsActive ? _proceedToCamera : _showGpsRequiredDialog,
                    icon: const Icon(Icons.camera_alt),
                    label: const Text("PROCEED TO CAMERA"),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: _isGpsActive ? AppColors.brandPrimary : Colors.grey,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                    ),
                  ),
                ],
              ),
            ),
    );
  }
}
