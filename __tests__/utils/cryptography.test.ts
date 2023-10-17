import { encrypt } from '@/utils/cryptography';

describe('cryptography', () => {
  it('should return the encrypted text correctly', () => {
    const result = encrypt('12345678', process.env.CRYPTOGRAPHY_KEY as string);
    expect(result).toStrictEqual('/nPG9ieEbxAp5E3LkAwlzw==');
  });
});
