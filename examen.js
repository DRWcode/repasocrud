const express = require("express");
const app = express();

const PORT = 3000;

app.use(express.json());

let vehiculos = [
  {
    id: 1,
    marca: "Isuzu",
    modelo: "D-Max",
    anio: 2020,
    estado: "usado",
  },
  {
    id: 2,
    marca: "Toyota",
    modelo: "Corolla",
    anio: 2015,
    estado: "usado",
  },
  {
    id: 3,
    marca: "Honda",
    modelo: "Civic",
    anio: 2025,
    estado: "nuevo",
  }
];

// Endpoint para obtener todos los vehículos
app.get("/vehiculos", (req, res) => {
  res.status(200).json({ status: 200, message: "Success", vehiculos });
});

// Endpoint para agregar un nuevo vehículo
app.post('/vehiculos', (req, res) => {
    let vehiculo = req.body;
    vehiculos.push(vehiculo);
    res.json({ status: 201, message: 'Success', data: vehiculo });
});

// Endpoint para actualizar un vehículo por su ID
app.put("/vehiculos", (req, res) => {
  let vehiculo = req.body;
  let exist = false;

  // Corregido: 'vehiculo.forEach' era incorrecto, debería ser 'vehiculos.forEach'
  vehiculos.forEach((prod) => {
    if (prod.id === vehiculo.id) {
      exist = true;
      prod.marca = vehiculo.marca;
      prod.modelo = vehiculo.modelo;
      prod.anio = vehiculo.anio;
      prod.estado = vehiculo.estado;
    }
  });

  if (exist) {
    res.json({ status: 201, message: "Success", data: vehiculo });
  } else {
    // Corregido: 'producto' no estaba definido, debería ser 'vehiculo'
    res
      .status(400)
      .json({ status: 400, message: "Bad Request", data: vehiculo });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
