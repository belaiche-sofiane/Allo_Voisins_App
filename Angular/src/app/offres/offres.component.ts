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
@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
export class OffresComponent implements OnInit {
  user: Observable<string>;
propositions
  produit;
  message;
  constructor(private authService: AuthentificationService,
    private produitsService: ProduitsService,
    private router: Router) {this.user = this.authService.getUser();  this.produit = this.produitsService.getProduits() }

  ngOnInit(): void {
    this.produitsService.getPropositions(this.user['_value'] ).subscribe(proposition =>{
      this.propositions = proposition;
     
    });
  }


  OffreAccepte(offre) {
    
    let OffreAccepte = {
      emailEmetteur:this.user['_value'],
      nom: offre.nom,
      emailReceveur:offre.email,
      date: offre.date,
      message:"Votre offre à été acceptée",
      }
      this.produitsService.EnvoiMessage(OffreAccepte).subscribe(msg => {
        this.message = "Offre acceptée"
        console.log("message envoyé")
      })
    }

    OffreRefusee(offre) {
    
      let OffreRefuse = {
        emailEmetteur:this.user['_value'],
        nom: offre.nom,
        emailReceveur:offre.email,
        date: offre.date,
        message:"Votre offre à été refusée",
        }
        this.produitsService.EnvoiMessage(OffreRefuse).subscribe(msg => {
          this.message = "Offre refusée"
          console.log("message envoyé")
        })
      }


}
