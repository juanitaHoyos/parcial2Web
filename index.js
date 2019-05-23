var express = require('express');
var app= express();

var motorRender = require('express-handlebars');


const fs = require('fs');

app.use(express.static('public'));
app.engine('handlebars', motorRender());
app.set('view engine', 'handlebars');


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
    contador.cactus++;
    lista();
});

app.get('/suculentas', function(req,res){
    var contexto ={
        titulo:'suculentas',
        layout:false,
    };
    res.render('suculentas', contexto);
    contador.suculentas++;
    lista();
});


app.get('/rosas', function(req,res){
    var contexto ={
        titulo:'rosas',
        layout:false,
    };
    res.render('rosas', contexto);
    contador.rosas++;
    lista();
});

//AQUI VA LO DE LA LISTA

var contador = {
    cactus : 0,
    suculentas : 0,
    rosas : 0,
  };

  var registro=[]
  

  function lista(){
    

    fs.writeFileSync('lista.txt', 'Cactus: ' + contador.cactus+'\nSuculentas: ' + contador.suculentas+'\nRosas: ' + contador.rosas+'', 'utf8');

    
    fs.readFile('lista.txt', 'utf8', function(err, data){
      if(err) throw err;
      console.log(data);
    });
}

app.listen(3000,function(){
console.log('hola!');
}); 