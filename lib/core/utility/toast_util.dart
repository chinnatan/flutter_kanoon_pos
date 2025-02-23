import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:toastification/toastification.dart';

class ToastUtil {
  static void showSuccess(BuildContext ctx, String message) {
    toastification.show(
      context: ctx,
      alignment: kIsWeb ? Alignment.topRight : Alignment.topCenter,
      title: Text("แจ้งเตือน"),
      description: Text(message),
      type: ToastificationType.success,
      style: ToastificationStyle.fillColored,
      autoCloseDuration: const Duration(seconds: 3),
      showProgressBar: false,
    );
  }

  static void showError(BuildContext ctx, String message) {
    toastification.show(
      context: ctx,
      alignment: kIsWeb ? Alignment.topRight : Alignment.topCenter,
      title: Text("แจ้งเตือน"),
      description: Text(message),
      type: ToastificationType.error,
      style: ToastificationStyle.fillColored,
      autoCloseDuration: const Duration(seconds: 3),
      showProgressBar: false,
    );
  }
}
