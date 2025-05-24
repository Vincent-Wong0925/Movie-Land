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

export const fetchUserComments = async (user_id, film_id) => {
    try {
        const queryString = new URLSearchParams({ user_id, film_id });
        const response = await fetch(`${baseURL}/comment?${queryString}`, {
            method: 'GET',
            credentials: 'include',
        })
        const jsonResponse = await response.json();

        if (jsonResponse.error) {
            throw new Error(jsonResponse.error);
        }

        return (jsonResponse.result);
    } catch (err) {
        return ({ error: err });
    }
}

export const addComment = async (user_id, film_id, score, comment) => {
    try {
        if (!user_id || !film_id || !score || !comment) {
            throw new Error('Missing information');
        }
        const response = await fetch(`${baseURL}/comment`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
                accept: 'application/json',
            },
            body: JSON.stringify({
                user_id,
                film_id,
                score,
                comment
            })
        });
        const jsonResponse = await response.json();
        if (jsonResponse.error) {
            throw new Error(jsonResponse.error);
        }

        return jsonResponse;
    } catch (err) {
        return ({ error: err });
    }
}

export const updateComment = async (user_id, film_id, score, comment) => {
    try {
        if (!user_id || !film_id || !score || !comment) {
            throw new Error('Missing information');
        }
        const response = await fetch(`${baseURL}/comment`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify({
                user_id,
                film_id,
                score,
                comment
            })
        });
        const jsonResponse = await response.json();
        if (jsonResponse.error) {
            throw new Error(jsonResponse.error);
        }

        return jsonResponse;
    } catch (err) {
        return ({ error: err });
    }
}

export const deleteComment = async (user_id, film_id) => {
    try {
        if (!user_id || !film_id) {
            throw new Error('Missing information');
        }
        const response = await fetch(`${baseURL}/comment`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify({
                user_id,
                film_id,
            })
        });
        const jsonResponse = await response.json();
        if (jsonResponse.error) {
            throw new Error(jsonResponse.error);
        }

        return jsonResponse;
    } catch (err) {
        return ({ error: err });
    }
}

export const fetchFilmList = async (user_id) => {
    const response = await fetch(`${baseURL}/filmList/${user_id}`, {
        method: 'GET',
        credentials: 'include'
    });
    const jsonResponse = await response.json();

    if (!jsonResponse.error) {
        return jsonResponse.result;
    } else {
        throw new Error(jsonResponse.error);
    }
}

export const fetchFilmFromList = async (user_id, film_id) => {
    const queryString = new URLSearchParams({user_id, film_id});
    try {
        const response = await fetch(`${baseURL}/filmList?${queryString}`, {
            method: 'GET',
            credentials: 'include'
        });
        const jsonResponse = await response.json();

        if (jsonResponse.error) {
            throw new Error(jsonResponse.error);
        }
        return jsonResponse.result;
    } catch(err) {
        return {error: err};
    }
}

export const addToFilmList = async (user_id, film_id) => {
    try {
        const response = await fetch(`${baseURL}/filmList`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify({
                user_id,
                film_id
            })
        });
        const jsonResponse = await response.json();

        if (jsonResponse.error) {
            throw new Error(jsonResponse.error);
        }

        return jsonResponse.result;
    } catch(err) {
        return {error: err};
    }
}

export const deleteFromList = async (user_id, film_id) => {
    if (!user_id || !film_id) {
        return {error: 'missing information'}
    }

    try {
        const response = await fetch(`${baseURL}/filmList`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify({
                user_id,
                film_id
            })
        });
        const jsonResponse = await response.json();

        if(jsonResponse.error) {
            throw new Error(jsonResponse.error);
        }

        return jsonResponse.result;
    } catch(err) {
        return {error: err};
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

export const loginUser = async (email, password) => {
    const response = await fetch(`${baseURL}/login`, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            email,
            password
        })
    });
    const jsonResponse = await response.json();
    return jsonResponse;
}

export const registerUser = async (username, email, password) => {
    try {
        const response = await fetch(`${baseURL}/register`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                username,
                email,
                password,
            })
        });
        const jsonResponse = await response.json();

        return jsonResponse;
    } catch (err) {
        return ({ error: err });
    }
}

export const logoutUser = async () => {
    try {
        const response = await fetch(`${baseURL}/logout`, {
            method: 'GET',
            credentials: 'include',
        });

        if (response.error) {
            throw new Error(response.error);
        }

        return ('Logout successfully');
    } catch (err) {
        return ({ error: err });
    }
}

export const fetchUser = async () => {
    try {
        const response = await fetch(`${baseURL}/me`, {
            method: 'GET',
            credentials: 'include'
        });
        const jsonResponse = await response.json();

        if (jsonResponse.error) {
            throw new Error(jsonResponse.error);
        }
        return jsonResponse;
    } catch (err) {
        return ({ error: err });
    }
}