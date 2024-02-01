//Author Erik Priemer

import NodeRSA from 'node-rsa';
import * as fs from 'fs';

export function decrypt(encryptedText: string): string {
  const privateKey = new NodeRSA(fs.readFileSync('./src/rsa/privateKey.rsa'));
  return privateKey.decrypt(encryptedText, 'utf8');
}

export function encrypt(encryptedText: string): string {
  const publicKey = new NodeRSA(fs.readFileSync('./src/rsa/publicKey.rsa'));
  return publicKey.encrypt(encryptedText, 'base64');
}
