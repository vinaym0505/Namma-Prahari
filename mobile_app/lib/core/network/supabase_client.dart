import 'package:supabase_flutter/supabase_flutter.dart';
import '../config/env_config.dart';

/// Singleton wrapper for initializing Supabase Flutter client.
class SupabaseService {
  SupabaseService._();

  static bool _initialized = false;

  static Future<void> initialize() async {
    if (_initialized) return;

    if (EnvConfig.supabaseUrl.isNotEmpty && EnvConfig.supabaseAnonKey.isNotEmpty) {
      await Supabase.initialize(
        url: EnvConfig.supabaseUrl,
        anonKey: EnvConfig.supabaseAnonKey,
        authOptions: const FlutterAuthClientOptions(
          authFlowType: AuthFlowType.pkce,
        ),
      );
      _initialized = true;
    }
  }

  static SupabaseClient get client => Supabase.instance.client;
  static User? get currentUser => client.auth.currentUser;
  static bool get isAuthenticated => client.auth.currentSession != null;
}
