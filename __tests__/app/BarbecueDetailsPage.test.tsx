import BarbecueDetailsPage from '@/app/churras/detalhes/[id]/page';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@/utils/customTestingLibrary';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn().mockReturnValue(({
    data: {
      id: '1',
      date: '2023-12-25',
      dateFormatted: '25/12',
      description: 'Festa de Natal',
      priceWithDrink: 100,
      priceWithoutDrink: 50
    },
    isFetching: false
  }))
}));

describe('<BarbecueDetailsPage />', () => {
  it('should render correctly Barbecue Details Page', () => {
    const { container } = render(<BarbecueDetailsPage params={{ id: '1' }} />);

    // expect(screen.getByText('25/12')).toBeInTheDocument();
    // expect(screen.getByText('Festa de Natal')).toBeInTheDocument();
    expect(screen.getByText(/Não há participantes para este churras/i)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should click create participant correctly in Barbecue Details Page', async () => {
    render(<BarbecueDetailsPage params={{ id: '1' }} />);

    fireEvent.submit(screen.getByRole('button'));

    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(await screen.findByText('Nome é obrigatário')).toBeInTheDocument();

    fireEvent.input(screen.getByRole('textbox', { name: 'Nome' }), { target: { value: 'John Doe' } });

    await waitForElementToBeRemoved(() => screen.queryByRole('alert'));

    // fireEvent.submit(screen.getByRole('button'));
  });

  it('should render back button correctly in Barbecue Details Page', () => {
    render(<BarbecueDetailsPage params={{ id: '1' }} />);

    expect(screen.getByRole('link', { name: 'Voltar' })).toHaveAttribute('href', '/churras');
  });
});
