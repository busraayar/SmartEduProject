module.exports = (roles) => {
    return (req, res, next) => {
        const userRole = req.body.role;
        if(roles.include(userRole)){
            next();
        }else{
            res.status(401).send('YOU CANT DO IT');
        }
    }
}