import { fetchUser } from "../api";
import { setUser, setAuthenticated } from "../store/features/userSlice";

export const checkAuthenticated = (dispatch) => {
    fetchUser()
        .then(response => {
            if (response.error) {
                dispatch(setUser({}));
                dispatch(setAuthenticated(false));

                throw new Error(response.error);
            }

            dispatch(setUser(response));
            dispatch(setAuthenticated(true));
        })
        .catch(err => console.log(err));
}