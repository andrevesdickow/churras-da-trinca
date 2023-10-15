import { cn } from '@/utils/mergeClassName';

describe('mergeClassName', () => {
  it('should return the class name correctly', () => {
    const result = cn('flex flex-col');
    expect(result).toStrictEqual('flex flex-col');
  });

  it('should return the class name correctly with empty class name', () => {
    const className: string | undefined = undefined;

    const result = cn('flex flex-col', className);
    expect(result).toStrictEqual('flex flex-col');
  });

  it('should return the class name correctly without empty class name', () => {
    const className: string = 'flex-row';

    const result = cn('flex flex-col gap-4', className);
    expect(result).toStrictEqual('flex gap-4 flex-row');
  });
});
