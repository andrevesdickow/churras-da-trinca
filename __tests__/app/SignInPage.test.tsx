import SignInPage from '@/app/page';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@/utils/customTestingLibrary';

const push = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push
    };
  }
}));

describe('<SignInPage />', () => {
  it('should render correctly SignIn Page', () => {
    const { container } = render(<SignInPage />);

    expect(screen.getByText(/Trinca/i)).toBeInTheDocument();
    expect(screen.getByText(/Entrar/i)).toBeInTheDocument();
    expect(screen.getByText(/Inscreva-se/i)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should click button correctly submit form in SignIn Page', async () => {
    render(<SignInPage />);

    fireEvent.submit(screen.getByRole('button', { name: 'Entrar' }));

    expect(await screen.findAllByRole('alert')).toHaveLength(2);
    expect(await screen.findByText('E-mail é obrigatório')).toBeInTheDocument();
    expect(await screen.findByText('A senha deve possuir pelo menos 8 caracteres')).toBeInTheDocument();

    fireEvent.input(screen.getByRole('textbox', { name: 'E-mail' }), { target: { value: 'john@doe.com' } });
    fireEvent.input(screen.getByRole('textbox', { name: 'Senha' }), { target: { value: '12345678' } });

    await waitForElementToBeRemoved(() => screen.queryAllByRole('alert'));
  });

  it('should click create barbecue link correctly in SignIn Page', () => {
    render(<SignInPage />);

    expect(screen.getByRole('link', { name: 'Inscreva-se' })).toHaveAttribute('href', '/signup');
  });
});
