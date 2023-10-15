import { Header } from '@/components/Header';
import { render, screen } from '@/utils/customTestingLibrary';

describe('<Header />', () => {
  it('should render correctly Header', () => {
    const { container } = render(<Header />);

    expect(screen.getByText(/Churras/i)).toBeInTheDocument();
    expect(screen.getByText(/Trinca/i)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
