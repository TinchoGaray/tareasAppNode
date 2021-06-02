const Tarea = require("./tarea");


class Tareas {
    _listado = {}

    get listadoArr() {

        const listado = []
        Object.keys(this._listado).forEach( key =>{
            const tarea = this._listado[key]
            listado.push(tarea)
        })

        return listado
    }

    constructor(){
        this._listado = {};
    }


    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea
        });

    }

    
    crearTarea(desc = ''){

        const tarea = new Tarea(desc)
        this._listado[tarea.id] = tarea
    }


    listadoCompleto() {
        console.log("");
        let i = 1
        this.listadoArr.forEach(tarea => {
            if(tarea.completadoEn !== null){
                console.log(`${i.toString().green} ${tarea.desc} :: ${"Completado".green}`);
                i++
            }
            else{
                console.log(`${i.toString().green} ${tarea.desc} :: ${"Pendiente".red}`);
                i++
            }

        });
    }

}

module.exports = Tareas