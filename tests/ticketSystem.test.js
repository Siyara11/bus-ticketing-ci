// tests/ticketSystem.test.js
const { calculateFare, isSeatAvailable, bookTicket } = require('../src/ticketSystem');

describe('Ticket System core logic', () => {
  test('calculateFare returns seats * pricePerSeat', () => {
    expect(calculateFare(2, 50)).toBe(100);
    expect(calculateFare(0, 100)).toBe(0);
    expect(() => calculateFare(-1, 50)).toThrow();
    expect(() => calculateFare(2, -10)).toThrow();
  });

  test('isSeatAvailable correctly validates availability', () => {
    expect(isSeatAvailable(10, 5)).toBe(true);
    expect(isSeatAvailable(5, 5)).toBe(true);
    expect(isSeatAvailable(3, 4)).toBe(false);
    expect(() => isSeatAvailable(-1, 2)).toThrow();
  });

  test('bookTicket returns success object and computes totalFare', () => {
    const params = {
      name: 'Alice',
      destination: 'Colombo',
      seats: 3,
      pricePerSeat: 30,
      availableSeats: 10
    };
    const res = bookTicket(params);
    expect(res.success).toBe(true);
    expect(res.totalFare).toBe(90);
    expect(res.message).toContain('Booking confirmed for Alice to Colombo');

    // invalid seats
    const bad = bookTicket({ ...params, seats: 0 });
    expect(bad.success).toBe(false);
    expect(bad.message).toMatch(/greater than 0|fill in all fields/);

    // over capacity
    const over = bookTicket({ ...params, seats: 20 });
    expect(over.success).toBe(false);
    expect(over.message).toMatch(/not available/);
  });
});
