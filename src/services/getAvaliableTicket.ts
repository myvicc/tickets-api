import { httpClient } from '../httpClient';
import {
  DataPrices,
  DataSection,
  DataSeat,
  PriceData,
  SectionData,
  ResponseSeatStatus,
  ResponseSeat,
} from '../types';

export const getAvailableTicket = async (eventId: string) => {
  let idOfAvailableSeat: number,
    dataPrices: [DataPrices],
    dataSeat: [DataSeat],
    dataSection: [DataSection],
    tickets;
  try {
    const { data: priceData } = await httpClient.get(
      `/TXN/Packages/${eventId}/Prices?expandPerformancePriceType=&includeOnlyBasePrice=&modeOfSaleId=26&priceTypeId=&sourceId=30885`,
    );
    const filteredData = priceData.filter(
      (item: PriceData) => item['PerformanceId'] === 8444,
    );
    dataPrices = filteredData.map((item: Omit<PriceData, 'PerformanceId'>) => {
      return {
        zoneId: item.ZoneId,
        price: item.Price,
      };
    });

    const { data: sectionData } = await httpClient.get(
      '/ReferenceData/Sections?seatMapId=12',
    );

    dataSection = sectionData.map((item: SectionData) => {
      return {
        sectionId: item.Id,
        sectionName: item.Description,
      };
    });

    const { data: responseSeatStatus } = await httpClient.get(
      '/ReferenceData/SeatStatuses',
    );
    const availableSeat = responseSeatStatus.find(
      (seat: ResponseSeatStatus) => seat.Description === 'Available',
    );
    idOfAvailableSeat = availableSeat.Id;

    const { data: responseSeat } = await httpClient.get(
      `/TXN/Packages/${eventId}/Seats?constituentId=0&modeOfSaleId=26&packageId=${eventId}`,
    );

    const availableData = responseSeat.filter(
      (item: ResponseSeat) => item['SeatStatusId'] === idOfAvailableSeat,
    );

    dataSeat = availableData.map((seat: Omit<ResponseSeat, 'SeatStatusId'>) => {
      return {
        section: seat.SectionId,
        row: seat.SeatRow,
        seatNumber: seat.SeatNumber,
        zonaId: seat.ZoneId,
      };
    });

    tickets = dataSeat.map((seat: DataSeat) => {
      return {
        section: dataSection.find(
          (section) => section.sectionId === seat.section,
        )?.sectionName,
        row: seat.row,
        seatNumber: seat.seatNumber,
        price: dataPrices.find((item) => item.zoneId === seat.zonaId)?.price,
      };
    });

    return tickets;
  } catch (error) {
    throw new Error(`Failed fetch data from url`);
  }
};
