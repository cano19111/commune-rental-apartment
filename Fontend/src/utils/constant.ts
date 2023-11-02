export const path: { [key: string]: string } = {
    ROOT: '/',
    HOME: '',
    ALL: '/*',
    LISTING: 'listing',
    FAVORITES: 'favorites',
    CONTRACT: 'contract',
};

export const navigates: { title: string; path: string }[] = [
    { title: 'Home', path: path.HOME },
    { title: 'Listing', path: path.LISTING },
    { title: 'My favorites', path: path.FAVORITES },
    { title: 'Contract', path: path.CONTRACT },
];
