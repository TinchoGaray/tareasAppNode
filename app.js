require('colors');
const { guardarDB,
        leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa,
        leerInput, 
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


//const { mostrarMenu, pausa } = require('./helpers/mensajes');


console.clear();

const main = async() => {
    
    let opt = ''
    const tareas = new Tareas();

    const tareasDB = leerDB()

    if(tareasDB) {
        tareas.cargarTareasFromArray(tareasDB)
    }


    do {
        opt = await inquirerMenu()

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion de la tarea:')
                tareas.crearTarea(desc)
            break;

            case '2':
                tareas.listadoCompleto()
                //console.log(tareas.listadoArr)
            break;
        
            case '3':
                tareas.listarPendientesCompletadas()
            break;

            case '4':
                tareas.listarPendientesCompletadas(completada=false)
            break;

            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr)
                tareas.toggleCompletadas(ids)
            break;

            case '6':
                 const id = await listadoTareasBorrar(tareas.listadoArr)
                 if(id != '0'){
                    const ok = await confirmar('¿Esta seguro que lo desea borrar?')
                    if(ok){
                        tareas.borrarTarea(id)
                        console.log('Tarea borrada correctamente');
                    }
                 }
                 
                 
            break;
        }

        guardarDB(tareas.listadoArr)

        if (opt !== '0') await pausa()
    } while (opt !== '0');
    

}

main();