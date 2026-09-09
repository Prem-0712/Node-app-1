import UserModel from "./User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class userController {

    static userRegistration = async (req, res) => {
        const { name, email, password1, password2, userRole } = req.body

        const user = await UserModel.findOne({ email: email })

        if (user) {
            return res.status(400).json({
                status: 'failed',
                message: 'User already exists'
            })
        } else {
            if (name && email && password1 && password2 && userRole) {

                if (password1 === password2) {

                    const salt = await bcrypt.genSalt(10)
                    const hashedPassword = await bcrypt.hash(password1, salt)

                    const doc = new UserModel({
                        name: name,
                        email: email,
                        hashedPassword: hashedPassword,
                        userRole: userRole
                    })

                    await doc.save()
                    return res.status(201).json({
                        status: 'success',
                        message: 'User created successfully'
                    })

                } else {
                    return res.status(400).json({
                        status: 'failed',
                        message: 'Both passwords should match'
                    })
                }

            } else {
                return res.status(400).json({
                    status: 'failed',
                    message: 'All fields are required'
                })
            }
        }
    }

    static userLogin = async (req, res) => {

        const { email, password } = req.body

        const user = await UserModel.findOne({ email: email })

        if (!user) {
            return res.status(400).json({
                status: 'failed',
                message: 'Invalid email or password'
            })
        }

        if (! await bcrypt.compare(password, user.hashedPassword)) {
            return res.status(400).json({
                status: 'failed',
                message: 'Invalid email or password'
            })
        }

        const accessToken = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '30m' })

        const refreshToken = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })

        return res.status(200).json({
            status: 'success',
            message: 'Login done',
            tokens: {
                'accessToken': accessToken,
                'refreshToken': refreshToken
            }
        })
    }

    static userProfile = async (req, res) => {

        return res.status(200).json({
            status: 'success',
            message: 'User profile',
            user: req.user
        });

    }

}

export default userController