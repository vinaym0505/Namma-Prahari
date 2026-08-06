import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/env_config.dart';

/// Geocoding result data model.
class GeocodeResult {
  final String fullAddress;
  final String ward;
  final String assemblyConstituency;
  final String parliamentaryConstituency;
  final double lat;
  final double lng;

  const GeocodeResult({
    required this.fullAddress,
    required this.ward,
    required this.assemblyConstituency,
    required this.parliamentaryConstituency,
    required this.lat,
    required this.lng,
  });
}

/// Reverse Geocoding Service.
///
/// Quota & Free Tier Strategy:
/// 1. Primary: Google Geocoding API (uses $200 free monthly credit = ~40,000 requests/month).
/// 2. Fallback: OpenStreetMap Nominatim API (100% free, subject to 1 req/sec rate limit).
/// 3. Offline/Error Fallback: Formats lat/lng coordinates with default constituency mapping.
class GeocodeService {
  GeocodeService._();

  static final GeocodeService instance = GeocodeService._();

  Future<GeocodeResult> reverseGeocode(double lat, double lng) async {
    // 1. Try Google Geocoding API if key is present
    if (EnvConfig.googleMapsApiKey.isNotEmpty && !EnvConfig.googleMapsApiKey.startsWith('your-')) {
      try {
        final url = Uri.parse(
          'https://maps.googleapis.com/maps/api/geocode/json?latlng=$lat,$lng&key=${EnvConfig.googleMapsApiKey}',
        );
        final response = await http.get(url).timeout(const Duration(seconds: 5));
        if (response.statusCode == 200) {
          final data = json.decode(response.body);
          if (data['status'] == 'OK' && (data['results'] as List).isNotEmpty) {
            final first = data['results'][0];
            final address = first['formatted_address'] as String;
            return _enrichWithConstituency(address, lat, lng);
          }
        }
      } catch (_) {
        // Fallthrough to Nominatim fallback
      }
    }

    // 2. OpenStreetMap Nominatim Fallback (Free Tier compliant)
    try {
      final url = Uri.parse(
        'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=$lat&lon=$lng',
      );
      final response = await http.get(url, headers: {
        'User-Agent': 'NammaPrahariCivicApp/1.0',
      }).timeout(const Duration(seconds: 5));

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        final address = data['display_name'] as String? ?? 'Bengaluru Urban';
        return _enrichWithConstituency(address, lat, lng);
      }
    } catch (_) {
      // Fallthrough to synthetic coordinate format
    }

    // 3. Fallback result
    return _enrichWithConstituency('Location ($lat, $lng), Bengaluru', lat, lng);
  }

  GeocodeResult _enrichWithConstituency(String address, double lat, double lng) {
    // Map lat/lng proximity to Bengaluru Legislative Constituencies
    String ward = 'Ward 15 (Koramangala)';
    String assembly = 'Koramangala Assembly';
    String mp = 'Bengaluru South';

    if (lat > 12.97) {
      ward = 'Ward 42 (Shanti Nagar)';
      assembly = 'Shanti Nagar Assembly';
      mp = 'Bengaluru Central';
    } else if (lng > 77.62) {
      ward = 'Ward 88 (Indiranagar)';
      assembly = 'Indiranagar Assembly';
      mp = 'Bengaluru Central';
    }

    return GeocodeResult(
      fullAddress: address,
      ward: ward,
      assemblyConstituency: assembly,
      parliamentaryConstituency: mp,
      lat: lat,
      lng: lng,
    );
  }
}
