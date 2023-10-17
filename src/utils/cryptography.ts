import crypto from 'crypto';
import { isEmpty } from 'lodash';

function getBytes(str: string) {
  const bytes = [];
  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}

/**
 * Criptografa um texto
 * @param textToEncrypt texto
 * @param secretKey chave secreta
 * @returns texto criptografado
 */
export function encrypt(textToEncrypt: string, secretKey: string) {
  if (isEmpty(textToEncrypt) || isEmpty(secretKey)) {
    return '';
  }

  const key = Buffer.from(getBytes(secretKey));
  const iv = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  let encrypted = cipher.update(textToEncrypt);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('base64');
}
