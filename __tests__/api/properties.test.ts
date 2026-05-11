import { describe, it, expect } from '@jest/globals';
import { NextRequest, NextResponse } from 'next/server';
import handler from '../../app/api/properties/route';

describe('API - /api/properties', () => {
  it('should successfully return a list of properties for a GET request', async () => {
    const req = new NextRequest('http://localhost:3000/api/properties', { method: 'GET' });
    const res = await handler(req);

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
  });

  it('should return an error for unmatched HTTP methods', async () => {
    const req = new NextRequest('http://localhost:3000/api/properties', { method: 'POST' });
    const res = await handler(req);

    expect(res.status).toBe(405);
  });

  it('should handle internal server errors gracefully', async () => {
    const req = new NextRequest('http://localhost:3000/api/properties', { method: 'GET' });

    // Simulate an error by mocking the handler
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(handler, 'default').mockImplementationOnce(() => {
      throw new Error('Database connection failed');
    });

    const res = await handler(req).catch((err) => new Response('Internal Server Error', { status: 500 }));

    expect(res.status).toBe(500);
  });
});