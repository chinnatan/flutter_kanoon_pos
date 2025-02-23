import 'package:flutter_kanoon_pos/core/errors/user_not_found_exception.dart';
import 'package:flutter_kanoon_pos/core/errors/wrong_password_exception.dart';
import 'package:flutter_kanoon_pos/features/auth/data/datasource/auth_remote_datasource.dart';
import 'package:flutter_kanoon_pos/features/auth/data/models/user_model.dart';
import 'package:flutter_kanoon_pos/features/auth/domain/entities/user_entity.dart';
import 'package:flutter_kanoon_pos/features/auth/domain/repository/auth_repository.dart';

class AuthRepositoryImpl extends AuthRepository {
  final AuthRemoteDatasource remoteDataSource;

  AuthRepositoryImpl({required this.remoteDataSource});

  @override
  Future<UserEnitity> signInWithEmailAndPassword(
    String email,
    String password,
  ) async {
    try {
      UserModel user = await remoteDataSource.login(email, password);

      return UserEnitity(id: user.id, email: user.email, name: user.name);
    } on UserNotFoundException {
      rethrow;
    } on WrongPasswordException {
      rethrow;
    }
  }
}
