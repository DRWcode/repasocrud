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

const usuarios = [];

function reedUsers() {
  const data = fs.readFileSync('usuariosdb.json', 'utf-8');
  return JSON.parse(data);
}

function saveUsers(cusers) {
  fs.writeFileSync('usuariosdb.json', JSON.stringify(cusers, null, 2));
}

app.use(express.json());

// Endpoints de Usuarios
// GET
app.get('/usuarios', (req, res) => {
  const users = reedUsers();
  res.json({ status: 200, message: 'Success', users });
});

app.get('/usuarios/:id', (req, res) => {
  const id = req.params.id;
  res.status(200).json({ id: id });
});

app.get('/usuarios/:id/:edad', (req, res) => {
  const id = req.params.id;
  const edad = req.params.edad;
  res.status(200).json({ id: id, edad: edad });
});

// POST
app.post('/usuarios', (req, res) => {
  let usuario = req.body;
  const users = reedUsers();
  let findUser = users.find(user => user.id === usuario.id);
  if (findUser) {
    res.status(403).json({ status: 403, message: 'Error, El usuario ya existe', usuario });
  } else {
    users.push(usuario);
    saveUsers(users);
    res.json({ status: 200, message: 'Success', usuario });
  }
});

// PUT
app.put('/usuarios', (req, res) => {
    let usuario = req.body;
    let users = reedUsers();
    let exist = false;

    users.forEach(user => {
        if (user.id === usuario.id) {
            exist = true;
            user.nombre = usuario.nombre;
            user.email = usuario.email;
            user.telefono = usuario.telefono;
        }
    });

    if (exist) {
        saveUsers(users);
        res.json({ status: 200, message: 'Success', usuario });
    } else {
        res.status(400).json({ status: 400, message: 'usurio no existe', usuario });
    }
});

// DELETE
app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuarios = reedUsers();
  const usuariosFiltrados = usuarios.filter(user => user.id !== id);

  if (usuariosFiltrados.length !== usuarios.length) {
    saveUsers(usuariosFiltrados);
    res.json({ status: 200, message: 'Success' });
  } else {
    res.status(400).json({ status: 400, message: 'Registro no encontrado...' });
  }
});

// Endpoints de Productos
// GET
app.get('/productos', (req, res) => {
  res.status(200).json({ status: 200, message: 'Success', productos });
});

app.get('/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let producto = productos.find(prod => prod.id === id);
  res.json({ status: 200, message: 'Success', producto });
});

app.get('/productospornombre/:nombre', (req, res) => {
  const nombre = req.params.nombre;
  let producto = productos.find(prod => prod.nombre === nombre);
  res.json({ status: 200, message: 'Success', producto });
});

// POST
app.post('/productos', (req, res) => {
  let producto = req.body;
  productos.push(producto);
  res.json({ status: 200, message: 'Success', producto });
});

// PUT
app.put('/productos', (req, res) => {
  let producto = req.body;
  let exist = false;

  productos.forEach(prod => {
    if (prod.id === producto.id) {
      exist = true;
      prod.nombre = producto.nombre;
      prod.descripcion = producto.descripcion;
      prod.categoria = producto.categoria;
    }
  });

  if (exist) {
    res.json({ status: 200, message: 'Success', producto });
  } else {
    res.status(400).json({ status: 400, message: 'Bad Request', producto });
  }
});

// Otros Endpoints
app.get('/otra/:id/:edad', (req, res) => {
  const id = req.params.id;
  const edad = req.params.edad;
  res.status(200).json({ id: id, edad: edad });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});