export const getTotalSmokedCigarettes = () => {
    return localStorage.getItem('TOTAL_SMOKED_CIGARETTES');
};

export const setTotalSmokedCigarettes = (n) => {
    localStorage.setItem('TOTAL_SMOKED_CIGARETTES', String(n));
};

export const setCigarettesToday = (n) => {
    localStorage.setItem('CIGARETTES_TODAY', String(n));
};

export const getCigarettesToday = () => {
    return localStorage.getItem('CIGARETTES_TODAY');
};

export const getSmokingDays = () => {
    return localStorage.getItem('SMOKING_DAYS');
};

export const setSmokingDays = (n) => {
    localStorage.setItem('SMOKING_DAYS', String(n));
};
