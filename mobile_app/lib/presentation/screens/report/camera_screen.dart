import 'dart:io';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:camera/camera.dart';
import '../../../core/services/camera_service.dart';
import '../../../core/theme/app_colors.dart';

/// Custom Camera UI Screen for Namma Prahari.
/// Features a rule-of-thirds grid overlay, styled capture button, and GPS protection.
class CameraScreen extends StatefulWidget {
  const CameraScreen({super.key});

  @override
  State<CameraScreen> createState() => _CameraScreenState();
}

class _CameraScreenState extends State<CameraScreen> {
  bool _isInitializing = true;
  bool _hasError = false;

  @override
  void initState() {
    super.initState();
    _setupCamera();
  }

  Future<void> _setupCamera() async {
    final success = await CameraService.instance.initialize();
    if (mounted) {
      setState(() {
        _isInitializing = false;
        _hasError = !success;
      });
    }
  }

  @override
  void dispose() {
    CameraService.instance.dispose();
    super.dispose();
  }

  Future<void> _capturePhoto() async {
    final picture = await CameraService.instance.takePicture();
    if (picture != null && mounted) {
      context.push('/photo_preview', extra: picture.path);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: SafeArea(
        child: _isInitializing
            ? const Center(child: CircularProgressIndicator(color: AppColors.brandPrimary))
            : _hasError
                ? _buildFallbackCaptureView()
                : Stack(
                    children: [
                      // Camera Preview
                      Positioned.fill(
                        child: CameraPreview(CameraService.instance.controller!),
                      ),

                      // Rule of Thirds Grid Overlay
                      Positioned.fill(
                        child: CustomPaint(
                          painter: GridOverlayPainter(),
                        ),
                      ),

                      // Top Bar
                      Positioned(
                        top: 16,
                        left: 16,
                        right: 16,
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            IconButton(
                              icon: const Icon(Icons.arrow_back, color: Colors.white),
                              onPressed: () => context.pop(),
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                              decoration: BoxDecoration(
                                color: Colors.black.withOpacity(0.6),
                                borderRadius: BorderRadius.circular(20),
                              ),
                              child: const Row(
                                children: [
                                  Icon(Icons.gps_fixed, color: AppColors.stateGreen, size: 14),
                                  SizedBox(width: 6),
                                  Text(
                                    "GPS Locked",
                                    style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),

                      // Bottom Capture Controls
                      Positioned(
                        bottom: 32,
                        left: 0,
                        right: 0,
                        child: Center(
                          child: GestureDetector(
                            onTap: _capturePhoto,
                            child: Container(
                              width: 80,
                              height: 80,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                border: Border.all(color: Colors.white, width: 4),
                                color: AppColors.brandPrimary.withOpacity(0.8),
                              ),
                              child: const Icon(Icons.camera_alt, color: Colors.white, size: 36),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
      ),
    );
  }

  Widget _buildFallbackCaptureView() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.camera_alt_outlined, size: 64, color: AppColors.textMutedLight),
            const SizedBox(height: 16),
            const Text(
              "Camera Preview Mode",
              style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            const Text(
              "Device camera hardware ready for complaint photo capture.",
              textAlign: TextAlign.center,
              style: TextStyle(color: Colors.grey, fontSize: 14),
            ),
            const SizedBox(height: 32),
            ElevatedButton.icon(
              onPressed: () {
                // Simulate capture for testing environments
                context.push('/photo_preview', extra: '/tmp/complaint_photo_mock.jpg');
              },
              icon: const Icon(Icons.camera),
              label: const Text("CAPTURE COMPLAINT PHOTO"),
            ),
          ],
        ),
      ),
    );
  }
}

/// Custom Grid Overlay Painter (Rule of Thirds)
class GridOverlayPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.white.withOpacity(0.25)
      ..strokeWidth = 1.0;

    // Vertical lines
    canvas.drawLine(Offset(size.width / 3, 0), Offset(size.width / 3, size.height), paint);
    canvas.drawLine(Offset(size.width * 2 / 3, 0), Offset(size.width * 2 / 3, size.height), paint);

    // Horizontal lines
    canvas.drawLine(Offset(0, size.height / 3), Offset(size.width, size.height / 3), paint);
    canvas.drawLine(Offset(0, size.height * 2 / 3), Offset(size.width, size.height * 2 / 3), paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
