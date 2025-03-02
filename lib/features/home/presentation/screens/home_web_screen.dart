import 'package:flutter/material.dart';
import 'package:flutter_kanoon_pos/core/components/drawer_nav.dart';

class HomeWebScreen extends StatelessWidget {
  const HomeWebScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: Theme.of(context).colorScheme.surfaceContainer,
        body: Row(
          children: [
            Expanded(flex: 4, child: Column(children: [DrawerNav()])),
            Expanded(
              flex: 2,
              child: Container(color: Theme.of(context).primaryColor),
            ),
          ],
        ),
      ),
    );
  }
}
