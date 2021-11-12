export const auth = () => {
    const token = localStorage.getItem("auth_token");
    console.log("token:", token);
    return token ? true : false;
};
