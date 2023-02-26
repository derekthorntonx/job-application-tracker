import jwt from 'jsonwebtoken';

//Verify for valid JWT token
export const checkAuth = (req, res, next) => {
    console.log('Check Auth fired')
    try{
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY)
    req.userData = decoded;
    next();

    } catch(err) {
        console.log('Check Auth CATCH fired')
        res.status(401).json({message: 'Auth failed.'});
    }
}