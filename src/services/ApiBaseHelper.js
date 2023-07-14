class ApiBaseHelper {
    static _token = localStorage.getItem('token');

    async postData(url = '') {
        const requestOptions = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + ApiBaseHelper._token
            },
            method: 'POST',
        };
        const response = await fetch(url, requestOptions);
        return await response.json();
    }

    async postDataRequestBody(url = '', body = {}) {
        const requestOptions = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + ApiBaseHelper._token
            },
            method: 'POST',
            body: JSON.stringify(body)
        };
        const response = await fetch(url, requestOptions);
        return await response.json();
    }

    async postFormDataRequestBody(url = '', body) {
        const requestOptions = {
            headers: {
                'Authorization': 'Bearer ' + ApiBaseHelper._token
            },
            method: 'POST',
            body: body
        };
        const response = await fetch(url, requestOptions);
        return await response.json();
    }

    async postFileRequestBody(url = '', body = {}) {
        const requestOptions = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + ApiBaseHelper._token
            },
            method: 'POST',
            body: JSON.stringify(body)
        };
        const response = await fetch(url, requestOptions);
        return response;
    }
}

const apiBaseHelper = new ApiBaseHelper();
export default apiBaseHelper;