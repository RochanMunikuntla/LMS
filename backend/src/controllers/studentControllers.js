import bcrypt from "bcryptjs";
import {Student} from "../models/user.js";

// backend logic controllers

export const authStudent = async (req, res) => {
    const { studentId, password } = req.body;
    const student = await Student.findOne({ studentId });
    if (!student) {
        return res.status(400).json({ message: "Invalid Id or password" });
    }
    const isValidPassword = await bcrypt.compare(password, student.password);
    req.session.user = {
        id: student._id,
        studentId: student.studentId,
        name: student.name,
        email: student.email,
        department: student.department,
        year: student.year,
        dob: student.dob,
        role: "student"
    };
    if (!isValidPassword) {
        return res.status(400).json({ message: "Invalid Id or password" });
    }
    res.redirect("/student/home");
}

// frontend rendering controllers

export const home = (req, res) => {
    try {
        res.render("home");
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const signup = async (req, res) => {
    try {
        res.render("signup");
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const login = async (req, res) => {
    try {
        res.render("login");
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const profile = (req, res) => {
    try {
        res.render("profile");
    } catch (error) {
        console.log("Error: ", error);
    }
}