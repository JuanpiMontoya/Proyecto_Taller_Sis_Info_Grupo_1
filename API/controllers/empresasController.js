const db = require('../db');  // Conexión a la base de datos

// Crear un nuevo producto
exports.crearEmpresa = (req, res) => {
    const { nombre, descripcion, correo, contraseña, direccion, contacto, logo } = req.body;
    const proveedorId = req.usuarioId;  // ID del proveedor autenticado


    const query = 'INSERT INTO proveedores (nombre, correo, contraseña, descripcion, direccion, contacto, logo, id_proveedor) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [nombre, descripcion,  correo, contraseña, direccion, contacto, logo, proveedorId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ mensaje: 'Empresa creada con éxito' });
    });
};

// Obtener productos del proveedor autenticado
exports.obtenerEmpresas = (req, res) => {
    const query = 'SELECT * FROM proveedores';
    db.query(query, [proveedorId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Mostrar información de una empresa por su ID
exports.obtenerEmpresaPorId = (req, res) => {
    const empresaId = req.params.id;

    const query = 'SELECT * FROM proveedores WHERE id_proveedor = ?';
    
    db.query(query, [empresaId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ mensaje: 'Empresa no encontrada' });
        res.json(result[0]); 
    });
};



// Eliminar una empresa
exports.eliminarEmpresa= (req, res) => {
    const proveedorId = req.params.id;

    const query = 'DELETE FROM proveedores WHERE id = ? AND proveedor_id = ?';
    db.query(query, [proveedorId, req.usuarioId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Empresa eliminada con éxito' });
    });
};