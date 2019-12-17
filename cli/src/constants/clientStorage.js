import jwtDecode from "jwt-decode";
import {clearAuthData, addUser} from "appRedux/actions/user";
import {setTokenHeader, apiCall} from "constants/api";
import api from "constants/api";

export default async function extractStorage(store) {
    try {
        // Check authentication data
        if(localStorage.swtoken) {
            setTokenHeader(localStorage.swtoken);
            if(sessionStorage.auth) {
                const user = JSON.parse(sessionStorage.auth);
                store.dispatch(addUser(user));
            } else {
                let tokenData = jwtDecode(localStorage.swtoken);
                let {token, ...user} = await apiCall(...api.user.getOne(tokenData._id));
                sessionStorage.setItem("auth", JSON.stringify(user));
                store.dispatch(addUser(user));
            }
        }
    } catch(err) {
        console.log(err);
        store.dispatch(clearAuthData());
    }
}
