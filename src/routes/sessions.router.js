import { Router } from "express";
import passport from "passport";

const router = Router();

router.post('/login', passport.authenticate('login', { failureRedirect: '/failLogin' }), async (req, res) => {
    if (!req.user) {
        return res.status(400).send({ status: "error", error: "Credenciales invalidas" });
    }
    delete req.user.password;
    // req.session.user = req.user;
    req.session.user = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        email: req.user.email,
        rol: req.user.user_type
    }
    res.send({ status: "success", payload: req.session.user })
})
router.get('/failLogin', (req, res) => {
    res.send({ error: "Failed login" })
})

router.post('/register', passport.authenticate('register', { failureRedirect: '/failRegister' }), async (req, res) => {
    res.send({ status: "success", message: "Usuario registrado" })
})

router.get('/failRegister', async (req, res) => {
    console.log("Fallo la estrategia");
    res.send({ error: "Failed register" });
})

export default router;