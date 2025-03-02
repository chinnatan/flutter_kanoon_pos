import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_kanoon_pos/core/blocs/drawer/drawer_nav_bloc.dart';
import 'package:flutter_kanoon_pos/features/home/presentation/screens/home_web_screen.dart';
import 'package:flutter_kanoon_pos/features/main/components/side_menu.dart';
import 'package:responsive_framework/responsive_framework.dart';

class MainWebScreen extends StatelessWidget {
  const MainWebScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        key: context.read<DrawerNavBloc>().drawerKey,
        drawer: SideMenuWidget(),
        body: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (ResponsiveBreakpoints.of(context).isDesktop)
              Expanded(flex: 1, child: SideMenuWidget()),
            Expanded(flex: 5, child: HomeWebScreen()),
          ],
        ),
      ),
    );
  }
}
