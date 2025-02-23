import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_kanoon_pos/core/constants/constants.dart';

part 'toast_event.dart';
part 'toast_state.dart';

class ToastBloc extends Bloc<ToastEvent, ToastState> {
  ToastBloc() : super(ToastInitial()) {
    on<ShowToastEvent>((event, emit) {
      emit(ShowToastState(event.toastType, event.message));
    });
  }
}
