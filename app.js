const express = require("express");
const app = express(); //para utilizar todos los metodos de la libreria
const bodyParser = require('body-parser');
const bcrypt = require("bcryptjs");



//para capturara los datos de los inputs
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config({ path: "./env/.env" }); // para lir a la raiz de proyecto para invocar el env

app.use("/resources", express.static('public'));
app.use("/resources", express.static(__dirname + "/public"));

//motor de platilla
app.set('view engine', 'ejs');

//invoca a bcryptjs
const bcryptjs = require('bcryptjs');

app.use(bodyParser.urlencoded({ extended: true })); // Para manejar datos de formularios
app.use(bodyParser.json()); // Para manejar JSON

// Configuración de la carpeta de vistas
app.set('view engine', 'ejs');  // Usamos EJS como motor de plantillas
app.set('views', __dirname + '/views');  // Asegúrate de que las vistas estén en la carpeta correcta
//var de session
const session = require('express-session');
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.get('/mostrar_afiliados', (req, res) => {
  const sql = `
    SELECT * 
    FROM afiliados 
    ORDER BY estado DESC, primer_apellido COLLATE 'utf8mb4_spanish_ci' ASC
  `;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta: ' + err.stack);
      return res.status(500).render('mostrar_afiliados', { afiliados: [], query: '', error: 'Error al cargar los datos.' });
    }

    res.render('mostrar_afiliados', { afiliados: results, query: '', error: null });
  });
});







app.use(express.json());

app.put('/afiliados/toggle/:numero_documento', (req, res) => {
  const numero_documento = req.params.numero_documento;

  // Consulta el estado actual del afiliado
  const queryEstado = 'SELECT estado FROM afiliados WHERE numero_documento = ?';
  connection.query(queryEstado, [numero_documento], (error, results) => {
    if (error) {
      console.error('Error al consultar el estado:', error);
      return res.status(500).json({ mensaje: 'Error al consultar el estado del afiliado' });
    }

    if (results.length === 0) {
      return res.status(404).json({ mensaje: 'Afiliado no encontrado' });
    }

    const estadoActual = results[0].estado; // 1 para habilitado, 0 para deshabilitado
    const nuevoEstado = estadoActual === 1 ? 0 : 1;

    // Actualiza el estado del afiliado
    const queryActualizar = 'UPDATE afiliados SET estado = ? WHERE numero_documento = ?';
    connection.query(queryActualizar, [nuevoEstado, numero_documento], (error) => {
      if (error) {
        console.error('Error al actualizar el estado:', error);
        return res.status(500).json({ mensaje: 'Error al actualizar el estado del afiliado' });
      }

      const mensaje = nuevoEstado === 1
        ? 'Afiliado habilitado correctamente'
        : 'Afiliado deshabilitado correctamente';

      res.json({ mensaje, nuevoEstado });
    });
  });
});
app.put('/talla_camisa/toggle/:idtalla_camisa', (req, res) => {
  const idtalla_camisa = req.params.idtalla_camisa;

  // Consulta el estado actual
  const queryEstado = 'SELECT estado FROM talla_camisa WHERE idtalla_camisa = ?';
  connection.query(queryEstado, [idtalla_camisa], (error, results) => {
    if (error) {
      console.error("Error al consultar la PENSION:", error);
      return res.status(500).json({ mensaje: 'Error al consultar la PENSION' });
    }

    if (results.length === 0) {
      return res.status(404).json({ mensaje: 'PENSION no encontrada' });
    }

    const estadoActual = results[0].estado;
    const nuevoEstado = estadoActual === 1 ? 0 : 1;

    const queryActualizar = 'UPDATE talla_camisa SET estado = ? WHERE idtalla_camisa = ?';
    connection.query(queryActualizar, [nuevoEstado, idtalla_camisa], (error) => {
      if (error) {
        console.error("Error al actualizar el estado:", error);
        return res.status(500).json({ mensaje: 'Error al actualizar el estado' });
      }

      const mensaje = nuevoEstado === 1 ? 'EPS habilitada correctamente' : 'EPS deshabilitada correctamente';
      // Enviar respuesta correctamente
      res.status(200).json({ mensaje, nuevoEstado });
    });
  });
});
app.put('/tipo_documento/toggle/:idtipo_documento', (req, res) => {
  const idtipo_documento = req.params.idtipo_documento;

  // Consulta el estado actual
  const queryEstado = 'SELECT estado FROM tipo_documento WHERE idtipo_documento = ?';
  connection.query(queryEstado, [idtipo_documento], (error, results) => {
    if (error) {
      console.error("Error al consultar la EPS:", error);
      return res.status(500).json({ mensaje: 'Error al consultar la EPS' });
    }

    if (results.length === 0) {
      return res.status(404).json({ mensaje: 'EPS no encontrada' });
    }

    const estadoActual = results[0].estado;
    const nuevoEstado = estadoActual === 1 ? 0 : 1;

    const queryActualizar = 'UPDATE tipo_documento SET estado = ? WHERE idtipo_documento = ?';
    connection.query(queryActualizar, [nuevoEstado, idtipo_documento], (error) => {
      if (error) {
        console.error("Error al actualizar el estado:", error);
        return res.status(500).json({ mensaje: 'Error al actualizar el estado' });
      }

      const mensaje = nuevoEstado === 1 ? 'EPS habilitada correctamente' : 'EPS deshabilitada correctamente';
      // Enviar respuesta correctamente
      res.status(200).json({ mensaje, nuevoEstado });
    });
  });
});

app.put('/pension/toggle/:idpension', (req, res) => {
  const idpension = req.params.idpension;

  // Consulta el estado actual
  const queryEstado = 'SELECT estado FROM pension WHERE idpension = ?';
  connection.query(queryEstado, [idpension], (error, results) => {
    if (error) {
      console.error("Error al consultar la PENSION:", error);
      return res.status(500).json({ mensaje: 'Error al consultar la PENSION' });
    }

    if (results.length === 0) {
      return res.status(404).json({ mensaje: 'PENSION no encontrada' });
    }

    const estadoActual = results[0].estado;
    const nuevoEstado = estadoActual === 1 ? 0 : 1;

    const queryActualizar = 'UPDATE pension SET estado = ? WHERE idpension = ?';
    connection.query(queryActualizar, [nuevoEstado, idpension], (error) => {
      if (error) {
        console.error("Error al actualizar el estado:", error);
        return res.status(500).json({ mensaje: 'Error al actualizar el estado' });
      }

      const mensaje = nuevoEstado === 1 ? 'EPS habilitada correctamente' : 'EPS deshabilitada correctamente';
      // Enviar respuesta correctamente
      res.status(200).json({ mensaje, nuevoEstado });
    });
  });
});
app.put('/talla_zapatos/toggle/:id', (req, res) => {
  const tallaId = req.params.id;

  // Obtener el estado actual de la talla
  const query = 'SELECT estado FROM talla_zapatos WHERE idtalla_zapatos = ?';
  connection.query(query, [tallaId], (error, results) => {
    if (error) {
      console.error('Error al obtener el estado:', error);
      return res.status(500).json({ error: 'Error al obtener el estado.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Talla no encontrada.' });
    }

    const estadoActual = results[0].estado;
    const nuevoEstado = estadoActual === 1 ? 0 : 1; // Cambiar el estado (habilitado <=> deshabilitado)

    // Actualizar el estado en la base de datos
    const updateQuery = 'UPDATE talla_zapatos SET estado = ? WHERE idtalla_zapatos = ?';
    connection.query(updateQuery, [nuevoEstado, tallaId], (updateError, updateResults) => {
      if (updateError) {
        console.error('Error al actualizar el estado:', updateError);
        return res.status(500).json({ error: 'Error al actualizar el estado.' });
      }

      // Responder con el nuevo estado
      res.json({
        mensaje: 'Estado cambiado exitosamente.',
        nuevoEstado: nuevoEstado
      });
    });
  });
});
app.put('/eps/toggle/:ideps', (req, res) => {
  const ideps = req.params.ideps;

  // Consulta el estado actual
  const queryEstado = 'SELECT estado FROM eps WHERE ideps = ?';
  connection.query(queryEstado, [ideps], (error, results) => {
    if (error) {
      console.error("Error al consultar la EPS:", error);
      return res.status(500).json({ mensaje: 'Error al consultar la EPS' });
    }

    if (results.length === 0) {
      return res.status(404).json({ mensaje: 'EPS no encontrada' });
    }

    const estadoActual = results[0].estado;
    const nuevoEstado = estadoActual === 1 ? 0 : 1;

    const queryActualizar = 'UPDATE eps SET estado = ? WHERE ideps = ?';
    connection.query(queryActualizar, [nuevoEstado, ideps], (error) => {
      if (error) {
        console.error("Error al actualizar el estado:", error);
        return res.status(500).json({ mensaje: 'Error al actualizar el estado' });
      }

      const mensaje = nuevoEstado === 1 ? 'EPS habilitada correctamente' : 'EPS deshabilitada correctamente';
      // Enviar respuesta correctamente
      res.status(200).json({ mensaje, nuevoEstado });
    });
  });
});



app.get("/afiliado/detalles", (req, res) => {
  const cedula = req.query.cedula;

  if (!cedula) {
    console.log("Cédula no proporcionada");
    return res.status(400).json({ error: "Cédula no proporcionada" });
  }

  console.log("Cédula recibida:", cedula);

  const query = "CALL mostrar_afiliado_y_asociados(?)";
  connection.query(query, [cedula], (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err.stack);
      return res.status(500).send("Error en la consulta");
    }

    // Imprimir los resultados completos para ver qué estamos recibiendo
    console.log("Resultados completos:", JSON.stringify(results[0], null, 2));

    const afiliadoYHijosConyuges = results[0]; // Toda la tabla con los datos devueltos

    if (!afiliadoYHijosConyuges || afiliadoYHijosConyuges.length === 0) {
      return res.render("mostrar_informacion", {
        error: "No se encontró información del afiliado.",
        afiliado: null,
        hijosConyuges: [],
      });
    }

    // Filtrar el afiliado principal
    const afiliado = afiliadoYHijosConyuges.find(
      row => row.numero_documento == cedula
    );

    // Verificar que realmente encontramos el afiliado
    if (!afiliado) {
      return res.render("mostrar_informacion", {
        error: "Afiliado no encontrado.",
        afiliado: null,
        hijosConyuges: [],
      });
    }

    // Imprimir los resultados del afiliado
    console.log("Afiliado encontrado:", afiliado);

    // Filtrar los hijos y cónyuges
    const hijosConyuges = afiliadoYHijosConyuges.filter(
      row => String(row.numero_docu_afiliado_hijo_conyuge) === String(cedula) && row.numero_documento !== cedula
    );

    // Imprimir los hijos y cónyuges antes de pasarlos a la vista
    console.log("Hijos o Cónyuges filtrados:", hijosConyuges);

    // Si no se encontraron hijos o cónyuges, verificar si es un problema de la base de datos o de filtrado
    if (hijosConyuges.length === 0) {
      console.log("No se encontraron hijos o cónyuges.");
    }

    // Asignar a la propiedad hijosConyuges del objeto afiliado
    afiliado.hijosConyuges = hijosConyuges;

    res.render("mostrar_informacion", {
      afiliado: afiliado,
      hijosConyuges: hijosConyuges, // Pasar los datos de hijos y cónyuges al renderizado
    });
  });
});

app.get('/pension', (req, res) => {
  const query = 'SELECT * FROM pension';
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).send('Error al obtener los datos de EPS');
    }
    res.render('pension', { pensionList: results });
  });
});

app.get('/eps', (req, res) => {
  const query = 'SELECT * FROM eps';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener la eps:', err);
      res.status(500).json({ error: 'Error al obtener datos' });
      return;
    }
    res.json(results); // Enviar las epscomo JSON
  });
});
app.get('/tipo_documento', (req, res) => {
  const query = 'SELECT * FROM tipo_documento';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener el tipo de documento:', err);
      res.status(500).json({ error: 'Error al obtener datos' });
      return;
    }
    res.json(results); // Enviar las epscomo JSON
  });
});
app.get('/dependencia', (req, res) => {
  const query = 'SELECT dependencia FROM dependencias';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener la dependencia:', err);
      res.status(500).json({ error: 'Error al obtener datos' });
      return;
    }
    res.json(results); // Enviar las epscomo JSON
  });
});
app.get('/dependencia', async (req, res) => {
  try {
    // Consulta para obtener las DEPENDENCIA desde tu base de datos
    const [rows] = connection.query('SELECT iddependencia dependencia FROM dependencias'); // Ajusta los nombres según tu tabla
    console.log('Resultado de la consulta:', [rows]);
    res.json(rows); // Devuelve los datos en formato JSON
  } catch (error) {
    console.error('Error al obtener las DEPENDENCIA:', error);
    res.status(500).send('Error del servidor');
  }
});
app.get('/entidades', (req, res) => {
  const query = 'SELECT * FROM entidades';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener la entidad:', err);
      res.status(500).json({ error: 'Error al obtener datos' });
      return;
    }
    res.json(results); // Enviar las epscomo JSON
  });
});
app.get('/entidades', async (req, res) => {
  try {
    // Consulta para obtener las EPS desde tu base de datos
    const [rows] = connection.query('SELECT identidad entidad FROM entidades'); // Ajusta los nombres según tu tabla
    console.log('Resultado de la consulta:', [rows]);
    res.json(rows); // Devuelve los datos en formato JSON
  } catch (error) {
    res.status(500).send('Error del servidor');
  }
});
app.get('/genero', (req, res) => {
  const query = 'SELECT  tipo_genero FROM genero';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener el genero:', err);
      res.status(500).json({ error: 'Error al obtener datos' });
      return;
    }
    res.json(results); // Enviar las epscomo JSON
  });
});
app.get('/pensiones', (req, res) => {
  const query = 'SELECT  entidad FROM pension';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener el genero:', err);
      res.status(500).json({ error: 'Error al obtener datos' });
      return;
    }
    res.json(results); // Enviar las epscomo JSON
  });
});
app.get('/talla_camisa', (req, res) => {
  const query = 'SELECT  talla FROM talla_camisa';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener el la talla de camisa:', err);
      res.status(500).json({ error: 'Error al obtener datos' });
      return;
    }
    res.json(results); // Enviar las epscomo JSON
  });
});
app.get('/talla_camisa', (req, res) => {
  const query = 'SELECT  talla FROM talla_camisa';
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Error al obtener los datos de talla de camisa');
    }
    res.render('agregar_talla_camisa', { tallacamisaList: results });
  });
});
app.get('/talla_pantalon', (req, res) => {
  const query = 'SELECT  talla_pantalon FROM talla_pantalon';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener la talla del pantalon:', err);
      res.status(500).json({ error: 'Error al obtener datos' });
      return;
    }
    res.json(results); // Enviar las epscomo JSON
  });
});
app.get('/talla_zapatos', (req, res) => {
  const query = 'SELECT  talla_zapatos FROM talla_zapatos';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener la talla de los zapatos:', err);
      res.status(500).json({ error: 'Error al obtener datos' });
      return;
    }
    res.json(results); // Enviar las epscomo JSON
  });
});
app.get('/eps', async (req, res) => {
  try {
    // Consulta para obtener las EPS desde tu base de datos
    const [rows] = connection.query('SELECT id_eps epscol FROM eps'); // Ajusta los nombres según tu tabla
    console.log('Resultado de la consulta:', [rows]);
    res.json(rows); // Devuelve los datos en formato JSON
  } catch (error) {
    console.error('Error al obtener las EPS:', error);
    res.status(500).send('Error del servidor');
  }
});
app.get('/pension', async (req, res) => {
  try {
    // Consulta para obtener las EPS desde tu base de datos
    const [rows] = connection.query('SELECT idpension entidad FROM pension'); // Ajusta los nombres según tu tabla
    console.log('Resultado de la consulta:', [rows]);
    res.json(rows); // Devuelve los datos en formato JSON
  } catch (error) {
    console.error('Error al obtener las ENTIDAD:', error);
    res.status(500).send('Error del servidor');
  }
});



app.get("/buscar_afiliados", (req, res) => {
  const cedula = req.query.cedula;
  if (cedula) {
    const query = 'CALL buscar_afiliados(?)'; // Llamar al procedimiento almacenado
    connection.query(query, [cedula], (err, results) => {
      if (err) {
        console.error('Error al ejecutar la consulta: ' + err.stack);
        return res.status(500).send('Error en la consulta');
      }
      if (results[0].length === 0) {
        return res.render('mostrar_afiliados', { error: 'No se encontró ningún afiliado con esa cédula', afiliados: [] });
      }

      const afiliado = results[0][0];
      if (afiliado.estado === 'deshabilitado') {
        return res.render('mostrar_afiliados', { error: 'El afiliado con esa cédula está deshabilitado', afiliados: [afiliado] });
      }

      res.render('mostrar_afiliados', { afiliados: results[0] });
    });
  } else {
    res.status(400).json({ error: 'Cédula no proporcionada' });
  }
});



// agregar
app.post('/agregar_talla_camisa', (req, res) => {
  const { nombre } = req.body; // Recibe el nombre de la EPS desde el formulario

  if (!nombre) {
    return res.status(400).send("El nombre de la EPS es obligatorio.");
  }
  const estado = 1; // Estado por defecto: Habilitado

  // Realiza la consulta para insertar la nueva EPS
  const query = 'INSERT INTO talla_camisa (talla, estado) VALUES (?, ?)';
  conexion.query(query, [nombre, estado], (error, results) => {
    if (error) {
      console.error("Error al agregar EPS:", error);
      return res.status(500).send("Error al agregar la EPS.");
    }
    res.redirect('/agregar_talla_camisa'); // Redirige a la página de EPS después de agregar
  });
});
app.post('/agregar_eps', (req, res) => {
  const { nombre } = req.body; // Recibe el nombre de la EPS desde el formulario

  if (!nombre) {
    return res.status(400).send("El nombre de la EPS es obligatorio.");
  }
  const estado = 1; // Estado por defecto: Habilitado

  // Realiza la consulta para insertar la nueva EPS
  const query = 'INSERT INTO eps (epscol, estado) VALUES (?, ?)';
  conexion.query(query, [nombre, estado], (error, results) => {
    if (error) {
      console.error("Error al agregar EPS:", error);
      return res.status(500).send("Error al agregar la EPS.");
    }
    res.redirect('/agregar_eps'); // Redirige a la página de EPS después de agregar
  });
});
app.post('/agregar_dependencia', (req, res) => {
  const { nombre } = req.body; // Recibe el nombre de la EPS desde el formulario

  if (!nombre) {
    return res.status(400).send("El nombre de la DEPENDENCIA es obligatorio.");
  }
  const estado = 1; // Estado por defecto: Habilitado

  // Realiza la consulta para insertar la nueva EPS
  const query = 'INSERT INTO dependencias (dependencia, estado) VALUES (?, ?)';
  conexion.query(query, [nombre, estado], (error, results) => {
    if (error) {
      console.error("Error al agregar DEPENDENCIA:", error);
      return res.status(500).send("Error al agregar la DEPENDENCIA.");
    }
    res.redirect('/agregar_dependencia'); // Redirige a la página de EPS después de agregar
  });
});
app.post('/agregar_tipo_documento', (req, res) => {
  const { nombre } = req.body; // Recibe el nombre de la EPS desde el formulario

  if (!nombre) {
    return res.status(400).send("El nombre de la EPS es obligatorio.");
  }
  const estado = 1; // Estado por defecto: Habilitado

  // Realiza la consulta para insertar la nueva EPS
  const query = 'INSERT INTO tipo_documento (tipo_documentocol, estado) VALUES (?, ?)';
  conexion.query(query, [nombre, estado], (error, results) => {
    if (error) {
      console.error("Error al agregar EPS:", error);
      return res.status(500).send("Error al agregar la EPS.");
    }
    res.redirect('/agregar_tipo_documento'); // Redirige a la página de EPS después de agregar
  });
});
app.use(express.urlencoded({ extended: true })); // Esto es necesario para procesar datos de formularios
app.use(express.json());

app.post('/agregar_pension', (req, res) => {
  const { nombre } = req.body; // Recibe el nombre de la EPS desde el formulario

  if (!nombre) {
    return res.status(400).send("El nombre de la ENTIDAD DE PENSIONES es obligatorio.");
  }

  const estado = 1; // Estado por defecto: Habilitado

  // Realiza la consulta para insertar la nueva EPS
  const query = 'INSERT INTO pension (entidad, estado) VALUES (?, ?)';
  connection.query(query, [nombre, estado], (error, results) => {
    if (error) {
      console.error("Error al agregar PENSION:", error);
      return res.status(500).send("Error al agregar la EPS.");
    }
    res.redirect('/agregar_pension'); // Redirige a la página de EPS después de agregar
  });
});
app.use(express.urlencoded({ extended: true })); // Esto es necesario para procesar datos de formularios
app.use(express.json());


app.post('/agregar_talla_camisa', (req, res) => {
  const { nombre } = req.body; // Recibe el nombre de la EPS desde el formulario

  if (!nombre) {
    return res.status(400).send("El nombre de la EPS es obligatorio.");
  }
  const estado = 1; // Estado por defecto: Habilitado

  // Realiza la consulta para insertar la nueva EPS
  const query = 'INSERT INTO talla_camisa (talla, estado) VALUES (?, ?)';
  conexion.query(query, [nombre, estado], (error, results) => {
    if (error) {
      console.error("Error al agregar EPS:", error);
      return res.status(500).send("Error al agregar la EPS.");
    }
    res.redirect('/talla_camisa'); // Redirige a la página de EPS después de agregar
  });
});
app.get('/agregar_eps', (req, res) => {
  const query = 'SELECT * FROM eps';
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).send('Error al obtener los datos de EPS');
    }
    res.render('agregar_eps', { epsList: results });
  });
});

app.get('/agregar_tipo_documento', (req, res) => {
  const query = 'SELECT * FROM tipo_documento';
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).send('Error al obtener los datos del tipo de documento');
    }
    res.render('agregar_tipo_documento', { tipodocuList: results });  // Cambia 'eps' por 'agregar_eps'
  });
});
app.get('/agregar_eps', (req, res) => {
  const query = 'SELECT * FROM eps';
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).send('Error al obtener los datos de EPS');
    }
    res.render('agregar_eps', { epsList: results });  // Cambia 'eps' por 'agregar_eps'
  });
});
app.get('/agregar_pension', (req, res) => {
  const query = 'SELECT * FROM pension';
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).send('Error al obtener los datos de la pension');
    }
    res.render('agregar_pension', { pensionList: results });  // Cambia 'eps' por 'agregar_eps'
  });
});
app.get('/agregar_talla_camisa', (req, res) => {
  const query = 'SELECT * FROM talla_camisa';
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).send('Error al obtener los datos de la camisa');
    }
    res.render('agregar_talla_camisa', { tallacamisaList: results });  // Cambia 'eps' por 'agregar_eps'
  });
});
app.get('/agregar_tipo_documento', (req, res) => {
  const query = 'SELECT * FROM tipo_documento';
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).send('Error al obtener los datos de EPS');
    }
    res.render('agregar_tipo_documento', { tipodocuList: results });
  });
});

app.get("/agregar_talla_zapatos", (req, res) => {
  const query = 'SELECT * FROM talla_zapatos';
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error al obtener los datos:", error);
      return res.status(500).json({ error: "Error al obtener los datos." });
    }
    res.render("agregar_talla_zapatos", { tallasList: results });
  });
});

app.post("/agregar_talla_zapatos", (req, res) => {
  const { talla_zapatos } = req.body;

  const query = `CALL agregar_talla_zapatos(?)`;

  connection.query(query, [talla_zapatos], (error, results) => {
    if (error) {
      console.error("Error al agregar la talla:", error);
      return res.status(500).json({ error: "Error al agregar la talla." });
    }
    res.redirect("/agregar_talla_zapatos"); // Redirigir a la vista con las tallas actualizadas
  });
});

// genero
// Cambiar el estado del tipo de género
app.put('/tipo_genero/toggle/:id', (req, res) => {
  const generoId = req.params.id;

  // Obtener el estado actual del género
  const query = 'SELECT estado FROM genero WHERE id_genero = ?';
  connection.query(query, [generoId], (error, results) => {
    if (error) {
      console.error('Error al obtener el estado:', error);
      return res.status(500).json({ error: 'Error al obtener el estado.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Género no encontrado.' });
    }

    const estadoActual = results[0].estado;
    const nuevoEstado = estadoActual === 1 ? 0 : 1; // Cambiar el estado (habilitado <=> deshabilitado)

    // Actualizar el estado en la base de datos
    const updateQuery = 'UPDATE genero SET estado = ? WHERE id_genero = ?';
    connection.query(updateQuery, [nuevoEstado, generoId], (updateError, updateResults) => {
      if (updateError) {
        console.error('Error al actualizar el estado:', updateError);
        return res.status(500).json({ error: 'Error al actualizar el estado.' });
      }

      // Responder con el nuevo estado
      res.json({
        mensaje: 'Estado cambiado exitosamente.',
        nuevoEstado: nuevoEstado
      });
    });
  });
});

// Obtener los géneros y mostrarlos en la vista
app.get("/agregar_genero", (req, res) => {
  const query = 'SELECT * FROM genero';
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error al obtener los datos:", error);
      return res.status(500).json({ error: "Error al obtener los datos." });
    }
    res.render("agregar_genero", { generosList: results });
  });
});

// Agregar un nuevo género usando un procedimiento almacenado
app.post("/agregar_genero", (req, res) => {
  const { tipo_genero } = req.body;
  const query = `CALL agregar_tipo_genero(?)`;

  connection.query(query, [tipo_genero], (error, results) => {
    if (error) {
      console.error("Error al agregar el género:", error);
      return res.status(500).json({ error: "Error al agregar el género." });
    }
    res.redirect("/agregar_genero"); // Redirigir a la vista con los géneros actualizados
  });
});



//pantalon
// Cambiar estado de una talla
app.put('/talla_pantalon/toggle/:id', (req, res) => {
  const tallaId = req.params.id;

  // Obtener el estado actual de la talla
  const query = 'SELECT estado FROM talla_pantalon WHERE idtalla_pantalon = ?';
  connection.query(query, [tallaId], (error, results) => {
    if (error) {
      console.error('Error al obtener el estado:', error);
      return res.status(500).json({ error: 'Error al obtener el estado.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Talla no encontrada.' });
    }

    const estadoActual = results[0].estado;
    const nuevoEstado = estadoActual === 1 ? 0 : 1; // Cambiar el estado (habilitado <=> deshabilitado)

    // Actualizar el estado en la base de datos
    const updateQuery = 'UPDATE talla_pantalon SET estado = ? WHERE idtalla_pantalon = ?';
    connection.query(updateQuery, [nuevoEstado, tallaId], (updateError, updateResults) => {
      if (updateError) {
        console.error('Error al actualizar el estado:', updateError);
        return res.status(500).json({ error: 'Error al actualizar el estado.' });
      }

      // Responder con el nuevo estado
      res.json({
        mensaje: 'Estado cambiado exitosamente.',
        nuevoEstado: nuevoEstado
      });
    });
  });
});

// Obtener las tallas
app.get("/agregar_talla_pantalon", (req, res) => {
  const query = 'SELECT * FROM talla_pantalon';
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error al obtener los datos:", error);
      return res.status(500).json({ error: "Error al obtener los datos." });
    }
    res.render("agregar_talla_pantalon", { tallasList: results });
  });
});

// Agregar una nueva talla
app.post("/agregar_talla_pantalon", (req, res) => {
  const { talla_pantalon } = req.body;
  const query = `CALL agregar_talla_pantalon(?)`;

  connection.query(query, [talla_pantalon], (error, results) => {
    if (error) {
      console.error("Error al agregar la talla:", error);
      return res.status(500).json({ error: "Error al agregar la talla." });
    }
    res.redirect("/agregar_talla_pantalon"); // Redirigir a la vista con las tallas actualizadas
  });
});

// Cambiar estado de entidades
app.put('/entidades/toggle/:id', (req, res) => {
  const entidadId = req.params.id;

  // Obtener el estado actual de la entidad
  const query = 'SELECT estado FROM entidades WHERE identidad = ?';
  connection.query(query, [entidadId], (error, results) => {
    if (error) {
      console.error('Error al obtener el estado:', error);
      return res.status(500).json({ error: 'Error al obtener el estado.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Entidad no encontrada.' });
    }

    const estadoActual = results[0].estado;
    const nuevoEstado = estadoActual === 1 ? 0 : 1; // Cambiar el estado (habilitado <=> deshabilitado)

    // Actualizar el estado en la base de datos
    const updateQuery = 'UPDATE entidades SET estado = ? WHERE identidad = ?';
    connection.query(updateQuery, [nuevoEstado, entidadId], (updateError, updateResults) => {
      if (updateError) {
        console.error('Error al actualizar el estado:', updateError);
        return res.status(500).json({ error: 'Error al actualizar el estado.' });
      }

      // Responder con el nuevo estado
      res.json({
        mensaje: 'Estado cambiado exitosamente.',
        nuevoEstado: nuevoEstado
      });
    });
  });
});
app.put('/dependencia/toggle/:id', (req, res) => {
  const dependenciadId = req.params.id;

  // Obtener el estado actual de la dependencia
  const query = 'SELECT estado FROM dependencias WHERE iddependencia = ?';
  connection.query(query, [dependenciadId], (error, results) => {
    if (error) {
      console.error('Error al obtener el estado:', error);
      return res.status(500).json({ error: 'Error al obtener el estado.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Entidad no encontrada.' });
    }

    const estadoActual = results[0].estado;
    const nuevoEstado = estadoActual === 1 ? 0 : 1; // Cambiar el estado (habilitado <=> deshabilitado)

    // Actualizar el estado en la base de datos
    const updateQuery = 'UPDATE dependencias SET estado = ? WHERE iddependencia = ?';
    connection.query(updateQuery, [nuevoEstado, dependenciadId], (updateError, updateResults) => {
      if (updateError) {
        console.error('Error al actualizar el estado:', updateError);
        return res.status(500).json({ error: 'Error al actualizar el estado.' });
      }

      // Responder con el nuevo estado
      res.json({
        mensaje: 'Estado cambiado exitosamente.',
        nuevoEstado: nuevoEstado
      });
    });
  });
});
app.get('/filtrar-edad', (req, res) => {
  const { edadMin, edadMax } = req.query;

  const query = `
    SELECT * FROM afiliados
    WHERE TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE()) BETWEEN ? AND ?`;

  conexion.query(query, [edadMin, edadMax], (err, results) => {
    if (err) {
      return res.status(500).send('Error en la consulta');
    }
    res.render('mostrar_afiliados', { afiliados: results });
  });
});

// Mostrar formulario para agregar entidad
app.get("/agregar_entidad", (req, res) => {
  const query = 'SELECT * FROM entidades';
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error al obtener los datos:", error);
      return res.status(500).json({ error: "Error al obtener los datos." });
    }
    res.render("agregar_entidad", { entidades: results });
  });
});

// Agregar una nueva entidad
app.post("/agregar_entidad", (req, res) => {
  const { nombre_entidad } = req.body;
  const query = `CALL agregar_entidad(?)`;

  connection.query(query, [nombre_entidad], (error, results) => {
    if (error) {
      console.error("Error al agregar la entidad:", error);
      return res.status(500).json({ error: "Error al agregar la entidad." });
    }
    res.redirect("/agregar_entidad"); // Redirigir a la vista con las entidades actualizadas
  });
});
app.post("/agregar_dependencia", (req, res) => {
  const { nombre_dependencia } = req.body;
  const query = `CALL agregar_dependencia(?)`;

  connection.query(query, [nombre_dependencia], (error, results) => {
    if (error) {
      console.error("Error al agregar la entidad:", error);
      return res.status(500).json({ error: "Error al agregar la entidad." });
    }
    res.redirect("/agregar_dependencia"); // Redirigir a la vista con las dependencia actualizadas
  });
});
app.get("/agregar_dependencia", (req, res) => {
  const query = 'SELECT * FROM dependencias';
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error al obtener los datos:", error);
      return res.status(500).json({ error: "Error al obtener los datos." });
    }
    res.render("agregar_dependencia", { dependencia: results });
  });
});
app.get('/dependencia', (req, res) => {
  const query = 'SELECT * FROM dependencias';
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).send('Error al obtener los datos de la DEPENDENCIA');
    }
    res.render('dependencia', { dependencia: results });
  });
});








// Actualizar afiliado y hijo o conyugue
app.get('/actualizar', (req, res) => {
  const documento = req.query.numero_documento;
  const query = 'CALL buscar_afiliados(?)';
  connection.query(query, [documento], (err, results) => {
    if (err) {
      console.error('Error al ejecutar el procedimiento:', err);
      return res.status(500).render('error', { error: 'Error en el servidor' });
    }

    if (results[0].length === 0) {
      return res.status(404).render('actualizar', { error: 'No se encontró el afiliado.' });
    }
    const afiliado = results[0][0];
    res.render('actualizar', { afiliado });
  });
});


app.post('/actualizar', (req, res) => {
  const { tipo } = req.body; // Extraemos el tipo y los datosdependencia
  if (tipo === 'afiliado') {
    const {
      tipo_documento_afiliado, numero_documento, primer_nombre_afiliado, segundo_nombre_afiliado,
      primer_apellido_afiliado, segundo_apellido_afiliado, fecha_nacimiento_afiliado, edad_afiliado, genero_afiliado,
      correo_electronico_afiliado, correo_electronico_alternativo_afiliado, numero_celular_afiliado,
      numero_celular_alternativo_afiliado, municipio_residencia_afiliado, direccion_residencia_afiliado,
      entidad_afiliado, dependencia_afiliado
    } = req.body;
    const query = `CALL editar_afiliado2(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    conexion.query(query, [
      tipo_documento_afiliado, numero_documento, primer_nombre_afiliado, segundo_nombre_afiliado,
      primer_apellido_afiliado, segundo_apellido_afiliado, fecha_nacimiento_afiliado, edad_afiliado, genero_afiliado,
      correo_electronico_afiliado, correo_electronico_alternativo_afiliado, numero_celular_afiliado,
      numero_celular_alternativo_afiliado, municipio_residencia_afiliado, direccion_residencia_afiliado,
      entidad_afiliado, dependencia_afiliado
    ], (err) => {
      if (err) {
        console.error("Error al actualizar los datos del afiliado:", err);
        return res.status(500).json({ error: "Error al actualizar los datos del afiliado." });
      }
      res.status(200).json({ message: "El afiliado ha sido actualizado correctamente" });
    });
  } else {
    res.status(400).json({ error: "Tipo de dato no válido." });
  }
});
app.get('/actualizar_coyugue_hijos', (req, res) => {
  const documento = req.query.numero_documento_hijo_conyuge;
  const query = 'CALL buscar_hijo_conyuge(?)';
  connection.query(query, [documento], (err, results) => {
    if (err) {
      console.error('Error al ejecutar el procedimiento:', err);
      return res.status(500).render('error', { error: 'Error en el servidor' });
    }

    if (results[0].length === 0) {
      return res.status(404).render('actualizar', { error: 'No se encontraron datos del hijo o coyugue.' });
    }

    const afiliado = results[0][0];

    res.render('actualizar_coyugue_hijos', { afiliado });
  });
});

app.post('/actualizar_coyugue_hijos', async (req, res) => {
  try {
    const { tipo, ...datos } = req.body; // Extraemos el tipo y los demás datos

    console.log(datos); // Verifica que el campo genero_hijo_conyuge esté presente

    if (tipo === 'hijo-conyuge') {
      const {
        tipo_documento_hijo_conyuge, numero_documento_hijo_conyuge, primer_nombre_hijo_conyuge, segundo_nombre_hijo_conyuge,
        primer_apellido_hijo_conyuge, segundo_apellido_hijo_conyuge, fecha_nacimiento_hijo_conyuge, edad_hijo_conyuge, genero_hijo_conyuge,
        correo_electronico_hijo_conyuge, correo_electronico_alternativo_hijo_conyuge, numero_celular_hijo_conyuge,
        numero_celular_alternativo_hijo_conyuge, municipio_residencia_hijo_conyuge, direccion_residencia_hijo_conyuge,
        tipo_afinidad_hijo_conyuge, talla_calzado_hijo_conyuge, talla_camisa_hijo_conyuge, talla_pantalon_hijo_conyuge,
        pension_hijo_conyuge, eps_hijo_conyuge, preferencias_hijo_conyuge, numero_documento_afiliado_hijo_conyuge
      } = datos;

      // Consulta SQL para ejecutar el procedimiento almacenado
      const query = `CALL EditarHijoConyuge(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      // Ejecutamos la consulta
      conexion.query(query, [
        tipo_documento_hijo_conyuge, numero_documento_hijo_conyuge, primer_nombre_hijo_conyuge, segundo_nombre_hijo_conyuge,
        primer_apellido_hijo_conyuge, segundo_apellido_hijo_conyuge, fecha_nacimiento_hijo_conyuge, edad_hijo_conyuge,
        genero_hijo_conyuge, correo_electronico_hijo_conyuge, correo_electronico_alternativo_hijo_conyuge, numero_celular_hijo_conyuge,
        numero_celular_alternativo_hijo_conyuge, municipio_residencia_hijo_conyuge, direccion_residencia_hijo_conyuge,
        tipo_afinidad_hijo_conyuge, talla_calzado_hijo_conyuge, talla_camisa_hijo_conyuge, talla_pantalon_hijo_conyuge,
        pension_hijo_conyuge, eps_hijo_conyuge, preferencias_hijo_conyuge, numero_documento_afiliado_hijo_conyuge
      ], (err) => {
        if (err) {
          console.error("Error al actualizar los datos del hijo o cónyuge:", err);
          return res.status(500).json({ error: "Error al actualizar los datos del hijo o cónyuge." });
        }
        res.status(200).json({ message: "El hijo o cónyuge ha sido actualizado correctamente" });
      });
    } else {
      res.status(400).json({ error: "Tipo de dato no válido." });
    }
  } catch (error) {
    console.error('Error procesando los datos:', error);
    res.status(500).json({ error: 'Hubo un error al procesar los datos' });
  }
});

app.post('/actualizar-talla', (req, res) => {
  const { id, talla_zapatos } = req.body;

  const query = 'CALL editar_talla_zapatos(?, ?)';
  connection.query(query, [id, talla_zapatos], (error, results) => {
    if (error) {
      console.error('Error al ejecutar el procedimiento:', error);
      // Maneja el error y envía una respuesta apropiada
      return res.status(400).json({ success: false, message: error.sqlMessage || 'Error al actualizar la talla.' });
    }
    res.json({ success: true });
  });
});
app.post('/actualizar-talla-pantalon', (req, res) => {
  const { id, talla_pantalon } = req.body;

  const query = 'CALL editar_talla_pantalon(?, ?)';
  connection.query(query, [id, talla_pantalon], (error, results) => {
    if (error) {
      console.error('Error al ejecutar el procedimiento:', error);
      return res.status(400).json({ success: false, message: error.sqlMessage || 'Error al actualizar la talla de pantalón.' });
    }
    res.json({ success: true });
  });
});
app.post('/actualizar-talla-camisa', (req, res) => {
  const { id, talla } = req.body;

  const query = 'CALL editar_talla_camisa(?, ?)';
  connection.query(query, [id, talla], (error, results) => {
    if (error) {
      console.error('Error al ejecutar el procedimiento:', error);
      return res.status(400).json({ success: false, message: error.sqlMessage || 'Error al actualizar la talla de camisa.' });
    }
    res.json({ success: true });
  });
});
app.post('/actualizar-pension', (req, res) => {
  const { id, entidad } = req.body;

  const query = 'CALL editar_pension(?, ?)';
  connection.query(query, [id, entidad], (error, results) => {
    if (error) {
      console.error('Error al ejecutar el procedimiento:', error);
      return res.status(400).json({ success: false, message: error.sqlMessage || 'Error al actualizar la pensión.' });
    }
    res.json({ success: true });
  });
});
app.post('/actualizar-genero', (req, res) => {
  const { id, tipo_genero } = req.body;

  const query = 'CALL editar_genero(?, ?)';
  connection.query(query, [id, tipo_genero], (error, results) => {
    if (error) {
      console.error('Error al ejecutar el procedimiento:', error);
      return res.status(400).json({ success: false, message: error.sqlMessage || 'Error al actualizar el género.' });
    }
    res.json({ success: true });
  });
});
app.post('/actualizar-eps', (req, res) => {
  const { id, epscol } = req.body;

  const query = 'CALL editar_eps(?, ?)';
  connection.query(query, [id, epscol], (error, results) => {
    if (error) {
      console.error('Error al ejecutar el procedimiento:', error);
      return res.status(400).json({ success: false, message: error.sqlMessage || 'Error al actualizar la EPS.' });
    }
    res.json({ success: true });
  });
});
app.post('/actualizar-tipo-documento', (req, res) => {
  const { id, tipo_documentocol } = req.body;

  const query = 'CALL editar_tipo_documento(?, ?)';
  connection.query(query, [id, tipo_documentocol], (error, results) => {
    if (error) {
      console.error('Error al ejecutar el procedimiento:', error);
      return res.status(400).json({ success: false, message: error.sqlMessage || 'Error al actualizar el tipo de documento.' });
    }
    res.json({ success: true });
  });
});
app.post('/actualizar-entidad', (req, res) => {
  const { id, entidad } = req.body;

  const query = 'CALL editar_entidad(?, ?)';
  connection.query(query, [id, entidad], (error, results) => {
    if (error) {
      console.error('Error al ejecutar el procedimiento:', error);
      return res.status(400).json({ success: false, message: error.sqlMessage || 'Error al actualizar la entidad.' });
    }
    res.json({ success: true });
  });
});
app.post('/actualizar-dependencia', (req, res) => {
  const { id, dependencia } = req.body;

  const query = 'CALL editar_dependencia(?, ?)';
  connection.query(query, [id, dependencia], (error, results) => {
    if (error) {
      console.error('Error al ejecutar el procedimiento:', error);
      return res.status(400).json({ success: false, message: error.sqlMessage || 'Error al actualizar la dependencia.' });
    }
    res.json({ success: true });
  });
});




// busca por la entidad toda la informacion de los hijos y afiliados
app.get('/buscarPorEntidad', (req, res) => {
  const entidad = req.query.entidad;

  const query = `
    CALL obtener_afiliados_y_familia_por_entidad(?);
  `;

  connection.query(query, [entidad], (err, results) => {
    if (err) {
      console.error('Error al buscar por entidad:', err);
      res.status(500).send('Error al realizar la búsqueda.');
    } else {
      res.render('nucleo_familiar', { afiliados: results[0] }); // [0] porque 'results' contiene un array de resultados del procedimiento
    }
  });
});




















const conexion = require('./base_de_Datos/conexion');
const connection = require("./base_de_Datos/conexion");
app.get("/mostrar_afiliados", (req, res) => {
  res.render("mostrar_afiliados");
});
app.get("/pension/toggle/:idpension", (req, res) => {
  res.render("/pension/toggle/:idpension");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get('/register_otros', (req, res) => {
  const numeroDocuAfiliado = req.query.numero_docu_afiliado;
  res.render('register_otros', { numeroDocuAfiliado });
});
app.get("/register_admin", (req, res) => {
  res.render("register_admin");
});
app.get("/filtrar-edad", (req, res) => {
  res.render("filtrar-edad");
});
app.get("/eps/toggle/:ideps", (req, res) => {
  res.render("/eps/toggle/:ideps");
});
app.get("/mostrar_informacion", (req, res) => {
  res.render("mostrar_informacion");
});
app.get("/eps", (req, res) => {
  res.render("eps");
});
app.get("/pension", (req, res) => {
  res.render("pension");
});
app.get("/agregar_eps", (req, res) => {
  res.render("agregar_eps");
});
app.get("/afiliado/detalle", (req, res) => {
  res.render("/afiliado/detalle");
});
app.get("/dependencia", (req, res) => {
  res.render("dependencia");
});
app.get("/registro_admin", (req, res) => {
  res.render("registro_admin");
});
app.get("/tipo_documento/toggle/:idtipo_documento", (req, res) => {
  res.render("/tipo_documento/toggle/:idtipo_documento");
});
app.get("/tipo_documento", (req, res) => {
  res.render("tipo_documento");
});
app.get("/actualizar", (req, res) => {
  res.render("actualizar");
});

app.get("/actualizar_coyugue_hijos", (req, res) => {
  res.render("actualizar_coyugue_hijos");
});
app.get("/agregar_genero", (req, res) => {
  res.render("agregar_genero");
});

app.get("/agregar_talla_pantalon", (req, res) => {
  res.render("agregar_talla_pantalon");
});

app.get("/agregar_talla_zapatos", (req, res) => {
  res.render("agregar_talla_zapatos");
});
app.get('/nucleo_familiar', (req, res) => {
  res.render('nucleo_familiar', { resultados: null });
});


app.get("/agregar_entidad", (req, res) => {
  res.render("agregar_entidad");
});
app.get("/agregar_dependencia", (req, res) => {
  res.render("agregar_dependencia");
});

app.post('/register', (req, res) => {
  const tipo_documento = req.body.tipo_documento;
  const numero_docu = req.body.documento;
  const primer_nombre = req.body.primer_nombre;
  const segundo_nombre = req.body.segundo_nombre;
  const primer_apellido = req.body.primer_apellido;
  const segundo_apellido = req.body.segundo_apellido;
  const genero = req.body.genero;
  const fech = req.body.fecha;
  const edad = req.body.edad_afi;
  const correo_electronico = req.body.correo_electronico;
  const correo_electronico_alternativo = req.body.correo_electronico_alternativo;
  const numero_celular = req.body.numero_celular;
  const numero_celular_alternativo = req.body.numero_celular_alternativo
  const munucipio_residencia = req.body.munucipio_residencia;
  const direccion_residencia = req.body.direccion_residencia;
  const entidad = req.body.entidad;
  const dependencia = req.body.dependencia;
  // Usamos destructuración para simplificar

  // Inserta los valores en la base de datos
  conexion.query(
    'INSERT INTO afiliados SET ?',
    {
      tipo_documento: tipo_documento,
      numero_documento: numero_docu,
      primer_nombre: primer_nombre,
      segundo_nombre: segundo_nombre,
      primer_apellido: primer_apellido,
      segundo_apellido: segundo_apellido,
      fecha_nacimiento: fech,
      edad: edad,
      genero: genero,
      correo_electronico: correo_electronico,
      correo_electronico_alternativo: correo_electronico_alternativo, // Asegúrate de usar el nombre correcto aquí
      numero_celular: numero_celular,
      numero_celular_alternativo: numero_celular_alternativo,
      municipio_residencia: munucipio_residencia,
      direccion_residencia: direccion_residencia,
      entidad: entidad,
      dependencia: dependencia,
      estado: 1
    },
    async (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error en la consulta');
      } else {
        console.log("si registra")
        res.render('register', {
          alert: true,
          alertTitle: "Registración",
          alertMessage: "¡Registro exitoso!",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: "register"
        });
      }
    }
  );
});

app.post('/register_otros', (req, res) => {
  const tipo_documento = req.body.tipo_documento;
  const numero_docu = req.body.documento;
  const primer_nombre = req.body.primer_nombre;
  const segundo_nombre = req.body.segundo_nombre;
  const primer_apellido = req.body.primer_apellido;
  const segundo_apellido = req.body.segundo_apellido;
  const genero = req.body.genero;
  const fech = req.body.fecha;
  const edad = req.body.edad_afi;
  const correo_electronico = req.body.correo_electronico;
  const correo_electronico_alternativo = req.body.correo_electronico_alternativo;
  const numero_celular = req.body.numero_celular;
  const numero_cel_alternativo = req.body.numero_cel_alter
  const munucipio_residencia = req.body.munucipio_residencia;
  const direccion_residencia = req.body.direccion_residencia;
  const documento_afiliado = req.body.numero_docu_afiliado;
  const tipo_afinidad = req.body.tipo_afinidad;
  const talla_calzado = req.body.talla_calzado;
  const talla_camisa = req.body.talla_camisa;
  const talla_pantalon = req.body.talla_pantalon;
  const pension = req.body.pension;
  const Eps = req.body.eps;
  const preferencias = req.body.preferencias;

  // Usamos destructuración para simplificar

  // Inserta los valores en la base de datos
  conexion.query(
    'INSERT INTO hijos_conyugue SET ?',
    {
      tipo_documento: tipo_documento,
      numero_documento: numero_docu,
      primero_nombre: primer_nombre,
      segundo_nombre: segundo_nombre,
      primer_apellido: primer_apellido,
      segundo_apellido: segundo_apellido,
      fecha_nacimiento: fech,
      edad: edad,
      genero: genero,
      correo_electronico: correo_electronico,
      correo_electronico_alter: correo_electronico_alternativo, // Asegúrate de usar el nombre correcto aquí
      numero_celular: numero_celular,
      numero_cel_alter: numero_cel_alternativo,
      municipio_residencia: munucipio_residencia,
      direccion_residencia: direccion_residencia,
      numero_docu_afiliado: documento_afiliado,
      tipo_afinidad: tipo_afinidad,
      talla_calzado: talla_calzado,
      talla_camisa: talla_camisa,
      talla_pantalon: talla_pantalon,
      pension: pension,
      eps: Eps,
      preferencias: preferencias,
      estado: 1
    },
    async (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error en la consulta');
      } else {
        console.log("si registra")
        res.render('register', {
          alert: true,
          alertTitle: "Registración",
          alertMessage: "¡Registro exitoso!",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: "register"
        });
      }
    }
  );
});

app.post("/register_conyu_hijo", (req, res) => {
  const tipo_documento = req.body.tipo_documento;
  const numero_documen = req.body.documento;
  const primer_nombre = req.body.primer_nombre;
  const segundo_nombre = req.body.segundo_nombre;
  const primer_apellido = req.body.primer_apellido;
  const segundo_apellido = req.body.segundo_apellido;
  const genero = req.body.genero;
  const fech = req.body.fecha;
  const edad = req.body.edad_afi;
  const correo_electronico = req.body.correo_electronico;
  const correo_electronico_alternativo = req.body.correo_electronico_alternativo;
  const numero_celular = req.body.numero_celular;
  const numero_cel_alternativo = req.body.numero_cel_alternativo;
  const munucipio_residencia = req.body.munucipio_residencia;
  const direccion_residencia = req.body.direccion_residencia;
  const numero_docu_afiliado = req.body.numero_docu_afiliado;
  const tipo_afinidad = req.body.tipo_afinidad;
  const talla_calzado = req.body.talla_calzado;
  const talla_camisa = req.body.talla_camisa;
  const talla_pantalon = req.body.talla_pantalon;
  const pension = req.body.pension;
  const Eps = req.body.eps;
  const preferencias = req.body.preferencias;

  // Inserta los valores en la base de datos
  conexion.query(
    "INSERT INTO hijos_conyugue SET ?",
    {
      tipo_documento: tipo_documento,
      numero_documento: numero_documen,
      primero_nombre: primer_nombre,
      segundo_nombre: segundo_nombre,
      primer_apellido: primer_apellido,
      segundo_apellido: segundo_apellido,
      fecha_nacimiento: fech,
      edad: edad,
      genero: genero,
      correo_electronico: correo_electronico,
      correo_electronico_alter: correo_electronico_alternativo, // Asegúrate de usar el nombre correcto aquí
      numero_celular: numero_celular,
      numero_cel_alter: numero_cel_alternativo,
      municipio_residencia: munucipio_residencia,
      direccion_residencia: direccion_residencia,
      numero_docu_afiliado: numero_docu_afiliado,
      tipo_afinidad: tipo_afinidad,
      talla_calzado: talla_calzado,
      talla_camisa: talla_camisa,
      talla_pantalon: talla_pantalon,
      pension: pension,
      eps: Eps,
      preferencias: preferencias,
      estado: 1,
    },
    async (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error en la consulta");
      } else {
        console.log("si registra");
        res.render("register", {
          alert: true,
          alertTitle: "Registración",
          alertMessage: "¡Registro exitoso!",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1000,
          ruta: "register",
        });
      }
    }
  );
});



app.post("/register_admin", async (req, res) => {
  const registrar_user = req.body.registrar_user;
  const registrar_pass = req.body.registrar_pass;

  // Generar el hash de la contraseña con bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(registrar_pass, salt);

  connection.query(
    "INSERT INTO administrador SET ?",
    { usuario: registrar_user, contrasena: hashedPassword, estado: "1" },
    async (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error en la consulta");
      } else {
        res.render("register_admin", {
          alert: true,
          alertTitle: "Registración",
          alertMessage: "¡Registro exitoso!",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: "login",
        });
      }
    }
  );
});

// LOGIN DE ADMINISTRADOR CON VALIDACIÓN DE CONTRASEÑA ENCRIPTADA
app.post("/auth", async (req, res) => {
  const user = req.body.user;
  const pass = req.body.pass;

  if (user && pass) {
    connection.query(
      "SELECT * FROM administrador WHERE usuario = ?",
      [user],
      async (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).send("Error en la consulta");
        } else if (results.length === 0) {
          res.render("login", {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Usuario y/o contraseña incorrectos",
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: "login",
          });
        } else {
          // Comparar la contraseña ingresada con la encriptada en la BD
          const match = await bcrypt.compare(pass, results[0].contrasena);

          if (!match) {
            res.render("login", {
              alert: true,
              alertTitle: "Error",
              alertMessage: "Usuario y/o contraseña incorrectos",
              alertIcon: "error",
              showConfirmButton: true,
              timer: false,
              ruta: "login",
            });
          } else {
            req.session.loggedin = true;
            req.session.name = results[0].usuario;
            res.render("login", {
              alert: true,
              alertTitle: "Conexión exitosa",
              alertMessage: "¡Login correcto!",
              alertIcon: "success",
              showConfirmButton: false,
              timer: 500,
              ruta: "",
            });
          }
        }
      }
    );
  } else {
    res.send("Por favor ingrese algo");
  }
});

app.get('/', (req, res) => {
  if (req.session.loggedin) {
    res.render('index', {
      login: true,
      name: req.session.name
    })
  } else {
    res.render('index', {
      login: false,
      name: 'Debe iniciar sesión'
    })
  }
})
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})
app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});
//para  entrar al servidor local
app.listen(8080, "0.0.0.0", () => {
  console.log("SERVER RUNNING IN http://172.16.66.185:8080");
}); 
