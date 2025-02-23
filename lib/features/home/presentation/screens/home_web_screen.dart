import 'package:flutter/material.dart';
import 'package:flutter_kanoon_pos/core/components/side_menu.dart';

class HomeWebScreen extends StatelessWidget {
  const HomeWebScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Row(
          children: [
            Expanded(flex: 1, child: SideMenuWidget()),
            Expanded(
              flex: 5,
              child: Container(color: Theme.of(context).primaryColorLight),
            ),
          ],
        ),
      ),
    );
  }
}
