require("colors");
const { inquirerMenu, pausa, leerInput } = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

const main = async () => {
  // inicializamos la variable de seleccion
  let opt = "";

  // instanciamos la tarea
  const tareas = new Tareas();
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
        console.log(tareas._listado);
        break;
    }

    console.log("\n");
    console.log({ opt });

    await pausa();
  } while (opt !== "0");
};

main();
