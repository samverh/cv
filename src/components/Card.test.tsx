import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(
      <Card>
        <p>hello card</p>
      </Card>,
    );
    expect(screen.getByText('hello card')).toBeInTheDocument();
  });

  it('applies the card class', () => {
    const { container } = render(<Card>x</Card>);
    expect(container.firstChild).toHaveClass('card');
  });
});
