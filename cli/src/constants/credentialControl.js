export const OWNER_PERMISSION = "000";
export const PEOPLE_PERMISSION = "001";
export const GUEST_PERMISSION = {code: "002"};

export function isPermit(roles = [GUEST_PERMISSION]){
    let uCode = roles.map(v => v.code);
    return function(vCode) {
        return uCode.indexOf(vCode) !== -1;
    }
}
