var express = require('express');
var app= express();

var motorRender = require('express-handlebars');

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
});

app.listen(3000,function(){
console.log('hola!');
}); 