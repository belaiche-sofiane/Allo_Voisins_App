import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { ProduitsService } from '../produits.service';
import { Observable, Subject,BehaviorSubject } from 'rxjs';
declare var webkitSpeechRecognition:any;
@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css']
})
export class AnnoncesComponent implements OnInit {
  annonces;
  product: Object[] = new Array() ;
  message: String="";
  user : Subject<String>;
  categories: Object[] = new Array();
 produit;
 nom: String="";
  constructor(private route: ActivatedRoute, private router: Router,
    private authService: AuthentificationService,
    private produitsService: ProduitsService) {this.produit = this.produitsService.getProduits()
      this.user= this.authService.getUser(); }

  ngOnInit(): void {
    this.route.params.subscribe((params : Params) =>{
	
      console.log("Dans produits.component.ts avec "+params["categorie"]);
      if(params["categorie"] !== undefined){
       
        this.produitsService.getAnnoncesParCategorie(params["categorie"]).subscribe(produits=>{
          this.annonces = produits;
        });
      }
      else{
        this.produitsService.getProduits().subscribe(produits => {
          this.annonces = produits;
        });
      }
    });
    this.produitsService.getCategories().subscribe(categories=>{
      this.categories = categories});

     
  }

  ajoutpanier(produit){
	
    let produitAjoute = {
      email: this.user['_value'],
      id: Math.random().toString(36).substr(2, 9),
      nom: produit['nom'],
      descriptif: produit['descriptif'],
      photo: produit['lienPhoto'],
      Prix: produit['prix'],
      date: new Date().toString().substr(4,21)
      };
      this.produitsService.AjouterAuPanier(produitAjoute).subscribe((resultats) => {
      this.message = resultats['message'] 
       this.router.navigate(['/annonce']);
       
      })
    
  }

  getProduitDetail(produit) {
    
    this.produitsService.saveProduit(produit);
    this.router.navigate(['/annonce']);
    console.log(this.produitsService.getProduit());
  }
 
 
produitsParCategorie(categorie) {
  this.router.navigate(['/annonces',categorie]);
} 
search(){
  var nomm = (<HTMLInputElement>document.getElementById("search-input")).value
	if(nomm != ""){
	  this.annonces = this.annonces.filter(res  =>{
		return res.nom.toLocaleLowerCase().match(this.nom.toLocaleLowerCase()) + res.prix.toLocaleLowerCase().match(this.nom.toLocaleLowerCase()) + res.date.toLocaleLowerCase().match(this.nom.toLocaleLowerCase()) + res.descriptif.toLocaleLowerCase().match(this.nom.toLocaleLowerCase()) ;
		
	  } )
	 
	} 
	else if (this.nom ==""){
	  this.ngOnInit();
	} 
  } 


  record() {
  
    var recognition = new webkitSpeechRecognition();
    recognition.lang = "fr-FR";
   
    recognition.onresult = function(event) {
        
        (<HTMLInputElement>document.getElementById("search-input")).value = event.results[0][0].transcript;
      
      }
    
     
    recognition.start();
  
}















}
