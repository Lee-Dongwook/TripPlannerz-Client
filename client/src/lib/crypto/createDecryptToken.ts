import * as Crypto from 'crypto-js';

export const createDecryptToken = (encryptedToken: string, key: string): string => {
  const bytes = Crypto.AES.decrypt(encryptedToken, key);
  const decryptedToken = bytes.toString(Crypto.enc.Utf8);

  return decryptedToken;
};
