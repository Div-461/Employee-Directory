const API_BASE_URL = 'http://localhost:4000/Employees';

export const fetchEmpData = async () => {
    try {
        const response = await fetch(API_BASE_URL);
        return response;
    } catch (error) {
        console.log(error.message);
    }
}