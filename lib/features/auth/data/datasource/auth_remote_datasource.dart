import 'package:flutter_kanoon_pos/core/errors/user_not_found_exception.dart';
import 'package:flutter_kanoon_pos/core/errors/wrong_password_exception.dart';
import 'package:flutter_kanoon_pos/features/auth/data/models/user_model.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:logger/web.dart';

class AuthRemoteDatasource {
  final logger = Logger();

  Future<UserModel> login(String email, String password) async {
    try {
      logger.i("email: $email");
      final credential = await FirebaseAuth.instance.signInWithEmailAndPassword(
        email: email,
        password: password,
      );

      return UserModel(
        id: credential.user!.uid,
        email: credential.user!.email!,
        name: credential.user!.displayName ?? '',
      );
    } on FirebaseAuthException catch (e) {
      if (e.code == 'user-not-found') {
        throw UserNotFoundException("ไม่พบผู้ใช้งาน");
      } else if (e.code == 'wrong-password') {
        throw WrongPasswordException("รหัสผ่านไม่ถูกต้อง");
      }
      logger.e(e.code);
    } catch (e) {
      logger.e(e);
    }
    throw Exception("An unknown error occurred");
  }
}
