export const validPassword = (password) => {
    if (password.length < 10) return false;
    const oneUpperCaseRegex = /[A-Z]/;
    if (!oneUpperCaseRegex.test(password)) return false;
    const oneDigitRegex = /\d/;
    if (!oneDigitRegex.test(password)) return false;
    const oneSymbolRegex = /[^\da-zA-Z]/;
    if (!oneSymbolRegex.test(password)) return false;
    return true;
};

export const validUsername = (username) => {
    if (username.length < 5) return false;
    const usernameRegex = /^[a-zA-Z]+[\da-zA-Z]*$/;
    if (!usernameRegex.test(username)) return false;
    return true;
};

export const validEmail = (email) => {
    const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) return false;
    return true;
};
