require('dotenv').config();
const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER, 
  password:process.env.DB_PASSWORD, 
  database:process.env.DB_DATABASE
});
connection.connect((error)=>{
  if (error){
    console.log('hay un error en la base de datos :'  + error);
    return
  }
   console.log('conexion exitosa');
});
module.exports= connection;

// const mysql = require('mysql2');
// const bcryptjs = require('bcryptjs');
// require('dotenv').config();

// // Configuración de la conexión a la base de datos
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE
// });

// // Función para encriptar contraseñas en texto plano
// async function encriptarContrasenas() {
//   try {
//     // Obtener los administradores con las contraseñas en texto plano
//     const [results] = await connection.promise().query('SELECT id_admin, contrasena FROM administrador');

//     for (let i = 0; i < results.length; i++) {
//       let admin = results[i]; // Definir la variable admin dentro del ciclo for

//       // Solo encripta si la contraseña no está encriptada
//       if (!admin.contrasena.startsWith('$2b$')) {
//         try {
//           // Encriptar la contraseña
//           const hashedPassword = await bcryptjs.hash(admin.contrasena, 8);

//           // Actualizar la contraseña en la base de datos
//           await connection.promise().query('UPDATE administrador SET contrasena = ? WHERE id_admin = ?', [hashedPassword, admin.id_admin]);
//           console.log(`Contraseña encriptada para admin ID ${admin.id_admin}`);
//         } catch (hashError) {
//           console.log(`Error al encriptar la contraseña para admin ID ${admin.id_admin}:`, hashError);
//         }
//       }
//     }

//     console.log('Proceso de encriptación completado.');
//   } catch (error) {
//     console.log('Error al consultar administradores:', error);
//   }
// }

// // Conectar a la base de datos y luego ejecutar encriptarContrasenas
// connection.connect((error) => {
//   if (error) {
//     console.log('Error al conectar a la base de datos:', error);
//     return;
//   }
//   console.log('Conexión exitosa');
  
//   // Ejecuta encriptarContrasenas solo después de que la conexión se haya establecido
//   encriptarContrasenas();
// });

// module.exports = connection;
