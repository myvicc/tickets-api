import { getAvailableTicket } from './getAvaliableTicket';
import { httpClient } from '../httpClient';

jest.mock('../httpClient', () => ({
  httpClient: {
    get: jest.fn(),
  },
}));

describe('getAvailableTicket', () => {
  it('should return correct data', async () => {
    jest
      .mocked(httpClient.get)
      .mockResolvedValueOnce({
        data: [
          {
            PerformanceId: 8444,
            ZoneId: 10,
            Price: 120,
          },
          {
            PerformanceId: 8444,
            ZoneId: 11,
            Price: 140,
          },
          {
            PerformanceId: 8445,
            ZoneId: 11,
            Price: 140,
          },
        ],
      })
      .mockResolvedValueOnce({
        data: [
          {
            Id: 1,
            Description: 'Balcony',
          },
          {
            Id: 2,
            Description: 'Front',
          },
        ],
      })
      .mockResolvedValueOnce({
        data: [
          {
            Id: 0,
            Description: 'Available',
          },
          {
            Id: 1,
            Description: 'Booked',
          },
        ],
      })
      .mockResolvedValueOnce({
        data: [
          {
            SeatStatusId: 0,
            SectionId: 1,
            SeatRow: 'A',
            SeatNumber: '12',
            ZoneId: 10,
          },
          {
            SeatStatusId: 0,
            SectionId: 2,
            SeatRow: 'A',
            SeatNumber: '13',
            ZoneId: 11,
          },
          {
            SeatStatusId: 1,
            SectionId: 1,
            SeatRow: 'A',
            SeatNumber: '14',
            ZoneId: 12,
          },
        ],
      });

    const result = await getAvailableTicket('1');

    expect(result).toEqual([
      {
        price: 120,
        row: 'A',
        seatNumber: '12',
        section: 'Balcony',
      },
      {
        price: 140,
        row: 'A',
        seatNumber: '13',
        section: 'Front',
      },
    ]);
  });
});
