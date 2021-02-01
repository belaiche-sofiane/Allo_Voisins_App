import { Component, OnInit } from '@angular/core';
import { ProduitsService } from '../produits.service';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';

import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Validators } from '@angular/forms';
import { off } from 'process';
declare var webkitSpeechRecognition:any;
@Component({
  selector: 'app-mesannonces',
  templateUrl: './mesannonces.component.html',
  styleUrls: ['./mesannonces.component.css']
})

export class MesannoncesComponent implements OnInit {
  nom: String="";
  message:string="" 
  user: Observable<string>;
  annonces;
  produit;
  propositions;
  constructor(private authService: AuthentificationService,
    private produitsService: ProduitsService,
    private router: Router) { this.user = this.authService.getUser();  this.produit = this.produitsService.getProduits()}

  ngOnInit() {
    this.produitsService.getAnnonces(this.user['_value'] ).subscribe(annonce =>{
      this.annonces = annonce;
     
    } )
    this.produitsService.getPropositions(this.user['_value'] ).subscribe(proposition =>{
      this.propositions = proposition;
      
    });
  }

  Supprime(produit){
    this.produitsService.SupprimerAnnonce(produit).subscribe(produit=>{
      this.message = produit['message'];
        this.produitsService.getAnnonces(this.user['_value']).subscribe((annonce) => {
            this.annonces = annonce;
           
          
          }
        );
  
    } )
   }
 
   
   
search(){
  if(this.nom != ""){
    this.annonces = this.annonces.filter(res  =>{
      return res.nom.toLocaleLowerCase().match(this.nom.toLocaleLowerCase()) + res.prix.toLocaleLowerCase().match(this.nom.toLocaleLowerCase()) + res.date.toLocaleLowerCase().match(this.nom.toLocaleLowerCase()) ;
      
    } )
   
  } 
  else if (this.nom ==""){
    this.ngOnInit();
  } 
} 

getProduitDetail(produit) {
    
  this.produitsService.saveProduit(produit);
  this.router.navigate(['/annonce']);
  console.log(this.produitsService.getProduit());
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
    })
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







