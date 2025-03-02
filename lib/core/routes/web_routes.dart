import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_kanoon_pos/features/auth/presentation/blocs/auth_bloc.dart';
import 'package:flutter_kanoon_pos/features/auth/presentation/screens/login_web_screen.dart';
import 'package:flutter_kanoon_pos/features/main/presentation/screens/main_web.dart';
import 'package:go_router/go_router.dart';

final _routes = [
  ShellRoute(
    builder: (context, state, child) => child,
    routes: [
      GoRoute(
        path: WebRoutePathName.login,
        builder: (context, state) => const LoginWebScreen(),
      ),
      GoRoute(
        path: WebRoutePathName.home,
        builder: (context, state) => MainWebScreen(),
      ),
    ],
  ),
];

class WebRoutes {
  static init() {
    return GoRouter(
      initialLocation: '/',
      redirect: (context, state) {
        final publicPaths = [WebRoutePathName.login];
        final isPublicPath = publicPaths.contains(state.path);
        final authState = context.read<AuthBloc>().state;

        final isAuthenticated =
            authState is AuthSuccessState || authState is AuthenticatedState;

        if (!isAuthenticated && !isPublicPath) {
          return WebRoutePathName.login;
        }

        if (isAuthenticated && isPublicPath) {
          return WebRoutePathName.home;
        }

        return null;
      },
      routes: _routes,
    );
  }
}

class WebRoutePathName {
  static const login = '/';
  static const home = '/home';
}
