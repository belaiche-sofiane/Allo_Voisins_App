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
import { summaryForJitFileName } from '@angular/compiler/src/aot/util';
@Component({
  selector: 'app-mes-locations',
  templateUrl: './mes-locations.component.html',
  styleUrls: ['./mes-locations.component.css']
})
export class MesLocationsComponent implements OnInit {
  product: String[];
  message:string="" 
  user: Observable<string>;
  panier;
  produit;
  variable: number;
  res; 
  prix = 0;
  totalAmount;
  propositions;
  contact = {
    
    "message":"",
    date: new Date().toString().substr(4,21)
   }
  constructor( private authService: AuthentificationService,
    private produitsService: ProduitsService,
    private router: Router) {  this.user = this.authService.getUser(); 
      this.produit = this.produitsService.getProduits() }

  ngOnInit(): void {
    this.produitsService.getPanier(this.user['_value'] ).subscribe(panier =>{
      this.panier = panier;
     for(let i in this.panier) {
       this.prix += this.panier[i].prixto;
     }
    } )
    this.produitsService.getPanier(this.produit.user ).subscribe(proposition =>{
      this.propositions = proposition;
    });

  }
  Supprimer(produit){
    this.produitsService.SupprimerProduit(produit).subscribe(produit=>{
      this.message = produit['message'];
        this.produitsService.getPanier(this.user['_value']).subscribe(
          (panier) => {
            this.panier = panier;
            
          }
        );
  
    } )
    
    
   }
   CalculPrix(produit){
    let prix = produit['prix'] 
     
    }
}
