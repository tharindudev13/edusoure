import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import Profile from '../../pages/Profile'; 

test('should show loading message when user data is null', () => {
  render(<Profile user={null} />);
  
  const loadingText = screen.getByText(/loading/i);
  expect(loadingText).toBeDefined();
});

test('should display the user name when data is provided', () => {
  const mockUser = { name: 'Mora Student' };
  render(<Profile user={mockUser} />);
  
  const nameElement = screen.getByText(/Mora Student/i);
  expect(nameElement).toBeDefined();
});