const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());

let vehiculos = [
    {
      id: 1,
      marca: "Isuzu", // Corrección de "Izuzu" a "Isuzu"
      modelo: "D-Max", // Corrección de "Dmax" a "D-Max"
      anio: 2020,
      estado: "usado"
    },
    {
      id: 2,
      marca: "Toyota",
      modelo: "Corolla", // Corrección de "Corola" a "Corolla"
      anio: 2015,
      estado: "usado"
    },
    {
      id: 3,
      marca: "Honda",
      modelo: "Civic",
      anio: 2025, 
      estado: "nuevo"
    }
];

// Endpoint para obtener todos los vehículos
app.get('/vehiculos', (req, res) => {
    res.status(200).json({ status: 200, message: 'Success', vehiculos });
});

// ERROR: Se estaba llamando a "productos" en lugar de "vehiculos"
app.get('/vehiculos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let vehiculo = vehiculos.find(veh => veh.id === id);
    
    if (vehiculo) {
        res.json({ status: 200, message: 'Success', vehiculo });
    } else {
        res.status(404).json({ status: 404, message: 'Vehículo no encontrado' });
    }
});

// ERROR: No existe una variable llamada "productos", la cambié por "vehiculos"
app.post('/vehiculos', (req, res) => {
    let vehiculo = req.body;
    
    // Verificar si el ID ya existe
    if (vehiculos.some(veh => veh.id === vehiculo.id)) {
        return res.status(400).json({ status: 400, message: 'El ID ya existe', vehiculo });
    }

    vehiculos.push(vehiculo);
    res.json({ status: 200, message: 'Success', vehiculo });
});

// ERROR: Se refería a "productos", lo cambié por "vehiculos"
app.put('/vehiculos', (req, res) => {
    let vehiculo = req.body;
    let exist = false;
    
    vehiculos.forEach(veh => {
        if (veh.id === vehiculo.id) {
            exist = true;
            veh.marca = vehiculo.marca;
            veh.modelo = vehiculo.modelo;
            veh.anio = vehiculo.anio;
            veh.estado = vehiculo.estado;
        }
    });

    if (exist) {
        res.json({ status: 200, message: 'Success', vehiculo });
    } else {
        res.status(400).json({ status: 400, message: 'Vehículo no encontrado', vehiculo });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
