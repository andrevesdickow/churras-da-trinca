import { useForm } from 'react-hook-form';
import { CurrencyInput } from '@/components/CurrencyInput';
import {
  render,
  screen,
  fireEvent,
  renderHook
} from '@/utils/customTestingLibrary';

type CurrencyInput = {
  currencyInputTest: string;
};

const name = 'currencyInputTest';

describe('<CurrencyInput />', () => {
  it('should render correctly CurrencyInput ', () => {
    const { result: resultUseForm } = renderHook(() =>
      useForm<CurrencyInput>()
    );

    const { control } = resultUseForm.current;

    const { container } = render(
      <CurrencyInput name={name} label="Teste" control={control} data-testid="currencyInputTest" />
    );

    fireEvent.input(screen.getByTestId('currencyInputTest'), {
      target: {
        value: '10'
      }
    });

    expect((screen.getByTestId('currencyInputTest') as HTMLInputElement).value).toBe(
      '0,10'
    );
    expect(container).toMatchSnapshot();
  });

  it('should render the helper text correctly in CurrencyInput', async () => {
    const { result: resultUseForm } = renderHook(() =>
      useForm<CurrencyInput>()
    );

    const { control } = resultUseForm.current;

    render(
      <CurrencyInput
        name={name}
        control={control}
        label="Teste"
        helperText="This field is required"
        data-testid="currencyInputTest"
      />
    );

    expect(await screen.findAllByRole('note')).toHaveLength(1);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });
});
