import { Button } from '@/components/Button';
import { render, screen } from '@/utils/customTestingLibrary';

describe('<Button />', () => {
  it('should render correctly Button', () => {
    const onClick = jest.fn();

    const { container } = render(<Button onClick={onClick}>Criar churras</Button>);

    expect(screen.getByText(/Criar churras/i)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should render correctly loading Button', () => {
    const onClick = jest.fn();

    render(<Button onClick={onClick} isLoading>Criar churras</Button>);

    expect(screen.getByText(/Criar churras/i)).toBeDisabled();

    screen.getByText(/Criar churras/i).click();

    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it('should call click function correctly in Button', () => {
    const onClick = jest.fn();

    render(<Button onClick={onClick}>Criar churras</Button>);

    screen.getByText(/Criar churras/i).click();

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
