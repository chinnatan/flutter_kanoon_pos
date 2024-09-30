export class UserModel {
  uuid: string;
  id: number;
  username: string;
  fullname: string;
  store_id: number;
  store_name: string;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  exp: any;
  iat: any;

  constructor(uuid: string, id: number, username: string, fullname: string, store_id: number, store_name: string) {
    this.uuid = uuid;
    this.id = id;
    this.username = username;
    this.fullname = fullname;
    this.store_id = store_id;
    this.store_name = store_name;
  }
}
