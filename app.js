 var express = require('express');
 var app= express();
 var bodyParser= require('body-parser');
 var urlencodedParser= bodyParser.urlencoded({extended: false});
 var mongo=require('mongodb');
 var MongoClient=mongo.MongoClient;
 var url='mongodb://localhost:27017/';
 var ObjectID = require('mongodb').ObjectID;
 MongoClient.connect(url,function(err,db){
    if(err) throw err;
    var dbo= db.db('todos');
    dbo.createCollection('todolist',function(err,res){
        if(err) throw err;
        db.close();
        console.log('Collection created');
    });
});
 
 //var data=[{item: 'get milk'},{item: 'sleep'}];
 app.set("view engine","ejs");
 app.use(express.static('assets'));

 app.get('/todo',function(req,res){
    MongoClient.connect(url,function(err,db){
        var dbo = db.db('todos');
        dbo.collection('todolist').find({}).toArray(function(err,result){
            if(err) throw err;
            console.log(result);
            res.render('front',{todos: result});
        });
        db.close();
     });
     
 });

 app.post('/todo', urlencodedParser, function(req,res){
     //data.push(req.body);
     MongoClient.connect(url,function(err,db){
        var dbo = db.db('todos');
        dbo.collection('todolist').insert(req.body,function(err,res){
            if(err) throw err;
            console.log('Document inserted');
        });
        dbo.collection('todolist').find({}).toArray(function(err,result){
            if(err) throw err;
            console.log(result);
            res.json(result);
        });
        db.close();
     });
     
     //console.log(todos);
 });

 app.delete('/todo/:item',function(req,res){
     //console.log('You are in the delete request of app');
     //console.log(req.url);
     
         //console.log(todo.item.replace(/ /g,'-'));
         //var str= todo.item.replace(/ /g,'-')+'-';
         //return str !== req.params.item;
     //});
     //console.log(data);
     //res.json(data);
     console.log(req.url);
     var str=req.params.item.replace(/\-/g,' ').slice(0, -1);
     var todelete;
     //let name;
     MongoClient.connect(url,function(err,db){
        
         var dbo=db.db('todos');
         dbo.collection('todolist').findOne({item: str},function(err,result){
             console.log(result._id);
             if(result){
                 dbo.collection('todolist').deleteOne(result,function(err,res1){
                     //console.log(res.deletedCount);
                     if(err) throw err;
                     if(res1){
                        dbo.collection('todolist').find({}).toArray(function(err,result){
                            res.json(result);
                        });
                        db.close();
                     }
                 });
             }
         });
        
     });
 });

 app.listen(3000,function(){
     console.log('Listening to port no. 3000');
 });