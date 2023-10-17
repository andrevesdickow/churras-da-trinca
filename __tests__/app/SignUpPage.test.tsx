import SignUpPage from '@/app/signup/page';
import { fireEvent, render, screen } from '@/utils/customTestingLibrary';

const push = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push
    };
  }
}));

describe('<SignUpPage />', () => {
  it('should render correctly SignUp Page', () => {
    const { container } = render(<SignUpPage />);

    expect(screen.getByText(/Trinca/i)).toBeInTheDocument();
    expect(screen.getByText(/Cadastrar/i)).toBeInTheDocument();
    expect(screen.getByText(/Voltar para login/i)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should click button correctly submit form in SignUp Page', async () => {
    render(<SignUpPage />);

    fireEvent.submit(screen.getByRole('button', { name: 'Cadastrar' }));

    expect(await screen.findAllByRole('alert')).toHaveLength(5);
    expect(await screen.findByText('Nome é obrigatório')).toBeInTheDocument();
    expect(await screen.findByText('E-mail é obrigatório')).toBeInTheDocument();
    expect(await screen.findByText('Senha deve possuir no mínimo 8 caracteres')).toBeInTheDocument();
    expect(await screen.findByText('Confirmar senha deve possuir no mínimo 8 caracteres')).toBeInTheDocument();
    expect(await screen.findByText('Você precisa aceitar os termos')).toBeInTheDocument();

    fireEvent.input(screen.getByRole('textbox', { name: 'Nome completo' }), { target: { value: 'John Doe' } });
    fireEvent.input(screen.getByRole('textbox', { name: 'E-mail' }), { target: { value: 'john@doe.com' } });
    fireEvent.input(screen.getByRole('textbox', { name: 'Senha' }), { target: { value: '12345678' } });
    fireEvent.input(screen.getByRole('textbox', { name: 'Confirmar senha' }), { target: { value: '12345678' } });
    fireEvent.click(screen.getByRole('checkbox', { name: 'Confirmar e aceitar os termos de uso' }), { target: { value: 'true' } });
  });

  it('should click create barbecue link correctly in SignUp Page', () => {
    render(<SignUpPage />);

    expect(screen.getByRole('link', { name: 'Voltar para login' })).toHaveAttribute('href', '/');
  });
});
