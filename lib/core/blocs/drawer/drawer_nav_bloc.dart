import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

part 'drawer_nav_event.dart';
part 'drawer_nav_state.dart';

class DrawerNavBloc extends Bloc<DrawerNavEvent, DrawerNavState> {
  GlobalKey<ScaffoldState> drawerKey = GlobalKey<ScaffoldState>();

  DrawerNavBloc() : super(DrawerNavInitial()) {
    on<OpenDrawerMenuEvent>((event, emit) {
      if (!drawerKey.currentState!.isDrawerOpen) {
        drawerKey.currentState!.openDrawer();
      } else {
        drawerKey.currentState!.openEndDrawer();
      }
    });
  }
}
