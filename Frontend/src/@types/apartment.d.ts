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
    size: numberOfGuest;
    images: [];
    roomType: number;
    quantity: number;
}
