var express = require('express');
var app= express();

var motorRender = require('express-handlebars');
const fs = require('fs');


app.use(express.static('public'));
app.engine('handlebars', motorRender());
app.set('view engine', 'handlebars');

var visitas = {
    numero: [],
    registro: []
  };

  fs.readFile(__dirname + "/lista.txt", (err, data) => {
    if (err) {
      console.log("No se encontro el archivo");
    } else {
      visitas = JSON.parse(data);
      console.log("Encontro el archivo");
    }
  });
  

  function registrarVisita(url) {
    let f = new Date();
    if (visitas.general.length > 0) {
      let encontro = false;
  
      visitas.general.forEach((v, index) => {
        if (v.url == url) {
          v.visitas++;
          let visi = v.visitas;
          encontro = true;
  
          let informacion = {
            url: url,
            visitas: visi,
            fecha: f.getDate() + "/" + f.getMonth() + "/" + f.getFullYear(),
            hora: f.getHours() + ":" + f.getMinutes()
          };
  
          visitas.registro.push(informacion);
        }
      });
  
      if (encontro == false) {
        let informacion = {
          url: url,
          visitas: 1,
          fecha: f.getDate() + "/" + f.getMonth() + "/" + f.getFullYear(),
          hora: f.getHours() + ":" + f.getMinutes()
        };
        visitas.general.push(informacion);
        visitas.registro.push(informacion);
      }
    } else {
      let informacion = {
        url: url,
        visitas: 1,
        fecha: f.getDate() + "/" + f.getMonth() + "/" + f.getFullYear(),
        hora: f.getHours() + ":" + f.getMinutes()
      };
      visitas.general.push(informacion);
      visitas.registro.push(informacion);
    }
    fs.writeFile("registro.txt", JSON.stringify(visitas), "utf8", function() {});
  }



  ////////////////////////////////////////////////////////////////////77

app.get('/', function(req, res){

    var contexto ={
        titulo:'main',
        layout:false,
    };
    res.render('main', contexto);

});

app.get('/cactus', function(req,res){
    var contexto ={
        titulo:'cactus',
        layout:false,
    };
    res.render('cactus', contexto);
    registrarVisita("cactus");
    
});

app.get('/suculentas', function(req,res){
    var contexto ={
        titulo:'suculentas',
        layout:false,
    };
    res.render('suculentas', contexto);
    registrarVisita("suculentas");
});

app.get('/rosas', function(req,res){
    var contexto ={
        titulo:'rosas',
        layout:false,
    };
    res.render('rosas', contexto);
    registrarVisita("rosas");
});





app.listen(3000,function(){
console.log('hola!');
}); 