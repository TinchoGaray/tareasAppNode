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


    borrarTarea(id = ''){

        if(this._listado[id]){
            delete this._listado[id]
        }
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


    listarPendientesCompletadas(completadas = true){
        if(completadas){
            let i = 1
            this.listadoArr.forEach(tarea => {
                if(tarea.completadoEn !== null){
                    console.log(`${i.toString().green} ${tarea.desc} :: ${tarea.completadoEn.green}`);
                    i++
                }
            });
        }
        else{
            let i = 1
            this.listadoArr.forEach(tarea => {
                if(tarea.completadoEn === null){
                    console.log(`${i.toString().green} ${tarea.desc} :: ${"Pendiente".red}`);
                    i++
                }
            });
        }
    }


    toggleCompletadas(ids = []) {

        ids.forEach(id => {
            const tarea = this._listado[id]
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }

        });

        this.listadoArr.forEach(tarea =>{
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null
            
            }
        })

    }

}

module.exports = Tareas