part of 'auth_bloc.dart';

sealed class AuthEvent {}

class AuthEventLogin extends AuthEvent {
  final String email;
  final String password;

  AuthEventLogin(this.email, this.password);
}
