part of 'toast_bloc.dart';

sealed class ToastState {}

final class ToastInitial extends ToastState {}

class ShowToastState extends ToastState {
  final ToastType toastType;
  final String message;

  ShowToastState(this.toastType, this.message);
}
