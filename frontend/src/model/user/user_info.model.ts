export default class UserInfoModel {
  email: string;
  fullname: string;
  image: string;
  uuid: string;
  accessToken: string;
  refreshToken: string;

  constructor(
    email: string,
    fullname: string,
    image: string,
    uuid: string,
    accessToken: string,
    refreshToken: string
  ) {
    this.email = email;
    this.fullname = fullname;
    this.image = image;
    this.uuid = uuid;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
