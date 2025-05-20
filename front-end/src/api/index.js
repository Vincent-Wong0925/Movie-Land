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
        return ({ error: err });
    }
}

export const fetchFilmList = async (user_id) => {
    try {
        const response = await fetch(`${baseURL}/filmList/${user_id}`, { method: 'GET' });
        const jsonResponse = await response.json();

        if (!jsonResponse.error) {
            return jsonResponse;
        } else {
            throw new Error(jsonResponse.error);
        }
    } catch (err) {
        return ({ error: err });
    }
}

export const fetchTmdbMovie = async (film_id) => {
    const url = `https://api.themoviedb.org/3/movie/${film_id}?language=en-US`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2I0ZTYyNDAwZGY3OTUzYTYxNWFhM2EwNzZjODZjNCIsIm5iZiI6MTcyOTkwNjEzOS45ODU5OTk4LCJzdWIiOiI2NzFjNDVkYmM3ODAyY2M1MDM1YTE5ZWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Cxkx_nomzFSjy5lhlXgooSSKyrHO2lTJguzrAv06vFE'
        }
    };

    const response = await fetch(url, options);
    const jsonResponse = await response.json();
    return jsonResponse;
}