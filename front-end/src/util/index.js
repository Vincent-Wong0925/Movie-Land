import { fetchUser } from "../api";
import { setUser, setAuthenticated } from "../store/features/userSlice";

export const checkAuthenticated = () => {
    fetchUser()
        .then(response => {
            if (response.error) {
                setUser({});
                setAuthenticated(false);
                throw new Error(response.error);
            }

            setUser(response);
            setAuthenticated(true);
        })
}