import { render } from '@testing-library/react';
import { axe } from '../utils/setupTests';
import Button from '../../components/Button';

describe('Button Component', () => {
  it('should be accessible', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should handle error states correctly', () => {
    const { getByRole } = render(
      <Button disabled error>
        Error Button
      </Button>
    );
    const button = getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-invalid', 'true');
  });
}); 