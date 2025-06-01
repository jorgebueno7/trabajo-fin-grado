// leerUsuariosDelEvento.js
const User = require('./server/src/models/User');
const UserEvent = require('./server/src/models/UserEvent');
const Event = require('./server/src/models/Event');
const fs = require('fs');
const path = require('path');

async function exportarEstadisticasACSV(registros, id_deporte, nombreArchivo) {
    // Definimos las columnas que queremos exportar (encabezados)
    const headers = [
        'id_usuario',
        'id_deporte',
        'id_evento',
        'clasificacion',
        'puntos',
        'tiempo',
        'resultado',
        'observaciones'
    ];

    // Creamos la primera línea con las cabeceras CSV separadas por coma
    const lineas = [headers.join(',')];

    registros.forEach(registro => {
        // Extraemos los datos en el mismo orden que headers
        // Escapamos comas o comillas dobles si es necesario
        const fila = [
            registro.id_usuario,
            id_deporte,
            registro.id_evento,
            registro.clasificacion,
            registro.puntos,
            registro.tiempo,
            `"${(registro.resultado || '').replace(/"/g, '""')}"`,  // escapamos comillas dobles
            `"${(registro.observaciones || '').replace(/"/g, '""')}"`
        ].join(',');
        lineas.push(fila);
    });

    // Juntamos todas las filas con salto de línea
    const contenidoCSV = lineas.join('\n');

    // Guardamos el archivo (puedes cambiar ruta o nombre)
    const rutaArchivo = path.join(__dirname, nombreArchivo);
    fs.writeFileSync(rutaArchivo, contenidoCSV, 'utf8');

    console.log(`Archivo CSV guardado en: ${rutaArchivo}`);
}

// Verifica que se pasó un argumento
const id_evento = process.argv[2];

if (!id_evento) {
    console.error('❌ Debes proporcionar un ID de evento. Ejemplo: node leerUsuariosDelEvento.js 14');
    process.exit(1);
}

const main = async () => {
    try {
        // Primero obtener evento para sacar maximo_usuarios
        const evento = await Event.findByPk(id_evento);
        if (!evento) {
            console.log(`❌ No existe evento con ID ${id_evento}`);
            return;
        }

        const id_deporte = evento.id_deporte;
        const maxUsuarios = evento.maximo_usuarios;

        const usuarios = await UserEvent.findAll({
            where: { id_evento },
            include: [
                {
                    model: User,
                    attributes: ['id', 'nombre', 'apellidos', 'email'],
                    required: true
                },
                {
                    model: Event,
                    attributes: ['nombre']
                }
            ]
        });

        if (usuarios.length === 0) {
            console.log(`ℹ️ No hay usuarios inscritos en el evento con ID ${id_evento}`);
            return;
        }

        console.log(`✅ Usuarios inscritos en el evento "${usuarios[0].Event.nombre}":\n`);

        // Crear array de clasificaciones desde 1 hasta el número de inscritos
        // La clasificación no puede exceder el número real de inscritos
        const numParticipantes = usuarios.length;
        const clasificaciones = Array.from({ length: numParticipantes }, (_, i) => i + 1);

        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        shuffle(clasificaciones);

        const mensajesResultado = (pos) => {
            if (pos === 1) {
                const top1 = [
                    "¡Increíble participación, brillante!",
                    "¡Campeón absoluto, felicitaciones!",
                    "¡Dominaste el evento con maestría!",
                ];
                return top1[Math.floor(Math.random() * top1.length)];
            } else if (pos <= 3) {
                const top3 = [
                    "¡Gran actuación, muy bien hecho!",
                    "¡Un podio bien merecido!",
                    "¡Excelente rendimiento!",
                ];
                return top3[Math.floor(Math.random() * top3.length)];
            } else if (pos <= Math.ceil(numParticipantes / 2)) {
                const topMedio = [
                    "Buen esfuerzo, sigue mejorando.",
                    "Buen trabajo, sigue practicando.",
                    "Buen rendimiento, no te rindas.",
                ];
                return topMedio[Math.floor(Math.random() * topMedio.length)];
            } else {
                const ultimos = [
                    "Hay que mejorar, ¡ánimo para la próxima!",
                    "No fue tu mejor día, sigue intentándolo.",
                    "Puedes dar más, no te desanimes.",
                ];
                return ultimos[Math.floor(Math.random() * ultimos.length)];
            }
        };

        // Función para generar observaciones aleatorias (20% probabilidad)
        const observacionesAleatorias = () => {
            const observaciones = [
                "Sufrió una ligera lesión durante la competición.",
                "Tuvo problemas técnicos con su equipo.",
                "Se retiró antes de la final por fatiga.",
                "Condiciones meteorológicas adversas afectaron su desempeño.",
            ];
            if (Math.random() < 0.8) {
                return observaciones[Math.floor(Math.random() * observaciones.length)];
            }
            return null;
        };

        for (let i = 0; i < usuarios.length; i++) {
            const registro = usuarios[i];
            const u = registro.user;
            if (!u) {
                console.warn(`⚠️ Registro ${i + 1} no tiene un usuario asociado.`);
                continue;
            }

            const clasificacion = clasificaciones[i];  // número único aleatorio del 1 a n

            // Puntos inversamente proporcionales a la clasificación
            // Ejemplo: si maxUsuarios=10 y clasificacion=1, puntos=10, si clasificacion=10, puntos=1
            // Pero aseguramos que no pase de maxUsuarios
            const puntos = maxUsuarios - clasificacion + 1;

            // Tiempo: mejor clasificación menor tiempo, rango 30-300 s
            // Aquí hacemos que tiempo sea linealmente proporcional a la clasificación
            const tiempo = (30 + ((clasificacion - 1) / (maxUsuarios - 1)) * (300 - 30)).toFixed(2);

            // Resultado texto según clasificación
            const resultado = mensajesResultado(clasificacion);

            // Observaciones con probabilidad
            const observaciones = observacionesAleatorias();

            // Actualizamos registro
            registro.clasificacion = clasificacion;
            registro.puntos = puntos;
            registro.tiempo = parseFloat(tiempo);
            registro.resultado = resultado;
            registro.observaciones = observaciones;

            await registro.save();

            console.log(`${i + 1}. ${u.nombre} ${u.apellidos} - Clasificación: ${clasificacion}, Puntos: ${puntos}, Tiempo: ${tiempo}s, Resultado: ${resultado}${observaciones ? ', Observaciones: ' + observaciones : ''}`);
            
            await exportarEstadisticasACSV(usuarios, id_deporte, `estadisticas_evento_${id_evento}.csv`);
        }

    } catch (error) {
        console.error('❌ Error al leer o actualizar los usuarios del evento:', error.message);
    }
};

main();

