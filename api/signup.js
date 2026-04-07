const { User} = require('./config/db');

const handler = async(req,res) =>{
    const checkingIfAlreadyExist = await User.findOne({ email: req.body.formData.email });
    
        if (checkingIfAlreadyExist) {
            return res.json({
                success: false,
                message: "User already Exist!"
            })
        }
    
        if (req.body.formData.password !== req.body.formData.confirmPassword) {
            return res.json({
                success: false,
                message: "Passwords did not match"
            })
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.formData.password, salt);
    
        const addingTheUser = await User.create({
            email: req.body.formData.email,
            password: hashedPassword,
            contactNo: Number(req.body.formData.contactNo)
        })
    
        if (addingTheUser) {
            const cookie = jwt.sign({ email: req.body.formData.email }, process.env.JWT_SECRET);
            if (cookie) {
                res.cookie('token', cookie);
                return res.json({
                    success: true
                })
            }
        }
}

export default handler;