import { Link } from '@/components/Link';
import { render, screen } from '@/utils/customTestingLibrary';

describe('<Link />', () => {
  it('should render correctly Link', () => {
    const { container } = render(<Link href="/churras/criar">Adicionar churras</Link>);

    expect(screen.getByText(/Adicionar churras/i)).toBeInTheDocument();

    expect(screen.getByRole('link', { name: 'Adicionar churras' })).toHaveAttribute('href', '/churras/criar');

    expect(container).toMatchSnapshot();
  });
});
