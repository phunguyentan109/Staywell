export const OWNER_PERMISSION = '000';
export const PEOPLE_PERMISSION = '001';
export const UNACTIVE_PERMISSION = '002';
export const GUEST_PERMISSION = { code: '003' };

export function isPermit(roles = [GUEST_PERMISSION]){
    let uCode = roles.map(v => v.code);
    return function(vCode) {
        return uCode.indexOf(vCode) !== -1;
    }
}

export function isPeople(code) {
    return code === PEOPLE_PERMISSION;
}

export function isUnActive(code) {
    return code === UNACTIVE_PERMISSION;
}
