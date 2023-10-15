import { Skeleton } from '@/components/Skeleton';
import { render, screen } from '@/utils/customTestingLibrary';

describe('<Skeleton />', () => {
  it('should render correctly Skeleton', () => {
    const { container } = render(<Skeleton className="w-[100px] h-[100px]" />);

    expect(screen.getByRole('status')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
