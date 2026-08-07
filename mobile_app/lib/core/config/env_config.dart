/// Environment configuration for Namma Prahari Citizen Mobile App.
class EnvConfig {
  static const String supabaseUrl = String.fromEnvironment('SUPABASE_URL', defaultValue: 'https://placeholder.supabase.co');
  static const String supabaseAnonKey = String.fromEnvironment('SUPABASE_ANON_KEY', defaultValue: 'placeholder-anon-key');
  static const String googleMapsApiKey = String.fromEnvironment('GOOGLE_MAPS_API_KEY', defaultValue: '');
}
