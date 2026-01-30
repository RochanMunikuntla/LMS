export const requireLogin = (role) => (req, res, next) => {
    if (!req.session.user || req.session.user.role !== role) {

        if (role === "student") return res.redirect("/pages/studentlogin");
        if (role === "faculty") return res.redirect("/pages/facultylogin");
        if (role === "admin") return res.redirect("/pages/adminlogin");

        console.log("requireLogin passed");
        return res.redirect("/pages/login");
    }
    next();
};
