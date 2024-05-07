const joyas = require("./data/joyas.js");

//Función que genera un array de objetos con el nombre y href de cada joya.
const HATEOAS = () => {
  return joyas.results.map(joya => ({
      name: joya.name,
      href: `http://localhost:3000/joyas/${joya.id}`,
  }));
};


//Función que genera un array de objetos con el nombre de la joya y su src.
const HATEOASV2 = () => {
  return joyas.results.map(joya => ({
      name: joya.name,
      src: `http://localhost:3000/joyas/${joya.id}`,
  }));
};

//Función que ordena las joyas según un criterio de orden ascendente o descendente.
const orderValues = (order) => {
  return order == "asc"
    ? joyas.sort((a, b) => a.value - b.value)
    : order == "desc"
      ? joyas.sort((a, b) => b.value - a.value)
      : false;
};

//Función que busca una joya por su ID. (Estaba listo)
 const joya = (id) => {
  return joyas.results.filter((g) => g.id === id);
};

//Función que selecciona ciertos campos de una joya. (Estaba listo).
 const fieldsSelect = (joya, fields) => {
  const Fields = fields.split(",");
  const properties = Object.keys(joya);
  const check = true;
  Fields.forEach((field) => {
    if (!properties.includes(field)) check = false;
  });
  if (!check) {
    return {
      error: "400 Bad Request",
      message:
        "Alguno de los campos que desea consultar no existe dentro del objeto",
    };
  } else {
    for (field in joya) {
      if (!Fields.includes(field)) delete joya[field];
    }
    return joya;
  }
};

//Función que filtra las joyas por categoría.
const filtroCategory = (category) => {
  return joyas.results.filter((joya) => joya.category === category);
};

//Exportación de módulos.
module.exports = {
  HATEOAS,
  HATEOASV2,
  orderValues,
  joya,
  fieldsSelect,
  filtroCategory,
};
