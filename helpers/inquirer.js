const inquirer = require("inquirer");

require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: [
      {
        value: "1",
        name: "1.Crear tarea",
      },
      {
        value: "2",
        name: "2.Listar tarea",
      },
      {
        value: "3",
        name: "3.Listar tareas completadas",
      },
      {
        value: "4",
        name: "4.Listar tareas pendiente",
      },
      {
        value: "5",
        name: "5.Completar tarea(s)",
      },
      {
        value: "6",
        name: "6.Borrar tarea",
      },
      {
        value: "0",
        name: "0.Salir",
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();

  console.log("======================".green);
  console.log("Seleccione una opción".blue);
  console.log("======================\n".green);

  const { opcion } = await inquirer.prompt(preguntas);

  return opcion;
};

const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "question",
      message: `Presione ${"ENTER".blue} para continuar`,
    },
  ];

  console.log("\n");
  await inquirer.prompt(question);
};

const leerInput = async (mensaje) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message: "descripcion",
      validate(value) {
        if (value.length === 0) {
          return "por favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
};
