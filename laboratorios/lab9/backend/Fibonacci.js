import express from 'express';
const router = express.Router();

router.get("/:num", async (req, res) => {
    try {

        const { num } = req.params;

        if (isNaN(num)) {
            return res.status(400).send({ error: "El valor introducido debe ser un número." });
        }

        if (num < 0) {
            return res.status(400).send({ error: "El número debe ser positivo." });
        }

        let FIBONACCI = [0, 1];
        for (let i = 2; i <= num; i++) {
            FIBONACCI[i] = FIBONACCI[i - 1] + FIBONACCI[i - 2];
        }

        const SERIE_FIBONACCI = FIBONACCI.join(", ");
        res.json({ SERIE_FIBONACCI });

    } catch (error) {
        console.log("ERROR IN API/FIBONACCI/:NUMBER", error);
        res.status(500).send({ error: "Error interno del servidor." });
    }
});

export default router;
