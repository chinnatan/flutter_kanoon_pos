import 'package:flutter_kanoon_pos/features/auth/domain/entities/user_entity.dart';

abstract class AuthRepository {
  Future<UserEnitity> signInWithEmailAndPassword(String email, String password);
}
