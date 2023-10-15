import BarbecueCreatePage from '@/app/churras/criar/page';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@/utils/customTestingLibrary';

const replace = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      replace
    };
  }
}));

describe('<BarbecueCreatePage />', () => {
  it('should render correctly Barbecue Create Page', () => {
    const { container } = render(<BarbecueCreatePage />);

    expect(screen.getByText(/Churras da TRINCA/i)).toBeInTheDocument();

    expect(screen.getByText(/Criar churras/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Voltar' })).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should click button correctly submit form in Barbecue Create Page', async () => {
    render(<BarbecueCreatePage />);

    fireEvent.submit(screen.getByRole('button'));

    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(await screen.findByText('Descrição é obrigatório')).toBeInTheDocument();

    fireEvent.input(screen.getByRole('textbox', { name: 'Descrição' }), { target: { value: 'Teste' } });

    await waitForElementToBeRemoved(() => screen.queryByRole('alert'));
  });

  it('should render back button correctly in Barbecue Create Page', () => {
    render(<BarbecueCreatePage />);

    expect(screen.getByRole('link', { name: 'Voltar' })).toHaveAttribute('href', '/');
  });
});
