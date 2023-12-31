import { Header } from '@/components/Header';
import { render, screen } from '@/utils/customTestingLibrary';

const replace = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      replace
    };
  }
}));

jest.mock('@/services/auth', () => ({
  me: jest.fn().mockResolvedValue({
    success: true,
    result: {
      id: '1',
      name: 'John Doe',
      email: 'john@doe.com'
    }
  })
}));

describe('<Header />', () => {
  it('should render correctly Header', () => {
    const { container } = render(<Header />);

    expect(screen.getByText(/Churras/i)).toBeInTheDocument();
    expect(screen.getByText(/Trinca/i)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
