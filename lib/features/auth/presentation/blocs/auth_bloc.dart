import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_kanoon_pos/features/auth/domain/entities/user_entity.dart';
import 'package:flutter_kanoon_pos/features/auth/domain/usecase/auth_usecase.dart';
import 'package:logger/web.dart';

part 'auth_event.dart';
part 'auth_state.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final logger = Logger();

  final SignInWithEmailAndPassword signInWithEmailAndPassword;

  AuthBloc({required this.signInWithEmailAndPassword}) : super(AuthInitial()) {
    on<AuthEventLogin>((event, emit) async {
      emit(AuthLoadingState());
      try {
        logger.i("email: ${event.email}");

        final credential = await signInWithEmailAndPassword(
          event.email,
          event.password,
        );

        final user = UserEnitity(
          id: credential.id,
          email: credential.email,
          name: credential.name,
        );

        // final credential = await FirebaseAuth.instance
        //     .signInWithEmailAndPassword(
        //       email: event.email,
        //       password: event.password,
        //     );

        // final user = UserEnitity(
        //   id: credential.user!.uid,
        //   email: credential.user!.email!,
        //   name: credential.user!.displayName ?? '',
        // );

        emit(AuthSuccessState(user));
      } on FirebaseAuthException catch (e) {
        if (e.code == 'user-not-found') {
          emit(AuthErrorState("ไม่พบผู้ใช้งาน"));
        } else if (e.code == 'wrong-password') {
          emit(AuthErrorState("รหัสผ่านไม่ถูกต้อง"));
        }
        logger.e(e.code);
      } catch (e) {
        logger.e(e);
        emit(AuthErrorState("เกิดข้อผิดพลาด"));
      }
    });
  }
}
