part of 'auth_bloc.dart';

sealed class AuthEvent {}

class AuthEventLogin extends AuthEvent {
  final String email;
  final String password;

  AuthEventLogin(this.email, this.password);
}

class AuthCheckedLoggedEvent extends AuthEvent {}

class LogoutEvent extends AuthEvent {}

class LogoutSuccessEvent extends AuthEvent {}
