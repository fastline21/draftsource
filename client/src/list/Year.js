export const yearList = () => {
    const currentYear = new Date().getFullYear();
    let years = [];
    for (let year = currentYear; year >= 1980; year--) {
        years = [...years, year];
    }
    return years;
};
