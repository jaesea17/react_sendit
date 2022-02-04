export const authAd = () => {
    const token = localStorage.getItem("auth_token_ad");
    return token ? true : false;
};
