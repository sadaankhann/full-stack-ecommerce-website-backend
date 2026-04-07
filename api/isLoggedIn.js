export default function isLoggedIn(req,res,next){
    if(req.cookies.token === ""){
        req.user = null;
    } else{
        req.user = req.cookies.token
        next();
    }
    next();
}