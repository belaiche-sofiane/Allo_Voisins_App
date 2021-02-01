import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProduitsService } from '../produits.service';

import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-produits-ajoutes',
  templateUrl: './produits-ajoutes.component.html',
  styleUrls: ['./produits-ajoutes.component.css']
})
export class ProduitsAjoutesComponent implements OnInit {
  produits;
  user: Observable<string>;

   produitAjoute = {
     id:Math.random().toString(36).substr(2, 9),
    
     "nom": "",
     "type":"",
     "email":"",
     "descriptif":"",
     "lienPhoto":"",
    "prix":"",
    "categorie":"",
    "disponibilite":"1",
     date: new Date().toString().substr(4,21)
   };
  
  message: string;
  constructor(private ProduitsService: ProduitsService, private authentificationService: AuthentificationService,
    private router : Router) {
      this.user = this.authentificationService.getUser();
      this.produitAjoute.email = this.user['_value']
     }

  ngOnInit(): void {
  }
onSubmit(){
 
  this.ProduitsService.creerAnnonce(this.produitAjoute).subscribe(reponse =>{
    this.message="annonce ajoutée avec succés"
  } )
} 





}
