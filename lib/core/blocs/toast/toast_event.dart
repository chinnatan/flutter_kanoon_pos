part of 'toast_bloc.dart';

sealed class ToastEvent {}

class ShowToastEvent extends ToastEvent {
  final ToastType toastType;
  final String message;

  ShowToastEvent(this.toastType, this.message);
}
