import { env } from "process";

class Constant {
  static readonly BASE_URL = "https://app.vanex.ly/api/v1";
  static readonly EMAIL = env.EMAIL || "";
  static readonly PASSWORD = env.PASSWORD || "";
}

export default Constant;
