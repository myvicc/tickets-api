export type DataSection = {
  sectionId: number;
  sectionName: string;
};

export type DataPrices = {
  zoneId: number;
  price: number;
};

export type DataSeat = {
  section: number;
  row: string;
  seatNumber: number;
  zonaId: number;
};

export type PriceData = {
  PerformanceId: number;
  ZoneId: number;
  Price: number;
};

export type SectionData = {
  Id: number;
  Description: string;
};

export type ResponseSeatStatus = {
  Description: string;
  Id: number;
};

export type ResponseSeat = {
  SeatStatusId: number;
  SectionId: number;
  SeatRow: string;
  SeatNumber: number;
  ZoneId: number;
};
