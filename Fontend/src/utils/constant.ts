export const path: { [key: string]: string } = {
    ROOT: '/',
    HOME: '',
    ALL: '/*',
    LISTING: 'listing',
    FAVORITES: 'favorites',
};

export const navigates: { title: string; path: string }[] = [
    { title: 'Home', path: path.HOME },
    { title: 'Listing', path: path.LISTING },
    { title: 'My favorite', path: path.FAVORITES },
];
