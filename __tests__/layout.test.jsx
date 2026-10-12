import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/font/google', () => ({
  Geist: () => ({ variable: 'mock-geist-sans' }),
  Geist_Mono: () => ({ variable: 'mock-geist-mono' }),
}));

import RootLayout from '@/app/layout';

test('RootLayout renders children', () => {
  render(
    <RootLayout>
      <div data-testid="child">Test Content</div>
    </RootLayout>
  );
  expect(screen.getByTestId('child')).toBeDefined();
});

test('RootLayout matches snapshot', () => {
  const { container } = render(
    <RootLayout>
      <div>Snapshot Child Content</div>
    </RootLayout>
  );
  expect(container).toMatchSnapshot();
});
