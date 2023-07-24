const request = async (url) => {
    const response = await fetch(url);

    if (!response.ok) throw new Error();

    return response.json();
}

export const getAvailableTicket = async (eventId) => {
    console.log('eventId inside', eventId)
    let idOfAvailableSeat, dataPrices, dataSeat, dataSection, tickets;
    try {
        // const urlPrice = 'https://my.laphil.com/en/rest-proxy/TXN/Packages/1195/Prices?expandPerformancePriceType=&includeOnlyBasePrice=&modeOfSaleId=26&priceTypeId=&sourceId=30885'
        const priceData = await request(`https://my.laphil.com/en/rest-proxy/TXN/Packages/${eventId}/Prices?expandPerformancePriceType=&includeOnlyBasePrice=&modeOfSaleId=26&priceTypeId=&sourceId=30885`);

        const filteredData = priceData.filter((item) => item["PerformanceId"] === 8444)
        console.log('filteredData', filteredData);
        dataPrices = filteredData.map((item) => {
            return {
                zoneId: item.ZoneId,
                price: item.Price
            }
        })
        console.log('dataPrices', dataPrices)

        // dataPrices = data.reduce((accum, item) => {
        //     if (item["PerfomanceId"] === 8444) {
        //         return [...accum, {zoneId: item.ZoneId,
        //             //             price: item.Price}]
        //
        //     }
        //     return accum;
        // }, [])
        // console.log('dataPrices', dataPrices)

        const urlSection = 'https://my.laphil.com/en/rest-proxy/ReferenceData/Sections?seatMapId=12';
        const responseSection = await fetch(urlSection);
        if (responseSection.ok) {
            const data = await responseSection.json();
            dataSection = data.map((item) => {
                return {
                    sectionId: item.Id,
                    sectionName: item.Description
                }
            })
            console.log('dataSection', dataSection)
        }

        const urlSeatStatus = 'https://my.laphil.com/en/rest-proxy/ReferenceData/SeatStatuses';
        const responseSeatStatus = await fetch(urlSeatStatus);
        if (responseSeatStatus.ok) {
            const data = await responseSeatStatus.json();
            const availableSeat = data.find(seat => seat.Description === "Available");
            idOfAvailableSeat = availableSeat.Id
            console.log('idOfAvailableSeat', idOfAvailableSeat)
        }

        const urlSeat = `https://my.laphil.com/en/rest-proxy/TXN/Packages/${eventId}/Seats?constituentId=0&modeOfSaleId=26&packageId=${eventId}`;
        console.log('urlSeat', urlSeat)
        const responseSeat = await fetch(urlSeat);
        if (responseSeat.ok) {
            const data = await responseSeat.json();

            const filteredData = data.filter((item) =>  item["SeatStatusId"] === 0);

            dataSeat = filteredData.map((seat) => {
                return {
                    section: seat.SectionId,
                    row: seat.SeatRow,
                    seatNumber: seat.SeatNumber,
                    zonaId: seat.ZoneId
                }
            })
            console.log('dataSeat', dataSeat)
            // dataSeat = data.reduce((accum, seat) => {
            //     if (data.SeatStatusId === idOfAvailableSeat) {
            //         return [[...accum], {
            //             section: seat.Section,
            //             row: seat.Row,
            //             seatNumber: seat.SeatNumber,
            //             zonaId: seat.ZoneId
            //         }]
            //     }
            //     return accum;
            // }, [])

            tickets = dataSeat.map((seat) => {
                return {
                    section: (dataSection.find(section => section.sectionId === seat.section)).sectionName,
                    row: seat.row,
                    seatNumber: seat.seatNumber,
                    price: (dataPrices.find(item => item.zoneId === seat.zonaId)).price
                }
            })
        }
        const result = dataSection.find(section => section.sectionId === 28)
        console.log('tickets', tickets)
        return  tickets;

    } catch (error) {
        throw new Error(`Failed fetch data from url`)
    }
}

