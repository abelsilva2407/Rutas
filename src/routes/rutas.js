const {Router} = require('express');
const router = Router();

const alumnos = require('./data.json');

router.get('/', (req, res) => {
    res.json(alumnos);
});

//Te da el total de asistencias de un alumno
router.get('/asistencia/:idAlumno', (req, res) => {
    const {idAlumno} = req.params;
    alumnos.forEach(alumno => {
        if (alumno.id == idAlumno) {
            let sumAsistencias = 0;
            for (const fecha in alumno.asistencias) {
                if(alumno.asistencias[fecha] == "1") ++sumAsistencias;
            }
            res.json(sumAsistencias);
        }
    })
});

//Te da el total de tareas de un alumno
router.get('/tarea/:idAlumno', (req, res) => {
    const {idAlumno} = req.params;
    alumnos.forEach(alumno => {
        if (alumno.id == idAlumno) {
            let sumTareas = 0;
            for (const fecha in alumno.tareas) {
                if(alumno.tareas[fecha] == "1") ++sumTareas;
            }
            res.json(sumTareas);
        }
    })
});

//Te da el total de participaciones de un alumno
router.get('/participacion/:idAlumno', (req, res) => {
    const {idAlumno} = req.params;
    alumnos.forEach(alumno => {
        if (alumno.id == idAlumno) {
            let sumParticipaciones = 0;
            for (const fecha in alumno.participaciones) {
                if(alumno.participaciones[fecha] == "1") ++sumParticipaciones;
            }
            res.json(sumParticipaciones);
        }
    })
});

//Se indica que el día de hoy, cierto alumno no asistió a clase. Si no se indica esto, se infiere que si asistió.
router.put('/asistencia/:idAlumno', (req, res) => {
    const {idAlumno} = req.params;
    alumnos.forEach(alumno => {
        if (alumno.id == idAlumno) {
            //Se calcula que dia es hoy
            let today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth()+1;
            let yyyy = today.getFullYear();
            today = `${dd}/${mm}/${yyyy}`;
            alumno.asistencias[today] = "0";
        }
    });
    res.status(200).json(alumnos);
});

//Se indica que el día de hoy, cierto alumno no hizo la tarea. Si no se indica esto, se infiere que si la hizo.
router.put('/tarea/:idAlumno', (req, res) => {
    const {idAlumno} = req.params;
    alumnos.forEach(alumno => {
        if (alumno.id == idAlumno) {
            //Se calcula que dia es hoy
            let today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth()+1;
            let yyyy = today.getFullYear();
            today = `${dd}/${mm}/${yyyy}`;
            alumno.tareas[today] = "0";
        }
    });
    res.status(200).json(alumnos);
});

//Se indica que el día de hoy, cierto alumno no participó. Si no se indica esto, se infiere que si lo hizo.
router.put('/participacion/:idAlumno', (req, res) => {
    const {idAlumno} = req.params;
    alumnos.forEach(alumno => {
        if (alumno.id == idAlumno) {
            //Se calcula que dia es hoy
            let today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth()+1;
            let yyyy = today.getFullYear();
            today = `${dd}/${mm}/${yyyy}`;
            alumno.participaciones[today] = "0";
        }
    });
    res.status(200).json(alumnos);
});


// router.post('/', (req, res) => {
//     const {title, version, genre} = req.body;
//     if (title && version && genre) {
//         const id = juegos.length + 1;
//         const nuevoJuego = {...req.body, id};
//         juegos.push(nuevoJuego);
//         res.status(200).json(juegos);
//     } else {
//         res.status(500).json({error:"no data"});
//     }
// });

module.exports = router;