import 'package:flutter_kanoon_pos/features/auth/domain/entities/user_entity.dart';
import 'package:flutter_kanoon_pos/features/auth/domain/repository/auth_repository.dart';

class SignInWithEmailAndPassword {
  final AuthRepository _authRepository;
  SignInWithEmailAndPassword(this._authRepository);
  Future<UserEnitity> call(String email, String password) async {
    return await _authRepository.signInWithEmailAndPassword(email, password);
  }
}
