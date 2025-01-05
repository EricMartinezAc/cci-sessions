import crypto from "crypto";

export const generateHash = (data: string, saltRounds: number = 10): string => {
  const salt = crypto.randomBytes(16).toString("hex"); 
  const hash = crypto
    .pbkdf2Sync(data, salt, saltRounds, 64, "sha512") 
    .toString("hex");
  return `${salt}:${hash}`;
};

export const verifyHash = (data: string, storedHash: string): boolean => {
  const [salt, originalHash] = storedHash.split(":"); 
  const hashToVerify = crypto
    .pbkdf2Sync(data, salt, 10, 64, "sha512")
    .toString("hex");
  return hashToVerify === originalHash;
};
