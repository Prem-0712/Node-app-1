import jwt from 'jsonwebtoken';
import UserModel from '../account/User.js';

const checkUserAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer')) {
        return res.status(401).json({
            status: 'failed',
            message: 'Authentication required'
        });
    }

    try {
        const token = authorization.split(' ')[1];

        const { userID } = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY
        );

        const user = await UserModel
            .findById(userID)
            .select('-hashedPassword');

        if (!user) {
            return res.status(401).json({
                status: 'failed',
                message: 'User not found'
            });
        }

        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json({
            status: 'failed',
            message: 'Invalid or expired token'
        });
    }
};

export default checkUserAuth;