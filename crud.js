const express = require('express');
const fs = require('fs');
const app = express();

const PORT = 3000;

const productos = [
    {
        id: 1,
        nombre: "Laptop",
        descripcion: "Laptop HP con procesador Intel Core i7",
        precio: 1200,
        stock: 10,
        categoria: "Electrónica"
    },
    {
        id: 2,
        nombre: "Smartphone",
        descripcion: "Teléfono móvil Samsung Galaxy S21",
        precio: 900,
        stock: 15,
        categoria: "Electrónica"
    },
    {
        id: 3,
        nombre: "Teclado Mecánico",
        descripcion: "Teclado mecánico RGB para gaming",
        precio: 80,
        stock: 20,
        categoria: "Accesorios"
    }
];

function readUsers() {
    const data = fs.readFileSync('usuariosdb.json', 'utf-8');
    return JSON.parse(data);
}

function saveUsers(users) {
    fs.writeFileSync('usuariosdb.json', JSON.stringify(users, null, 2));
}

app.use(express.json());

// GET - Read
app.get('/usuarios', (req, res) => {
    const users = readUsers();
    res.json({ status: 200, message: 'Success', users });
});

app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const users = readUsers();
    const user = users.find(u => u.id === parseInt(id));
    res.json({ status: 200, message: 'Success', user });
});

app.get('/productos', (req, res) => {
    res.status(200).json({ status: 200, message: 'Success', productos });
});

app.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    const producto = productos.find(prod => prod.id === parseInt(id));
    res.json({ status: 200, message: 'Success', producto });
});

// POST - Create
app.post('/usuarios', (req, res) => {
    const usuario = req.body;
    const users = readUsers();
    users.push(usuario);
    saveUsers(users);
    res.json({ status: 200, message: 'Success', usuario });
});

app.post('/productos', (req, res) => {
    const producto = req.body;
    productos.push(producto);
    res.json({ status: 200, message: 'Success', producto });
});

// PUT - Update
app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const usuario = req.body;
    const users = readUsers();
    const index = users.findIndex(user => user.id === parseInt(id));
    users[index] = { ...users[index], ...usuario };
    saveUsers(users);
    res.json({ status: 200, message: 'Success', usuario: users[index] });
});

app.put('/productos/:id', (req, res) => {
    const { id } = req.params;
    const producto = req.body;
    const index = productos.findIndex(prod => prod.id === parseInt(id));
    productos[index] = { ...productos[index], ...producto };
    res.json({ status: 200, message: 'Success', producto: productos[index] });
});

// DELETE - Delete
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const users = readUsers();
    const usuariosFiltrados = users.filter(user => user.id !== parseInt(id));
    saveUsers(usuariosFiltrados);
    res.json({ status: 200, message: 'Success' });
});

app.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    const index = productos.findIndex(prod => prod.id === parseInt(id));
    productos.splice(index, 1);
    res.json({ status: 200, message: 'Success' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});