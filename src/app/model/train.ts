export interface Istation {
    stationID: string
    stationName: string
    stationCode: string
}

export class Search {
    fromStation: number;
    toStation: number;
    dateOfTravel: string
    constructor() {
        this.fromStation = 0
        this.toStation = 0
        this.dateOfTravel = ''
    }
}

export interface Itrain {
    trainId: number;
    trainNo: number;
    trainName: string;
    departureStationName: string;
    arrivalStationName: string;
    arrivalTime: string;
    departureTime: string;
    totalSeats: number;
    departureDate: string;
    bookedSeats: number;
}

export interface Iuser {
    passengerID: number
    firstName: string
    lastName: string
    email: string
    phone: string
    password: string
}

export interface IRegisterResponse {
    message: string
    result: boolean
    Data: string
}

export interface ILogin {
    phone: string
    password: string
}
export interface ILoginResponse {
    message: string
    result: boolean
    data: Data
}

export interface Data {
    passengerID: number
    firstName: string
    lastName: string
    email: string
    phone: string
    password: string
}


export interface IBookTicket {
    bookingId: number;
    trainId: number;
    passengerId: number;
    travelDate: any;
    bookingDate: Date;
    totalSeats: number;
    TrainAppBookingPassengers: TrainAppBookingPassenger[];
}

export interface TrainAppBookingPassenger {
    bookingPassengerId: number;
    bookingId: number;
    passengerName: string;
    seatNo: number;
    age: number;
}
