class WrongPasswordException implements Exception {
  WrongPasswordException(this.message);

  final String message;

  @override
  String toString() {
    return 'WrongPasswordException: $message';
  }
}
