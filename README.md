# Notas — Pruebas Davivienda

Este paquete contiene la aplicación frontend de notas usada en las pruebas para Davivienda.

Resumen
-------
Aplicación web simple para crear, editar y listar notas. Está construida con Create React App y se conecta a un servicio backend que gestiona el almacenamiento y las operaciones sobre las notas.

Estructura relevante
---------------------
- `../Backend/` — servidor (API) que expone los endpoints para manejar notas.
- `.` (carpeta `notas`) — aplicación frontend React (UI) que consume la API.

Tecnologías
----------
- Frontend: React (Create React App), JavaScript, JSX
- Backend: Node.js + Express (en la carpeta `Backend`)

Requisitos
---------
- Node.js (v14+ recomendado)
- npm

Instalación y ejecución (Windows PowerShell)
-------------------------------------------
1. Instalar dependencias del backend y ejecutarlo (desde la raíz del proyecto):

```powershell
cd Backend; npm install; node index.js
```

2. Instalar dependencias del frontend y arrancar la app (desde `notas`):

```powershell
cd notas; npm install; npm run start
```

Notas:
- Asegúrate de que el backend esté corriendo antes de abrir el frontend, ya que la app de notas depende de la API para leer/guardar datos.
- Si la app usa `npm run dev` en tu proyecto, sustitúyelo por el script que tengas configurado (`start` o `dev`).

Uso
---
Una vez arrancado el frontend, abre tu navegador en `http://localhost:3000` (o en el puerto que indique la terminal). La interfaz permite:
- Crear nuevas notas
- Listar notas existentes
- Editar y eliminar notas

Contribuir
----------
Si quieres colaborar:
1. Haz un fork y crea una rama con tu cambio.
2. Asegúrate de que el backend y el frontend sigan funcionando.
3. Abre un pull request describiendo los cambios.

Contacto / Autor
----------------
Proyecto preparado por el equipo de pruebas (repositorio: Pruebas-Davivienda). Para dudas abre un issue en el repositorio.

Licencia
--------
Licencia MIT — ver el archivo `LICENSE` si existe.

---
Este README sustituye el contenido por defecto generado por Create React App para ofrecer una descripción del proyecto y pasos básicos para ejecutar la aplicación.
