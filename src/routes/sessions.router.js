import { Router } from 'express';
import userModel from '../dao/models/users.model.js';
import { createHash, isValidPassword } from "../utils.js";

const router = Router();

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password, user_type } = req.body;
    const exists = await userModel.findOne({ email });
    if (exists) return res.status(400).send({ status: "error", error: "Ya existe usuario con ese email" });
    const user = {
        first_name,
        last_name,
        email,
        age,
        password: createHash(password),
        user_type
    }
    let result = await userModel.create(user);
    res.send({ status: "success", message: "Usuario registrado" });
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // Comprueba si los datos coinciden con estos.
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
        req.session.user = {
            name: "Admin Coderhouse",
            email: email,
            rol: "admin"
        }
        return res.send({ status: "success", payload: req.session.user, message: "Administrador logueado" });
    }
    // Si no coinciden los datos especiales, verifica en la base de datos
    const user = await userModel.findOne({ email });
    if (!user) return res.status(401).send({ status: "error", error: "Email incorrecto" });

    if (!isValidPassword(user, password)) {
        return res.status(401).send({ status: 'error', error: 'Contraseña incorrecta' })
    }
    delete user.password;
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        rol: user.user_type
    }
    res.send({ status: "success", payload: req.session.user, message: "Usuario logueado" });
})

export default router;