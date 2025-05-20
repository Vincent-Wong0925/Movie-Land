const baseURL = 'http://localhost:3000';

export const fetchComments = async (film_id) => {
    try {
        const response = await fetch(`${baseURL}/comment/${film_id}`, {
            method: 'GET',
        });
        const jsonResponse = await response.json();

        if (!jsonResponse.error) {
            return jsonResponse;
        } else {
            throw new Error(jsonResponse.error);
        }
    } catch (err) {
        return({error: err});
    }
}