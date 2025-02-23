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
