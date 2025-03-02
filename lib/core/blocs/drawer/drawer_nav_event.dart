part of 'drawer_nav_bloc.dart';

sealed class DrawerNavEvent {}

class OpenDrawerMenuEvent extends DrawerNavEvent {
  OpenDrawerMenuEvent();
}
