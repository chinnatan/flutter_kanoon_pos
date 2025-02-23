import 'package:json_annotation/json_annotation.dart';

part 'user_entity.g.dart';

@JsonSerializable()
class UserEnitity {
  final String id;
  final String email;
  final String name;

  UserEnitity({required this.id, required this.email, required this.name});

  factory UserEnitity.fromJson(Map<String, dynamic> json) =>
      _$UserEnitityFromJson(json);

  Map<String, dynamic> toJson() => _$UserEnitityToJson(this);
}
