import 'package:flutter_kanoon_pos/features/auth/presentation/screens/login_web_screen.dart';
import 'package:flutter_kanoon_pos/features/home/presentation/screens/home_web_screen.dart';
import 'package:go_router/go_router.dart';

final _routes = [
  GoRoute(
    path: WebRoutePathName.login,
    name: "login",
    builder: (context, state) => const LoginWebScreen(),
  ),
  GoRoute(
    path: WebRoutePathName.home,
    builder: (context, state) => const HomeWebScreen(),
  ),
];

class WebRoutes {
  static init() {
    return GoRouter(initialLocation: '/', routes: _routes);
  }
}

class WebRoutePathName {
  static const login = '/';
  static const home = '/home';
}
