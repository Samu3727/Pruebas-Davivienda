const express = require('express');
const cors = require('cors');
const path = require('path');

const notasRoutes = require('./routes/notas.routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api', notasRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
app.use(express.static(path.join(__dirname, 'public')));