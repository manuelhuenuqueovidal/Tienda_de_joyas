// Carga del módulo express
const express = require("express");
const app = express();

// Configuración del servidor para escuchar en el puerto 3000
app.listen(3000, () => console.log("Your app listening on port 3000"));

// Importación de las funciones desde el archivo 'functions.js'
const {
  HATEOAS,
  HATEOASV2,
  orderValues,
  joya,
  fieldsSelect,
  filtroCategory,
} = require("./functions");

// Ruta GET para obtener todas las joyas con HATEOAS
app.get("/api/v1/joyas", (req, res) => {
  res.send({
    joyas: HATEOAS(),
  });
});

// Ruta GET para obtener joyas con opciones de ordenamiento y paginación
app.get("/api/v2/joyas", (req, res) => {
  if (req.query.values == "asc") return res.send(orderValues("asc"));
  if (req.query.values == "desc") return res.send(orderValues("desc"));
  if (req.query.page) {
    const page = parseInt(req.query.page);
    const start = page * 2 - 2;
    const end = start + 2;
    return res.send({ joyas: HATEOASV2().slice(start, end) });
  }
  res.send({
    joyas: HATEOASV2(),
  });
});


//Ruta GET para obtener una joya por su ID
app.get("/joya/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const selectedJoya = joya(id)[0];
  
  //Verificar si se encontró la joya
  if (selectedJoya) {
    res.send({
      joya: selectedJoya
    });
  } else {
    //Enviar un error 404 si es que no se encontro la joya.
    res.status(404).send({
      error: "404 Not Found",
      message: "No se encontró una joya con el ID especificado"
    });
  }
});



// Ruta GET para obtener una joya por su ID con campos seleccionados
app.get("/api/v2/joya/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (req.query.fields)
    return res.send(fieldsSelect(joya(id)[0], req.query.fields));
  joya(id)[0]
    ? res.send({
        joya: joya(id)[0],
      })
    : res.send({
        error: "404 Not Found",
        message: "No existe una joya con ese ID",
      });
});

// Ruta GET para obtener todas las joyas de una categoría
app.get("/api/v2/Category/:category", (req, res) => {
  const category = req.params.category;
  res.send({
    cant: filtroCategory(category).length,
    joyas: filtroCategory(category),
  });
});
