export const authAd = () => {
    const token = localStorage.getItem("auth_token_ad");
    console.log("token:", token);
    return token ? true : false;
};
