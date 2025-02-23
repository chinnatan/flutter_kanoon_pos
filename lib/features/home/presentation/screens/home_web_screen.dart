import 'package:flutter/material.dart';

class HomeWebScreen extends StatelessWidget {
  const HomeWebScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(body: Center(child: Text('Hello, World!'))),
    );
  }
}
