import {
  getPriceData,
  getSeatData,
  getSeatStatusData,
  getSectionData,
} from './getDataFromApi';
import { DataPrices, DataSeat, DataSection } from '../types';
export const getAvailableTicket = async (eventId: string) => {
  let tickets;
  try {
    const dataPrices = await getPriceData(
      `/TXN/Packages/${eventId}/Prices?expandPerformancePriceType=&includeOnlyBasePrice=&modeOfSaleId=26&priceTypeId=&sourceId=30885`,
    );
    const dataSection = await getSectionData(
      '/ReferenceData/Sections?seatMapId=12',
    );

    const idOfAvailableSeat = await getSeatStatusData(
      '/ReferenceData/SeatStatuses',
    );

    const dataSeat = await getSeatData(
      `/TXN/Packages/${eventId}/Seats?constituentId=0&modeOfSaleId=26&packageId=${eventId}`,
      idOfAvailableSeat,
    );

    tickets = dataSeat.map((seat: DataSeat) => {
      return {
        section: dataSection.find(
          (section: DataSection) => section.sectionId === seat.section,
        )?.sectionName,
        row: seat.row,
        seatNumber: seat.seatNumber,
        price: dataPrices.find(
          (item: DataPrices) => item.zoneId === seat.zonaId,
        )?.price,
      };
    });

    return tickets;
  } catch (error) {
    throw new Error(`Failed fetch data from url`);
  }
};
