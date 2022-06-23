import cookie from 'cookie';

const fetchAPI = async ({ method, url, body = {} }) => {
    try {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        const requestObject = { method, headers, credentials: 'include' };

        if (method !== 'GET' && body) {
            requestObject.body = JSON.stringify(body);
        }

        const response = await fetch(`/api/${url}`, requestObject);

        let data;
        try {
            data = await response.json();
        } catch (err) {
            console.error(err);
            throw new Error('Failed to parse Response Data');
        }

        if (!response.ok) {
            throw new Error(data.message);
        }

        return { status: response.status, data: data.body, message: data.message };
    } catch (err) {
        console.error(err);
        throw new Error(err.message || 'Something went wrong');
    }

};

const fetchCookies = () => {
    return cookie.parse(document.cookie);
};

export { fetchAPI, fetchCookies };