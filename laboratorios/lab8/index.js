import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json());

// Pseudo-base de datos en memoria
const pseudoDatabase = {
    ingresos: [],
    egresos: []
};

app.post('/api/ingresos', (req, res) => {
    try {
        const { monto, descripcion, fecha } = req.body;

        if (!monto || !descripcion || !fecha) throw new Error('Los campos monto, descripcion y fecha son requeridos');

        pseudoDatabase.ingresos.push({ monto, descripcion, fecha });
        res.status(201).json({ message: 'Ingreso almacenado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.get('/api/ingresos', (req, res) => {
    try {
        res.status(200).json(pseudoDatabase.ingresos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/egresos', (req, res) => {
    try {
        const { monto, descripcion, fecha } = req.body;

        if (!monto || !descripcion || !fecha) throw new Error('Los campos monto, descripcion y fecha son requeridos');

        pseudoDatabase.egresos.push(monto, descripcion, fecha);
        res.status(201).json({ message: 'Egreso almacenado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/egresos', (req, res) => {
    try {
        res.status(200).json(pseudoDatabase.egresos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// test api 
app.get('/test', async (req, res) => {
    try {
        res.status(200).json({ message: 'Hello World' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
