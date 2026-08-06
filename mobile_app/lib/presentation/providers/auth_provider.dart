import 'package:flutter_riverpod/flutter_riverpod.dart';

enum AuthStatus { unauthenticated, authenticating, authenticated, error }

class AuthState {
  final AuthStatus status;
  final String? userId;
  final String? userName;
  final String? userEmail;
  final String? errorMessage;

  const AuthState({
    required this.status,
    this.userId,
    this.userName,
    this.userEmail,
    this.errorMessage,
  });

  factory AuthState.initial() => const AuthState(status: AuthStatus.unauthenticated);

  AuthState copyWith({
    AuthStatus? status,
    String? userId,
    String? userName,
    String? userEmail,
    String? errorMessage,
  }) {
    return AuthState(
      status: status ?? this.status,
      userId: userId ?? this.userId,
      userName: userName ?? this.userName,
      userEmail: userEmail ?? this.userEmail,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }
}

class AuthNotifier extends StateNotifier<AuthState> {
  AuthNotifier() : super(AuthState.initial());

  Future<void> signInWithGoogle() async {
    state = state.copyWith(status: AuthStatus.authenticating);
    try {
      // Perform Google Auth sign-in flow via Supabase
      // On success:
      state = state.copyWith(
        status: AuthStatus.authenticated,
        userId: 'citizen-demo-user-id',
        userName: 'Citizen Sentinel',
        userEmail: 'citizen@nammaprahari.gov.in',
      );
    } catch (e) {
      state = state.copyWith(
        status: AuthStatus.error,
        errorMessage: e.toString(),
      );
    }
  }

  Future<void> signOut() async {
    state = AuthState.initial();
  }
}

final authProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  return AuthNotifier();
});
