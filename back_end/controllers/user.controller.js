const model = require("../models");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
function signUp(req, res) {
  const newUser = {
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword,
  };

  // Password validation
  if (newUser.userPassword.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters long",
    });
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/;
  if (!passwordRegex.test(newUser.userPassword)) {
    return res.status(400).json({
      message:
        "Password must contain a mix of numbers, alphabets, and special characters",
    });
  }

  // Check if the email already exists
  model.Users.findOne({
    where: { userEmail: newUser.userEmail },
  })
    .then((existingUser) => {
      if (existingUser) {
        // User with the same email already exists
        return res.status(409).json({
          message: "User with the same email already exists",
          user: existingUser,
        });
      }

      // Hash the user's password before saving it to the database
      bcrypt.hash(newUser.userPassword, 10, (hashErr, hashedPassword) => {
        if (hashErr) {
          return res.status(500).json({
            message: "Error hashing the password",
            error: hashErr,
          });
        }

        // Update the user's password with the hashed password
        newUser.userPassword = hashedPassword;

        // Create a new user with the hashed password
        model.Users.create(newUser)
          .then((user) => {
            return res.status(201).json({
              message: "User created successfully",
              user: user,
            });
          })
          .catch((createErr) => {
            return res.status(500).json({
              message: "An error occurred while creating the user",
              error: createErr,
            });
          });
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "An error occurred while checking for an existing user",
        error: err,
      });
    });
}

function login(req, res) {
  const email = req.body.userEmail;
  const password = req.body.userPassword;

  model.Users.findOne({ where: { userEmail: email } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      bcrypt.compare(password, user.userPassword, (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "An error occurred while comparing passwords",
            error: err,
          });
        }

        if (!result) {
          return res.status(401).json({
            message: "Incorrect password",
          });
        }

        return res.status(200).json({
          message: "Login successful",
          user: user,
        });
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "An error occurred while finding the user",
        error: err,
      });
    });
}

function forgotPassword(req, res) {
  const userEmail = req.body.userEmail;
  const token = crypto.randomBytes(32).toString("hex");

  model.Users.findOne({ where: { userEmail: userEmail } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      user
        .update({
          resetToken: token,
          resetTokenDuration: Date.now() + 3600000,
        })
        .then(() => {
          
          sendResetPasswordEmail(user, token);

          return res.status(200).json({
            message: "Password reset email sent",
          });
        })
        .catch((err) => {
          return res.status(500).json({
            message: "An error occurred while sending the email",
            error: err,
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "An error occurred while finding the user",
        error: err,
      });
    });
}

function sendResetPasswordEmail(user, token) {
  const id = user.get("id");
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "eaglewingstravel872@gmail.com",
      pass: "hkki qlof akho dfig", // Use the generated App Password here
    },
  });

  const mailOptions = {
    from: `"eaglewingstravel ✈️" <eaglewingstravel872@gmail.com>`,
    to: user.userEmail,
    subject: "Reset Password",
    html: `Click <a href="http://localhost:3000/users/reset-password?id=${id}&token=${token}">here</a> to reset your password`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
async function ResetPassword(req, res) {
  const id = req.query.id;
  const token = req.query.token;
  const newPassword = req.body.userPassword; // Assuming the property name is userPassword

  try {
    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    const user = await model.Users.findOne({ where: { id: id } });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

   

    if (user.resetToken === token && user.resetTokenDuration > Date.now()) {
      await user.update({
        userPassword: hashedPassword,
        resetToken: null,
        resetTokenDuration: null,
      });

      return res.status(200).json({
        message: "Password reset successful",
      });
    } else {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }
  } catch (error) {
    // Log or print the actual error message
    console.error("Error while finding the user:", error);

    return res.status(500).json({
      message: "An error occurred while finding the user",
      error: error.message || "Unknown error",
    });
  }
}
function ReenderResetPasswordPage(req, res) {
   res.sendFile("newPassowd.html", { root: __dirname });
}




module.exports = {
  signUp: signUp,
  forgotPassword: forgotPassword,
  ResetPassword: ResetPassword,
  login: login,
  ReenderResetPasswordPage: ReenderResetPasswordPage
  
};
