import HTTPException from "@/model/exception/http_exception.mode";
import router from "@/router";

export default class ExceptionUtils {
  static getErrorMessage(error: any) {
    if (error instanceof HTTPException) {
      switch (error.status) {
        case 401:
          console.log("คุณไม่มีสิทธิ์ในการเข้าถึง");
          router.push("/");
          break;
        default:
          console.error(error.message);
          break;
      }
    } else {
      console.log(error);
    }
  }
}
