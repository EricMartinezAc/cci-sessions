import { UserDTO } from "./User.object.dto";

export interface OutPutUserSessionDTO {
  statusCode: number;
  email: string;
  user: UserDTO;
  token: string | boolean;
}
