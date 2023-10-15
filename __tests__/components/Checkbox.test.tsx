import { useForm } from 'react-hook-form';
import { Checkbox } from '@/components/Checkbox';
import { render, screen, fireEvent, renderHook } from '@/utils/customTestingLibrary';

type CheckboxTestData = {
  checkboxTest: boolean;
};
const name = 'checkboxTest';

describe('<Checkbox />', () => {
  it('should render correctly Checkbox', () => {
    const { result: resultUseForm } = renderHook(() =>
      useForm<CheckboxTestData>()
    );

    const { control } = resultUseForm.current;

    const { container } = render(<Checkbox name={name} control={control} />);

    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(container).toMatchSnapshot();
  });

  it('should render the checked correctly in Checkbox', () => {
    const { result: resultUseForm } = renderHook(() =>
      useForm<CheckboxTestData>()
    );

    const { control } = resultUseForm.current;

    render(<Checkbox name={name} control={control} />);

    fireEvent.click(screen.getByRole('checkbox'));

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('should render the helper text correctly in Checkbox', async () => {
    const { result: resultUseForm } = renderHook(() =>
      useForm<CheckboxTestData>()
    );

    const { control } = resultUseForm.current;

    render(
      <Checkbox
        name={name}
        control={control}
        helperText="This field is required"
      />
    );

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('should render the label correctly in Checkbox', async () => {
    const { result: resultUseForm } = renderHook(() =>
      useForm<CheckboxTestData>()
    );

    const { control } = resultUseForm.current;

    render(<Checkbox name={name} label="Checkbox test" control={control} />);

    expect(screen.getByLabelText(/Checkbox test/)).toBeInTheDocument();
  });
});
