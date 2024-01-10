export const formatPrice = (price: number | null): string => {
    if (price === null) {
        
        return 'Not available';
    }

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
    }).format(price);
};
