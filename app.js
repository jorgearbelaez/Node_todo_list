require("colors");
const { guardarDB, leerDB } = require("./db/guardarArchivo");
const { inquirerMenu, pausa, leerInput } = require("./helpers/inquirer");
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
        tareas.listadoCompleto(tareasDB);
        // console.log(tareas.listadoArr);
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");
};

main();
