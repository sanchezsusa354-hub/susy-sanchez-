import conexion from "../database/Conexion.js";
import { Router } from "express";

const routerProducto = Router()

// 1. READ: Obtener todos los productos
routerProducto.get('', async (req, res) => {
    try {
        const [rows] = await conexion.query('SELECT * FROM productos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos', detalle: error.message });
    }
});

// 2. READ: Obtener un producto por ID
routerProducto.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // El símbolo '?' protege contra inyecciones SQL
        const [rows] = await conexion.query('SELECT * FROM productos WHERE id = ?', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto', detalle: error.message });
    }
});

// 3. CREATE: Crear un nuevo producto
routerProducto.post('', async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock } = req.body;
        
        if (!nombre || !precio) {
            return res.status(400).json({ mensaje: 'Faltan campos obligatorios (nombre, precio)' });
        }

        const [result] = await conexion.query(
            'INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)',
            [nombre, descripcion, precio, stock || 0]
        );
        
        res.status(201).json({ 
            mensaje: 'Producto creado exitosamente', 
            id: result.insertId 
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto', detalle: error.message });
    }
});

// 4. UPDATE: Actualizar un producto existente
routerProducto.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, stock } = req.body;
        
        const [result] = await conexion.query(
            'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id = ?',
            [nombre, descripcion, precio, stock, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.json({ mensaje: 'Producto actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto', detalle: error.message });
    }
});

// 5. DELETE: Eliminar un producto
routerProducto.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await conexion.query('DELETE FROM productos WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.json({ mensaje: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto', detalle: error.message });
    }
});

export default routerProducto