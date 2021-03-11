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

//Te da el reporte semanal de cierto Alumno
router.get('/reporte/semanal/:idAlumno', (req, res) => {
    const {idAlumno} = req.params;
    alumnos.forEach(alumno => {
        if (alumno.id == idAlumno) {
            // Se calcula la fecha de la semana pasada
            let lastWeek = new Date();
            lastWeek.setDate(lastWeek.getDate()-7);
            lastWeek.setHours(0,0,0,0);
            // Se filtran todos los datos en asistencias, tareas y participaciones
            for (const fechaStr in alumno.asistencias) {
                //Nuestros strings estan en dd/mm/yyyy pero JS los crea de manera yyyy/mm/dd
                const dateParts = fechaStr.split('/');
                const fecha = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
                fecha.setHours(0,0,0,0);
                if (fecha<= lastWeek) delete alumno.asistencias[fechaStr];
            }

            for (const fechaStr in alumno.tareas) {
                //Nuestros strings estan en dd/mm/yyyy pero JS los crea de manera yyyy/mm/dd
                const dateParts = fechaStr.split('/');
                const fecha = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
                fecha.setHours(0,0,0,0);
                if (fecha<= lastWeek) delete alumno.tareas[fechaStr];
            }

            for (const fechaStr in alumno.participaciones) {
                //Nuestros strings estan en dd/mm/yyyy pero JS los crea de manera yyyy/mm/dd
                const dateParts = fechaStr.split('/');
                const fecha = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
                fecha.setHours(0,0,0,0);
                if (fecha<= lastWeek) delete alumno.participaciones[fechaStr];
            }
            res.json(alumno);
        }
    })
});


//Te da el reporte mensual de cierto Alumno
router.get('/reporte/mensual/:idAlumno', (req, res) => {
    const {idAlumno} = req.params;
    alumnos.forEach(alumno => {
        if (alumno.id == idAlumno) {
            // Se calcula la fecha del mes pasado
            let lastMonth = new Date();
            lastMonth.setMonth(lastMonth.getMonth() -1);
            lastMonth.setHours(0,0,0,0);
            // Se filtran todos los datos en asistencias, tareas y participaciones
            for (const fechaStr in alumno.asistencias) {
                //Nuestros strings estan en dd/mm/yyyy pero JS los crea de manera yyyy/mm/dd
                const dateParts = fechaStr.split('/');
                const fecha = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
                fecha.setHours(0,0,0,0);
                if (fecha<= lastMonth) delete alumno.asistencias[fechaStr];
            }

            for (const fechaStr in alumno.tareas) {
                //Nuestros strings estan en dd/mm/yyyy pero JS los crea de manera yyyy/mm/dd
                const dateParts = fechaStr.split('/');
                const fecha = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
                fecha.setHours(0,0,0,0);
                if (fecha<= lastMonth) delete alumno.tareas[fechaStr];
            }

            for (const fechaStr in alumno.participaciones) {
                //Nuestros strings estan en dd/mm/yyyy pero JS los crea de manera yyyy/mm/dd
                const dateParts = fechaStr.split('/');
                const fecha = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
                fecha.setHours(0,0,0,0);
                if (fecha<= lastMonth) delete alumno.participaciones[fechaStr];
            }
            res.json(alumno);
        }
    })
});



//Te da el reporte en un rango de fechas de cierto Alumno
router.get('/reporte/:fecha1/:fecha2/:idAlumno', (req, res) => {
    const {fecha1, fecha2, idAlumno} = req.params;
    alumnos.forEach(alumno => {
        if (alumno.id == idAlumno) {
            //Se crean objetos de tipo Date a partir de los strings
            const dateParts1 = fecha1.split('-');
            const dateParts2 = fecha2.split('-');
            const fechaI = new Date(+dateParts1[0], dateParts1[1]-1, +dateParts1[2]);
            const fechaF = new Date(+dateParts2[0], dateParts2[1]-1, +dateParts2[2]);

            // Se filtran todos los datos en asistencias, tareas y participaciones
            for (const fechaStr in alumno.asistencias) {
                //Nuestros strings estan en dd/mm/yyyy pero JS los crea de manera yyyy/mm/dd
                const dateParts = fechaStr.split('/');
                const fecha = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
                fecha.setHours(0,0,0,0);
                if (fecha< fechaI || fecha>fechaF) delete alumno.asistencias[fechaStr];
            }

            for (const fechaStr in alumno.tareas) {
                //Nuestros strings estan en dd/mm/yyyy pero JS los crea de manera yyyy/mm/dd
                const dateParts = fechaStr.split('/');
                const fecha = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
                fecha.setHours(0,0,0,0);
                if (fecha< fechaI || fecha>fechaF) delete alumno.tareas[fechaStr];
            }

            for (const fechaStr in alumno.participaciones) {
                //Nuestros strings estan en dd/mm/yyyy pero JS los crea de manera yyyy/mm/dd
                const dateParts = fechaStr.split('/');
                const fecha = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
                fecha.setHours(0,0,0,0);
                if (fecha< fechaI || fecha>fechaF) delete alumno.participaciones[fechaStr];
            }
            res.json(alumno);
        }
    })
});


module.exports = router;