import App from './App';
import Table from './Table'
import React from 'react';
import { render } from '@testing-library/react';

test('renders app header', () => {
  const { getByText } = render(<App />);
  const headerText = getByText("Analytics Dashboard");
  expect(headerText).toBeInTheDocument();
});

test('renders user name', () => {
  const { getByText } = render(<App />);
  const headerText = getByText("Welcome, Guest!");
  expect(headerText).toBeInTheDocument();
});

test('renders table title', () => {
  const { getByText } = render(<App />);
  const tableText = getByText("Overdue Orders");
  expect(tableText).toBeInTheDocument();
});
