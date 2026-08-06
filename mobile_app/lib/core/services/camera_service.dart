import 'dart:io';
import 'package:camera/camera.dart';
import 'package:flutter/foundation.dart';

/// Camera Manager Service for Namma Prahari Citizen App.
/// Controls hardware camera initialization, flash toggles, and photo capture.
class CameraService {
  CameraService._();

  static final CameraService instance = CameraService._();

  CameraController? _controller;
  List<CameraDescription> _cameras = [];
  bool _isInitialized = false;
  int _selectedCameraIndex = 0;

  CameraController? get controller => _controller;
  bool get isInitialized => _isInitialized;

  Future<bool> initialize() async {
    try {
      if (kIsWeb) return false;
      _cameras = await availableCameras();
      if (_cameras.isEmpty) return false;

      _controller = CameraController(
        _cameras[_selectedCameraIndex],
        ResolutionPreset.high,
        enableAudio: false,
      );

      await _controller!.initialize();
      _isInitialized = true;
      return true;
    } catch (e) {
      _isInitialized = false;
      return false;
    }
  }

  Future<XFile?> takePicture() async {
    if (_controller == null || !_controller!.value.isInitialized) return null;
    if (_controller!.value.isTakingPicture) return null;

    try {
      final image = await _controller!.takePicture();
      return image;
    } catch (e) {
      return null;
    }
  }

  Future<void> dispose() async {
    await _controller?.dispose();
    _controller = null;
    _isInitialized = false;
  }
}
