part of 'auth_bloc.dart';

sealed class AuthState {}

final class AuthInitial extends AuthState {}

final class AuthLoadingState extends AuthState {}

final class AuthSuccessState extends AuthState {
  final UserEnitity user;

  AuthSuccessState(this.user);
}

final class AuthErrorState extends AuthState {
  final String message;

  AuthErrorState(this.message);
}

class AuthenticatedState extends AuthState {
  AuthenticatedState();
}

class UnAuthenticatedState extends AuthState {
  UnAuthenticatedState();
}

class AuthCheckedLoggedState extends AuthState {
  AuthCheckedLoggedState();
}

class LogoutSuccessState extends AuthState {
  LogoutSuccessState();
}

class LogoutFailureState extends AuthState {
  final String message;
  LogoutFailureState(this.message);
}
