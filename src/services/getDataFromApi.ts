import { httpClient } from '../httpClient';
import {
  DataSeat,
  PriceData,
  ResponseSeat,
  ResponseSeatStatus,
  SectionData,
} from '../types';

export const getPriceData = async (url: string) => {
  const { data: priceData } = await httpClient.get(url);
  const dataPrices = priceData.reduce(
    (result: { zoneId: number; price: number }[], item: PriceData) => {
      if (item['PerformanceId'] === 8444) {
        return [
          ...result,
          {
            zoneId: item.ZoneId,
            price: item.Price,
          },
        ];
      }
      return result;
    },
    [],
  );
  return dataPrices;
};

export const getSectionData = async (url: string) => {
  const { data: sectionData } = await httpClient.get(url);

  const dataSection = sectionData.map((item: SectionData) => {
    return {
      sectionId: item.Id,
      sectionName: item.Description,
    };
  });
  return dataSection;
};

export const getSeatStatusData = async (url: string) => {
  const { data: responseSeatStatus } = await httpClient.get(url);
  const availableSeat = responseSeatStatus.find(
    (seat: ResponseSeatStatus) => seat.Description === 'Available',
  );
  const idOfAvailableSeat = availableSeat.Id;
  return idOfAvailableSeat;
};

export const getSeatData = async (url: string, idOfAvailableSeat: number) => {
  const { data: responseSeat } = await httpClient.get(url);
  const dataSeat = responseSeat.reduce(
    (result: DataSeat[], seat: ResponseSeat) => {
      if (seat['SeatStatusId'] === idOfAvailableSeat) {
        return [
          ...result,
          {
            section: seat.SectionId,
            row: seat.SeatRow,
            seatNumber: seat.SeatNumber,
            zonaId: seat.ZoneId,
          },
        ];
      }
      return result;
    },
    [],
  );
  return dataSeat;
};
