require("colors");
const { guardarDB, leerDB } = require("./db/guardarArchivo");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

const main = async () => {
  // inicializamos la variable de seleccion
  let opt = "";

  // instanciamos la tarea
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }
  do {
    //opcion seleccionada por medio de la funcion que imprime menu
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        //crear opcion
        const desc = await leerInput("Descripción: ");
        tareas.crearTarea(desc);

        break;
      case "2":
        //listamos la tarea
        tareas.listadoCompleto();
        // console.log(tareas.listadoArr);
        break;

      case "3":
        //listamos las tareas completadas
        tareas.listarPendientesCompletadas(true);
        // console.log(tareas.listadoArr);
        break;

      case "4":
        //listamos las tareas pendientes
        tareas.listarPendientesCompletadas(false);

        break;

      case "5":
        //completar tareas
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        console.log(ids);

        tareas.toggleCompletadas(ids);

        break;

      case "6":
        //borrar tarea
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirmar("¿Esta seguro?");
          console.log({ ok });

          if (ok) {
            // confirmar borrado
            tareas.borrarTarea(id);
            console.log("tarea borrada");
          }
        }

        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");
};

main();
