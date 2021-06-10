export const apiCall = async (url: string) => {
    try {
        const response = await fetch(url)
        const data = await response.json();
        return data;
    }
    catch(e) {
        return e.message;
    }
}