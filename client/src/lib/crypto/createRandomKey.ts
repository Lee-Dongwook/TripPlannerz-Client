import * as Crypto from 'crypto-js';

export const createRandomKey = (): string => {
  const keyLength = 32;
  return Crypto.lib.WordArray.random(keyLength).toString();
};
