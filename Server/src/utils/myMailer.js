import nodemailer from "nodemailer";

export const mailSender = (email, name) => {

    const auth = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: process.env.EMAIL_SENDER,
            pass: process.env.EMAIL_SENDER_PASSWORD

        },
        tls: {
            rejectUnauthorized: false, // Disable certificate validation
        },
    });

    const receiver = {
        from: process.env.EMAIL_SENDER,
        to: email,
        subject: "Welcome to Finance Tracker!",
        text: `Dear ${name},

We hope you're doing well! We are reaching out to provide an important update regarding your stay at [Dormitory Name].

Room Assignment Details:
Room Number: [Room Number]

Move-in Date: [Move-in Date]

Roommate(s): [If applicable]

Please make sure to complete all necessary formalities before your check-in date.

Payment Reminder (if applicable):
Rent Amount: [Amount]

Due Date: [Due Date]

Payment Link: [Payment URL]

Timely payments ensure smooth operations and uninterrupted stay. If you have already completed the payment, please disregard this message.

Important Dorm Guidelines:
Maintain cleanliness in shared spaces.

Adhere to quiet hours from [Time Range].

Report any maintenance issues via [Portal/Contact].

Respect dormitory policies and fellow residents.

For any queries, feel free to contact us at [Support Email] or [Phone Number].

Best Regards,
[Your Dorm Management Team]
[Your Institution Name]
[Website or Contact Information]`
    };

    auth.sendMail(receiver, (error, response) => {
        if (error) {
            console.log(error);

        }
        console.log('Email sent:', response.envelope);
    });
}

