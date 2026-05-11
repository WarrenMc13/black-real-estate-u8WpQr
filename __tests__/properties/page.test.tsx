import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import PropertiesPage from '../../app/properties/page';

describe('Properties Page', () => {
  it('should render a list of properties', async () => {
    const mockProperties = [
      { id: '1', title: 'Property 1', address: 'Address 1' },
      { id: '2', title: 'Property 2', address: 'Address 2' }
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockProperties)
      })
    ) as jest.Mock;

    render(<PropertiesPage />);

    await waitFor(() => {
      expect(screen.getByText('Property 1')).toBeInTheDocument();
      expect(screen.getByText('Property 2')).toBeInTheDocument();
    });
  });

  it('should display a message when no properties are available', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([])
      })
    ) as jest.Mock;

    render(<PropertiesPage />);

    await waitFor(() => {
      expect(screen.getByText('No properties available')).toBeInTheDocument();
    });
  });

  it('should handle error states gracefully', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Failed to fetch')));

    render(<PropertiesPage />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load properties')).toBeInTheDocument();
    });
  });
});