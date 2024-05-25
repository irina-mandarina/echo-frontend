import { getJWT } from "~/lib/localStorageUtil";

export const requestHeaders = () => {
    return {
        'Authorization': `Bearer ${getJWT()}`
    };
}