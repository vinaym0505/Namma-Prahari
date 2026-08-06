import 'dart:async';
import 'package:geolocator/geolocator.dart';

/// Production-grade GPS Location & Permission Service for Namma Prahari.
/// Enforces mandatory GPS gate before camera opening and handles dynamic mid-flow GPS toggles.
class GpsService {
  GpsService._();

  static final GpsService _instance = GpsService._();
  static GpsService get instance => _instance;

  StreamSubscription<ServiceStatus>? _serviceStatusSubscription;

  /// Check if Location Services (GPS hardware) is enabled on the device.
  Future<bool> isLocationServiceEnabled() async {
    return await Geolocator.isLocationServiceEnabled();
  }

  /// Check current Location Permission status.
  Future<LocationPermission> checkPermission() async {
    return await Geolocator.checkPermission();
  }

  /// Request Location Permission from OS after showing rationale dialog.
  Future<LocationPermission> requestPermission() async {
    return await Geolocator.requestPermission();
  }

  /// Open device Location Settings page (Android Intent / iOS Settings).
  Future<bool> openLocationSettings() async {
    return await Geolocator.openLocationSettings();
  }

  /// Listen to real-time GPS hardware status changes (catches GPS turned off mid-flow).
  Stream<bool> get gpsStatusStream {
    return Geolocator.getServiceStatusStream().map(
      (status) => status == ServiceStatus.enabled,
    );
  }

  /// Fetch current high-accuracy Position.
  Future<Position?> getCurrentPosition() async {
    final serviceEnabled = await isLocationServiceEnabled();
    if (!serviceEnabled) return null;

    var permission = await checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await requestPermission();
      if (permission == LocationPermission.denied) return null;
    }

    if (permission == LocationPermission.deniedForever) return null;

    return await Geolocator.getCurrentPosition(
      desiredAccuracy: LocationAccuracy.high,
      timeLimit: const Duration(seconds: 10),
    );
  }
}
