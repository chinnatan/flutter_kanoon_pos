part of 'drawer_nav_bloc.dart';

sealed class DrawerNavState {}

final class DrawerNavInitial extends DrawerNavState {}

class DrawerNavOpenState extends DrawerNavState {
  final bool isOpen;

  DrawerNavOpenState(this.isOpen);
}
