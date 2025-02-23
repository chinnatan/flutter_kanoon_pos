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
import 'package:loader_overlay/loader_overlay.dart';
import 'package:toastification/toastification.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  MyApp({super.key});

  final GlobalKey<ScaffoldMessengerState> scaffoldMessengerKey =
      GlobalKey<ScaffoldMessengerState>();
  static final _router = WebRoutes.init();

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'Kanoon POS',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.lightBlue),
      ),
      routerConfig: _router,
      scaffoldMessengerKey: scaffoldMessengerKey,
      builder: (context, child) {
        return GlobalLoaderOverlay(
          child: ToastificationWrapper(
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
                  BlocListener<AuthBloc, AuthState>(
                    listener: (context, state) {
                      if (state is LoadingState) {
                        context.loaderOverlay.show();
                      }

                      if (state is AuthSuccessState ||
                          state is LogoutSuccessState ||
                          state is LogoutFailureState) {
                        context.loaderOverlay.hide();
                      }
                    },
                  ),
                ],
                child: ToastificationConfigProvider(
                  config: const ToastificationConfig(
                    alignment: Alignment.center,
                  ),
                  child: child!,
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}
