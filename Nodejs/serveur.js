
const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req,res, next){
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Methods', 'Get, POST, PUT,DELETE');
	res.setHeader('Access-Control-Allow-Headers', '*');
	next();

});

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    let db = client.db('locations');
    
    app.get("/annonces", (req, res) => {
        
        db.collection("Biens").find().toArray((err, documents) => {
            res.end(JSON.stringify(documents));
        });
    });

    

    /* ajouter un produit dans la BD */
    app.post("/ajouterpanier", (req, res) => {
        console.log(JSON.stringify(req.body));
try{ 
        db.collection("Préts").insertOne(req.body);
        res.end(JSON.stringify({ "message": "produit ajouté au panier" })); 
    }catch(e){
        console.log("Erreur  : " + e);
        res.end(JSON.stringify([]));// renvoie une liste vide
    }
    });
    
    /*supprimer un produit de la BD*/
    app.get("/produitsupp/:id", (req, res) => {
        console.log(JSON.stringify(req.body));

     try{ console.log(JSON.stringify("hi",req.body));
            db.collection("Préts").remove({id:req.params.id} )  
            
            res.end(JSON.stringify({" resultat":1,"message":"Annonce supprimé du panier "}));
        } catch(e){
            console.log("Erreur  : " + e);
            res.end(JSON.stringify([]));// renvoie une liste vide
        }
     });

     /*connexion d'un utilisateur*/
    app.post("/membre/connexion", (req,res) => {
        console.log("/utilisateurs/connexion avec "+JSON.stringify(req.body));
        
    	try{
    		db.collection("membres").find(req.body).toArray((err, documents) => {
                console.log(documents);
    		 if (documents.length == 1){

             console.log("connecteee");
                 res.end(JSON.stringify({"resultat":1,"message":"authentification reussie "}));
             }
             else res.end(JSON.stringify({"resultat":0,"message": "Email et/ou mot de pass incorrect"}));
             
    		});
    	}catch (e) {
            console.log("catch");
    		res.end(JSON.stringify({"resultat": 0, "message": e}));
    	}

    });
    /* liste des annonces suivant une catégorie*/
    app.get("/annonces/:categorie", (req, res) => {

        console.log("/produits/" + req.params.categorie);

        db.collection("Biens").find({ "categorie": req.params.categorie }).toArray((err, documents) => {
            res.end(JSON.stringify(documents));
        });
    }); 
        
        //renvoie toutes les categories:
        app.get("/categories", (req,res) => {
    	console.log("/categories");
    	categories = []
    	try {
    		db.collection("Biens").find() .toArray((err, documents) => {
    			for(let doc of documents) {
    				if (! categories.includes(doc.categorie)) categories.push(doc.categorie);
    			}
    			console.log("renvoi de "+JSON.stringify(categories));
    			res.end(JSON.stringify(categories));
    		});
    	}catch(e){
    		console.log("Erreur sur /categories: "+ e);
    		res.end (JSON.stringify([]));
    	}

    });

    //renvoie le contenu du panier selon l'adresse email
      app.get("/meslocations/:email", (req,res) => {
        
        try{
            db.collection("Préts").find({email:req.params.email} ).toArray((err, documents) => {
            res.end(JSON.stringify(documents));
           });
        }catch(e){
            console.log("Erreur sur : " + e);
            res.end(JSON.stringify([]));// renvoie une liste vide
        }
     });



     //produit par categorie
     app.get("/annonces/:categorie", (req,res) =>{
    	let categorie = req.params.categorie;
    	
    	try{
    	   db.collection("Biens").find({categorie:categorie}).toArray((err, documents) =>{
    	   	res.end(JSON.stringify(documents));
    	   });
    	}catch(e) {;
    	
    	res.end(JSON.stringify([]));
        }
   });


       // Ajouter un utilisteur 
    app.post("/membre", (req,res)=>{
        console.log("body:"+ JSON.stringify(req.body));
        try{
            db.collection("membres")
            .insert(req.body);
           res.end(JSON.stringify({"resultat": 1, "message": "compte creé"}));
        } catch (e) {
            res.end(JSON.stringify({"resultat": 0, "message": e}));
        }

    }); 



   // Ajouter un produit
   app.post("/annonce", (req,res)=>{
    console.log("body:"+ JSON.stringify(req.body));
    try{
        db.collection("Biens")
        .insertOne(req.body);
       res.end(JSON.stringify({"resultat": 1, "message": "annonce ajouté"}));
    } catch (e) {
        res.end(JSON.stringify({"resultat": 0, "message": e}));
    }
  
});  



//annonces selon un utilisateur       
app.get("/annonce/:email", (req,res) => {
   
    try{
        db.collection("Biens").find({email:req.params.email} ).toArray((err, documents) => {
        res.end(JSON.stringify(documents));
       });
    }catch(e){
        console.log("Erreur : " + e);
        res.end(JSON.stringify([]));
    }
  
 });    

   /*supprimer une annonce de la BD*/
   app.get("/supp/:id", (req, res) => {
    console.log(JSON.stringify(req.body));

 try{
        db.collection("Biens").deleteOne({id:req.params.id} )  
       
        res.end(JSON.stringify({" resultat":1,"message":"Annonce supprimé "}));
    } catch(e){
        console.log("Erreur  : " + e);
        res.end(JSON.stringify([]));
    }
 });  



 //détails d'une annonce
 app.post("/annonces/details", (req, res) => {
   
    const produit = req.body;
    db.collection("Biens")
      .find(produit)
      .toArray((err, documents) => {
        res.end(JSON.stringify(documents));
      });
  });




     /* envoyer un message */
     app.post("/envoimessage", (req, res) => {
        console.log(JSON.stringify(req.body));
try{ 
        db.collection("message").insertOne(req.body);
        res.end(JSON.stringify({ "message": "message envoyé avec succés" })); 
    }catch(e){
        console.log("Erreur  : " + e);
        res.end(JSON.stringify([]));
    }
    });
   
    
    
// Récupération des messages reçus du la BD
    app.get("/messages/:emailReceveur", (req,res) => {
   
        try{
            db.collection("message").find({emailReceveur:req.params.emailReceveur} ).toArray((err, documents) => {
            res.end(JSON.stringify(documents));
            
           });
        }catch(e){
            console.log("Erreur sur message: " + e);
            res.end(JSON.stringify([]));
        }
     });

// Récupération des messages Envoyés du la BD
     app.get("/messagesEnvoyes/:emailEmetteur", (req,res) => {
   
        try{
            db.collection("message").find({emailEmetteur:req.params.emailEmetteur} ).toArray((err, documents) => {
            res.end(JSON.stringify(documents));
            
           });
        }catch(e){
            console.log("Erreur sur message: " + e);
            res.end(JSON.stringify([]));
        }
     });


     // Les offres qui sont fait par un utilisateur
     app.get("/mespropositions/:user", (req,res) => {
        
        try{
            db.collection("Préts").find({user:req.params.user} ).toArray((err, documents) => {
            res.end(JSON.stringify(documents));
            
           });
        }catch(e){
            console.log("Erreur : " + e);
            res.end(JSON.stringify([]));
        }
     });

});

app.listen(8888);
