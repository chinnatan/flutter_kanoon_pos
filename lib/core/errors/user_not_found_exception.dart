class UserNotFoundException implements Exception {
  UserNotFoundException(this.message);

  final String message;

  @override
  String toString() {
    return 'UserNotFoundException: $message';
  }
}
