import { useForm } from 'react-hook-form';
import { TextField } from '@/components/TextField';
import {
  render,
  screen,
  fireEvent,
  renderHook
} from '@/utils/customTestingLibrary';

type TextFieldTestData = {
  fieldTest: string;
};

const name = 'textFieldTest';

describe('<TextField />', () => {
  it('should render correctly TextField ', () => {
    const { result: resultUseForm } = renderHook(() =>
      useForm<TextFieldTestData>()
    );

    const { control } = resultUseForm.current;

    const { container } = render(
      <TextField name={name} label="Teste" control={control} data-testid="textFieldTest" />
    );

    fireEvent.input(screen.getByTestId('textFieldTest'), {
      target: {
        value: 'test'
      }
    });

    expect((screen.getByTestId('textFieldTest') as HTMLInputElement).value).toBe(
      'test'
    );
    expect(container).toMatchSnapshot();
  });

  it('should render the helper text correctly in TextField', async () => {
    const { result: resultUseForm } = renderHook(() =>
      useForm<TextFieldTestData>()
    );

    const { control } = resultUseForm.current;

    render(
      <TextField
        name={name}
        control={control}
        label="Teste"
        helperText="This field is required"
        data-testid="textFieldTest"
      />
    );

    expect(await screen.findAllByRole('note')).toHaveLength(1);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('should render the password type correctly in TextField', () => {
    const { result: resultUseForm } = renderHook(() =>
      useForm<TextFieldTestData>()
    );

    const { control } = resultUseForm.current;

    const setInputType = jest.fn();
    const useStateMock = jest.spyOn(require('react'), 'useState');
    useStateMock.mockImplementation((inputType) => [inputType, setInputType]);

    render(
      <TextField
        name={name}
        label="Password test"
        type="password"
        control={control}
        data-testid="textFieldTest"
      />
    );

    const input = screen.getByTestId('textFieldTest') as HTMLInputElement;

    expect(screen.getByLabelText(/Password test/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Mostrar' })).toBeInTheDocument();
    expect(input.type).toBe('password');

    fireEvent.click(screen.getByRole('button', { name: 'Mostrar' }));
  });
});
