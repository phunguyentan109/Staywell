import jwtDecode from "jwt-decode";
import {clearAuthData, addUser} from "appRedux/actions/user";
import {apiUser} from "constants/api";
import {setTokenHeader} from "constants/api/call";

export default async function extractStorage(store) {
    try {
        // Check authentication data
        if(localStorage.swtoken) {
            setTokenHeader(localStorage.swtoken);
            if(sessionStorage.auth) {
                const user = JSON.parse(sessionStorage.auth);
                store.dispatch(addUser(user));
            } else {
                setTimeout(async() => {
                    let tokenData = jwtDecode(localStorage.swtoken);
                    let {token, ...user} = await apiUser.getOne(tokenData._id);
                    sessionStorage.setItem("auth", JSON.stringify(user));
                    store.dispatch(addUser(user));
                }, 3000);
            }
        }
    } catch(err) {
        store.dispatch(clearAuthData());
    }
}
