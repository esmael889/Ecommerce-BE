import nodemailer from "nodemailer"


export const  Subjects={
    Register:"Activate your account",
    resetPassowrd:"Reset your password"
}

export const SendEmail=async({to,subject,html})=>{

    // setup Configrations of sending Email service
    const transporter=nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure:true,
        auth:{
            user:"esmaelll12367@gmail.com",
            pass:"auaj lffj qywu eccp"
        }
    })



    /// Body or real email 
    const info=await transporter.sendMail({
        from:"esmaelflancer22@gmail.com",
        to,
        subject,
        html
    })

    // console.log(info);
}

// SendEmail();