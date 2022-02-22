async function fetchAPI({ method, url, body }) {

    try {

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        const requestObject = { method, headers };

        if (method !== 'GET' && body) {
            requestObject.body = JSON.stringify(body);
        }

        const response = await fetch(url, requestObject);

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

}

export default fetchAPI;