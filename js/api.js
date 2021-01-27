const BASE_URL = 'http://localhost:8083';
const RESOURCE_URL = `${BASE_URL}/cameras`;

const baseRequest = async ({ urlPath = '', method = 'GET', body = null }) => {
    try {
        const requestParameters = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };

        if (body) {
            requestParameters.body = JSON.stringify(body);
        }

        return await fetch(`${RESOURCE_URL}${urlPath}`, requestParameters);
    } catch (error) {

    }
};

export const getAllCameras = async () => {
    const rawResponse = await baseRequest({ method: 'GET' });
    return rawResponse.json();
};

export const addCamera = (body) => baseRequest({ method: 'POST', body });

export const editCamera = (id, body) => baseRequest({ urlPath: `/${id}`, method: 'PUT', body });

export const removeCamera = (id) => baseRequest({ urlPath: `/${id}`, method: 'DELETE' });