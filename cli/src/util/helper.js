export function formatVND(num) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "VND",
        currencyDisplay: "code"
    }).format(num*1000);
}
