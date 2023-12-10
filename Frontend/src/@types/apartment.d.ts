interface Apartment {
    title: string;
    location: Location;
    rooms: Room[];
}
interface Location {
    longitude: number;
    latitude: number;
    province: string;
    district: string;
    ward: string;
    street: string;
}
interface Room {
    services: string[];
    description: string;
    price: number;
    size: number;
    numberOfGuest: number;
    images: [];
    roomType: number;
    quantity: number;
}
interface SearchData {
    searchText: string;
    searchDate: [Date, Date];
    searchGuest: {
        guest: number;
        room: number;
    };
    room: number;
    searchPrice?: number;
}
