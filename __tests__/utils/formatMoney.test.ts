import { formatMoney } from '@/utils/formatMoney';

describe('formatMoney', () => {
  it('should return the format money correctly', () => {
    const result = formatMoney(100);
    expect(result).toStrictEqual('R$ 100,00');
  });
});
