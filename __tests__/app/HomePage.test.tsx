import HomePage from '@/app/page';
import { render, screen } from '@/utils/customTestingLibrary';

describe('<HomePage />', () => {
  it('should render correctly Home Page', () => {
    const { container } = render(<HomePage />);

    expect(screen.getByText(/Adicionar churras/i)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should click create barbecue link correctly in Home Page', () => {
    render(<HomePage />);

    expect(screen.getByRole('link', { name: 'Adicionar churras' })).toHaveAttribute('href', '/churras/criar');
  });
});
