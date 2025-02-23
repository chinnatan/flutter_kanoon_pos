import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_kanoon_pos/core/blocs/toast/toast_bloc.dart';
import 'package:flutter_kanoon_pos/core/constants/constants.dart';
import 'package:flutter_kanoon_pos/core/routes/web_routes.dart';
import 'package:flutter_kanoon_pos/features/auth/presentation/blocs/auth_bloc.dart';
import 'package:go_router/go_router.dart';

class SideMenuWidget extends StatelessWidget {
  const SideMenuWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocListener<AuthBloc, AuthState>(
      listener: (context, state) {
        if (state is LogoutFailureState) {
          context.read<ToastBloc>().add(
            ShowToastEvent(ToastType.error, state.message),
          );
        }
        if (state is LogoutSuccessState) {
          context.go(WebRoutePathName.login);
        }
      },
      child: Column(
        children: [
          DrawerHeader(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  "Kanoon POS",
                  style: Theme.of(context).textTheme.titleLarge,
                ),
              ],
            ),
          ),
          ListTile(leading: Icon(Icons.shop_2_rounded), title: Text("ร้านค้า")),
          Divider(indent: 12, endIndent: 12),
          ListTile(
            leading: Icon(Icons.logout_rounded),
            title: Text("ออกจากระบบ"),
            onTap: () {
              context.read<AuthBloc>().add(LogoutEvent());
            },
          ),
        ],
      ),
    );
  }
}
