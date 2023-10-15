import { useForm } from 'react-hook-form';
import { TextArea } from '@/components/TextArea';
import {
  render,
  screen,
  fireEvent,
  renderHook
} from '@/utils/customTestingLibrary';

type TextAreaTestData = {
  textAreaTest: string;
};

const name = 'textAreaTest';

describe('<TextArea />', () => {
  it('should render correctly TextArea ', () => {
    const { result: resultUseForm } = renderHook(() =>
      useForm<TextAreaTestData>()
    );

    const { control } = resultUseForm.current;

    const { container } = render(
      <TextArea name={name} label="Teste" control={control} data-testid="textAreaTest" />
    );

    fireEvent.input(screen.getByTestId('textAreaTest'), {
      target: {
        value: 'test'
      }
    });

    expect((screen.getByTestId('textAreaTest') as HTMLInputElement).value).toBe(
      'test'
    );
    expect(container).toMatchSnapshot();
  });

  it('should render the helper text correctly in TextArea', async () => {
    const { result: resultUseForm } = renderHook(() =>
      useForm<TextAreaTestData>()
    );

    const { control } = resultUseForm.current;

    render(
      <TextArea
        name={name}
        control={control}
        label="Teste"
        helperText="This field is required"
        data-testid="textAreaTest"
      />
    );

    expect(await screen.findAllByRole('note')).toHaveLength(1);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });
});
