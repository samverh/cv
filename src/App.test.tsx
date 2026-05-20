import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the card stack starting at the business card', () => {
    render(<App />);
    expect(screen.getByText('Sam Verhezen')).toBeInTheDocument();
  });

  it('renders the footer with the name', () => {
    render(<App />);
    expect(screen.getByRole('contentinfo')).toHaveTextContent('Sam Verhezen');
  });
});
