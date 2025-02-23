import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_kanoon_pos/core/blocs/toast/toast_bloc.dart';
import 'package:flutter_kanoon_pos/core/constants/constants.dart';
import 'package:flutter_kanoon_pos/core/routes/web_routes.dart';
import 'package:flutter_kanoon_pos/features/auth/presentation/blocs/auth_bloc.dart';
import 'package:go_router/go_router.dart';

class LoginWebScreen extends StatefulWidget {
  const LoginWebScreen({super.key});

  @override
  State<LoginWebScreen> createState() => _LoginWebScreenState();
}

class _LoginWebScreenState extends State<LoginWebScreen> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  Widget _buildEmailInput() {
    return TextFormField(
      controller: _emailController,
      validator: (value) => value!.isEmpty ? "กรุณากรอกอีเมล์" : null,
      decoration: InputDecoration(
        labelText: "Email",
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
      ),
    );
  }

  Widget _buildPasswordInput() {
    return TextFormField(
      controller: _passwordController,
      validator: (value) => value!.isEmpty ? "กรุณากรอกรหัสผ่าน" : null,
      obscureText: true,
      decoration: InputDecoration(
        labelText: "Password",
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: BlocListener<AuthBloc, AuthState>(
          listener: (context, state) {
            if (state is AuthSuccessState) {
              BlocProvider.of<ToastBloc>(
                context,
              ).add(ShowToastEvent(ToastType.success, "เข้าสู่ระบบสำเร็จ!"));
              context.go(WebRoutePathName.home);
            }

            if (state is AuthenticatedState) {
              context.go(WebRoutePathName.home);
            }

            if (state is AuthErrorState) {
              BlocProvider.of<ToastBloc>(
                context,
              ).add(ShowToastEvent(ToastType.error, state.message));
            }
          },
          child: BlocBuilder<AuthBloc, AuthState>(
            builder: (context, state) {
              return Padding(
                padding: const EdgeInsets.all(16.0),
                child: Center(
                  child: SizedBox(
                    width: MediaQuery.of(context).size.width / 2,
                    child: Card(
                      elevation: 4,
                      child: Padding(
                        padding: EdgeInsets.all(16),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            ListTile(
                              title: Text(
                                "Kanoon POS",
                                style:
                                    Theme.of(context).textTheme.headlineLarge,
                              ),
                            ),
                            Divider(),
                            Form(
                              key: _formKey,
                              child: Padding(
                                padding: const EdgeInsets.fromLTRB(0, 8, 0, 8),
                                child: Column(
                                  children: [
                                    _buildEmailInput(),
                                    SizedBox(height: 16),
                                    _buildPasswordInput(),
                                    SizedBox(height: 16),
                                    SizedBox(
                                      width: double.infinity,
                                      child: FilledButton(
                                        onPressed: () {
                                          if (_formKey.currentState!
                                              .validate()) {
                                            BlocProvider.of<AuthBloc>(
                                              context,
                                            ).add(
                                              AuthEventLogin(
                                                _emailController.text,
                                                _passwordController.text,
                                              ),
                                            );
                                          }
                                        },
                                        child: Text("เข้าสู่ระบบ"),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              );
            },
          ),
        ),
      ),
    );
  }
}
