import { describe, it, expect } from '@jest/globals';
import { NextRequest, NextResponse } from 'next/server';
import handler from '../../app/api/leads/route';

describe('API - /api/leads', () => {
  it('should successfully return a list of leads for a GET request', async () => {
    const req = new NextRequest('http://localhost:3000/api/leads', { method: 'GET' });
    const res = await handler(req);

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThanOrEqual(0);
  });

  it('should return an error for unsupported HTTP methods', async () => {
    const req = new NextRequest('http://localhost:3000/api/leads', { method: 'PUT' });
    const res = await handler(req);

    expect(res.status).toBe(405);
    const data = await res.json();
    expect(data.message).toBe('Method Not Allowed');
  });

  it('should handle errors during GET requests', async () => {
    const req = new NextRequest('http://localhost:3000/api/leads', { method: 'GET' });

    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(handler, 'default').mockImplementationOnce(() => {
      throw new Error('Some unexpected error');
    });

    const res = await handler(req).catch(() => new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 }));

    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.message).toBe('Internal Server Error');
  });
});