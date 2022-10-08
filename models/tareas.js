const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];

    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);

    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    this.listadoArr.forEach((tarea, i) => {
      const { desc, id, completadoEn } = tarea;

      const idx = `${i + 1}`.blue;
      const estado = completadoEn ? "completada".green : "pendiente".red;

      console.log(`${idx} ${desc} :: ${estado}`);
    });
  }
}

module.exports = Tareas;
