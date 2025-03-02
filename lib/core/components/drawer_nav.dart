import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_kanoon_pos/core/blocs/drawer/drawer_nav_bloc.dart';
import 'package:responsive_framework/responsive_framework.dart';

class DrawerNav extends StatelessWidget {
  const DrawerNav({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Row(
        children: [
          if (!ResponsiveBreakpoints.of(context).isDesktop)
            IconButton(
              icon: Icon(Icons.menu_rounded),
              onPressed: () {
                context.read<DrawerNavBloc>().add(OpenDrawerMenuEvent());
              },
            ),
          Text("รายการสินค้า", style: Theme.of(context).textTheme.titleLarge),
        ],
      ),
    );
  }
}
