const User = require("../model/user1.js");

module.exports.renderSignupForm = (req, res) => {
    res.redirect("../frontend/src/landing_page/view/users/login");
};

module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ email, username });
        
        const registerUser = await User.register(newUser, password);
        console.log(registerUser);

        // Log in the user after registration
        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
            console.log("User registered and logged in successfully");
            req.flash("success", "Welcome to Airbnb Clone!");
            res.json({
                success: true,
                message: "Welcome to Airbnb Clone!",
                redirect: "/"  // Redirect path after successful login
            }); // Send flash message and redirect path to frontend
        });
    } catch (e) {
        console.error("Registration failed:", e);
        req.flash("error", e.message);
        res.json({
            success: false,
            message: e.message,  // Send error message to frontend
            redirect: "/signup"  // Redirect back to signup page in case of error
        });
    }
};


module.exports.renderLoginForm = (req, res) => {
    res.redirect("../frontend/src/landing_page/view/users/login")
};
module.exports.login = async (req, res) => {
    try {
        // Send success message and redirect URL as JSON response
        res.json({
            success: true,
            message: "Welcome back to Airbnb Clone!",
            redirect: "/"  // Specify the frontend route to redirect after login
        });
    } catch (loginError) {
        console.error("Login error:", loginError);

        // Send error message and redirect URL to login page as JSON response
        res.json({
            success: false,
            message: "Failed to log in. Please try again.",
            redirect: "/login"
        });
    }
};


module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);  // Handle any error that occurs during logout
        }
        req.flash("success", "You are logged out.");
        res.redirect("/");  // Redirect to the home page after logout
    });
};
