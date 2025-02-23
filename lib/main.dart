import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_kanoon_pos/core/blocs/toast/toast_bloc.dart';
import 'package:flutter_kanoon_pos/core/constants/constants.dart';
import 'package:flutter_kanoon_pos/core/routes/web_routes.dart';
import 'package:flutter_kanoon_pos/core/utility/toast_util.dart';
import 'package:flutter_kanoon_pos/features/auth/data/datasource/auth_remote_datasource.dart';
import 'package:flutter_kanoon_pos/features/auth/data/repository/auth_repository_impl.dart';
import 'package:flutter_kanoon_pos/features/auth/domain/usecase/auth_usecase.dart';
import 'package:flutter_kanoon_pos/features/auth/presentation/blocs/auth_bloc.dart';
import 'package:flutter_kanoon_pos/firebase_options.dart';
import 'package:toastification/toastification.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'Kanoon POS',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.lightBlue),
      ),
      routerConfig: WebRoutes.init(),
      builder: (context, child) {
        return ToastificationWrapper(
          child: MultiBlocProvider(
            providers: [
              BlocProvider(
                create:
                    (context) => AuthBloc(
                      signInWithEmailAndPassword: SignInWithEmailAndPassword(
                        AuthRepositoryImpl(
                          remoteDataSource: AuthRemoteDatasource(),
                        ),
                      ),
                    ),
              ),
              BlocProvider(create: (context) => ToastBloc()),
            ],
            child: MultiBlocListener(
              listeners: [
                BlocListener<ToastBloc, ToastState>(
                  listener: (context, state) {
                    if (state is ShowToastState) {
                      switch (state.toastType) {
                        case ToastType.success:
                          ToastUtil.showSuccess(context, state.message);
                          break;
                        case ToastType.error:
                          ToastUtil.showError(context, state.message);
                          break;
                        default:
                          break;
                      }
                    }
                  },
                ),
              ],
              child: ToastificationConfigProvider(
                config: const ToastificationConfig(alignment: Alignment.center),
                child: child!,
              ),
            ),
          ),
        );
      },
    );
  }
}
