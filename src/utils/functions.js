export const truncateString = (str, lng = 120) => {
    return str?.length > lng ? str?.slice(0, lng) + "..." : str;
}