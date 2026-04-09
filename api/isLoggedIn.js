const isLoggedIn = (req) => {
    return !!req.cookies.token;
}
module.exports = isLoggedIn;