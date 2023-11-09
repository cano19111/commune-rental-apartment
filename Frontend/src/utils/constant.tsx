import { RiHome4Line, RiContactsFill } from 'react-icons/ri';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { GrFavorite } from 'react-icons/gr';
import React from 'react';

export const path: { [key: string]: string } = {
    ROOT: '/',
    HOME: '',
    ALL: '/*',
    LISTING: 'listing/:roomId',
    FAVORITES: 'favorites',
    CONTACT: 'contact',
    CREATE_APARTMENT: 'create-apartment',
};

export const navigates: { title: string; path: string; icon: React.ReactNode }[] = [
    { title: 'Home', path: path.HOME, icon: <RiHome4Line /> },
    { title: 'Listing', path: path.LISTING, icon: <AiOutlineUnorderedList /> },
    { title: 'My favorites', path: path.FAVORITES, icon: <GrFavorite /> },
    { title: 'Contact', path: path.CONTACT, icon: <RiContactsFill /> },
];
