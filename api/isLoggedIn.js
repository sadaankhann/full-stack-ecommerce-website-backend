export default function isLoggedIn(req) {
    return !!req.cookies.token;
}