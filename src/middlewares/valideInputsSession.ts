import { IntoUserAuthDTO } from "../dto/into.user.auth.dto";
import { IntoUserRegtrDTO } from "../dto/into.user.regtr.dto";


const validateUser = (user: string): boolean => {
  const alphanumericRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,11}$/;
  if (!alphanumericRegex.test(user)) {
    return false;
  }
  return true;
};

const validatePassword = (psw: string): boolean => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,10}$/;
  if (!passwordRegex.test(psw)) {
    return false;
  }
  return true;
};

export const ValideInputRegtr = async (body: any): Promise<boolean> => {

  const { owner, clav_prodct, user, pswLogin }: IntoUserRegtrDTO = body
  if (!owner || !clav_prodct || !user || !pswLogin) {
    return false
  }

  console.log(10, 'valide input regtr in gateway')

  return await validateUser(user) && await validatePassword(pswLogin) ? true : false

}

export const ValideInputAuth = async (body: any): Promise<boolean> => {

  const { id, user, pswLogin }: IntoUserAuthDTO = body
  if (!id|| !user || !pswLogin) {
    return false
  }

  console.log(10, 'valide input auth in gateway')

  return await validateUser(user) && await validatePassword(pswLogin) ? true : false

}
