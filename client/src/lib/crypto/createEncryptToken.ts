import * as Crypto from 'crypto-js';

export const createEncryptToken = (token: string, key: string): string => {
  const encryptedToken = Crypto.AES.encrypt(token, key).toString();
  return encryptedToken;
};
