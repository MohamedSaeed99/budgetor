

export const convertToCurrencyAmount = (amount: number | undefined) => {
    if (amount === undefined) return '';
    else
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
}