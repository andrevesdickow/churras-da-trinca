import React from 'react';
import BarbecuePage from '@/app/churras/page';
import { render, screen } from '@/utils/customTestingLibrary';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: () => ({
    data: [{
      id: '1',
      date: '2023-12-25',
      dateFormatted: '25/12',
      description: 'Festa de Natal',
      priceWithDrink: 100,
      priceWithoutDrink: 50
    }],
    isFetching: false
  })
}));

describe('<BarbecuePage />', () => {
  it('should render correctly Barbecue Page', async () => {
    const { container } = render(<BarbecuePage />);

    expect(screen.getByText(/Adicionar churras/i)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should click create barbecue link correctly in Barbecue Page', () => {
    render(<BarbecuePage />);

    expect(screen.getByRole('link', { name: 'Adicionar churras' })).toHaveAttribute('href', '/churras/criar');
  });
});
