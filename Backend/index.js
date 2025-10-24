const express = require('express');
const cors = require('cors');
const path = require('path');

const notasRoutes = require('./routes/notas.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rutas API
app.use('/api', notasRoutes);
app.use('/api/auth', authRoutes);

// Debug: ruta rápida para comprobar que el servidor recibe POST en /api/auth/debug
app.post('/api/auth/debug', (req, res) => {
    res.json({ ok: true, message: 'debug auth route active' });
});

// Imprimir rutas registradas (para depuración)
function printRoutes() {
    try {
        const stack = app._router && app._router.stack ? app._router.stack : [];
        const routes = [];
        stack.forEach((middleware) => {
            if (middleware.route) {
                // routes registered directly on the app
                const methods = Object.keys(middleware.route.methods).join(',').toUpperCase();
                routes.push({ path: middleware.route.path, methods });
            } else if (middleware.name === 'router' && middleware.handle && middleware.handle.stack) {
                // router middleware
                middleware.handle.stack.forEach((handler) => {
                    if (handler.route) {
                        const methods = Object.keys(handler.route.methods).join(',').toUpperCase();
                        // prefix not easily known here, but we'll print the route
                        routes.push({ path: handler.route.path, methods });
                    }
                });
            }
        });
        console.log('Rutas registradas:', routes);
    } catch (err) {
        console.error('Error listando rutas:', err);
    }
}

// Servir estáticos (si hay frontend estático en /public)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Mostrar rutas registradas para depuración
setTimeout(() => printRoutes(), 200);