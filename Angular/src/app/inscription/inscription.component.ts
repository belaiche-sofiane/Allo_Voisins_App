import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  
  utilisateur = {
    "nom": "",
    "prenom": "",
    "email": "",
    "password": "",
    "ville":"",
    "adresse":"",
    "telephone":""
  };

  message: string;


  constructor(private authentificationService: AuthentificationService,
              private router : Router) { }

  ngOnInit() {
  }


    onSubmit() {
    

    this.authentificationService.VerificationConnexion(this.utilisateur).subscribe(response => {

      console.log("message:"+this.message);
      let resulat = response['resultat']
      console.log("resultat:"+ resulat);
      if (response['resultat']==0){


        this.authentificationService.creerCompte(this.utilisateur).subscribe(response => {
          console.log("response:" + JSON.stringify(response));
          this.message = "compte crée avec succés"
          this.authentificationService.connect(this.utilisateur.email);
          this.router.navigate(['/annonces']);
        });
      }else{
        this.message= "ce compte existe déjà!";
      }

    }
    );
  
  }
}