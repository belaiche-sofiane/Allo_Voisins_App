import { Component, OnInit } from '@angular/core';
import { ProduitsService } from '../produits.service';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
@Component({
  selector: 'app-mesmessages',
  templateUrl: './mesmessages.component.html',
  styleUrls: ['./mesmessages.component.css']
})
export class MesmessagesComponent implements OnInit {
 
  messages: Object[] = new Array(); 
     user: Observable<string>;
     messagesEnvoyes: Object[] = new Array(); 

     
     produit;
     
     DateAnnonce;
     EmailUser;
     message:string;
   
    contact = {
     "emailReceveur":"",
     "message":"",
     date: new Date().toString().substr(4,21)
    }


  constructor(private authService: AuthentificationService,
    private produitsService: ProduitsService,
    private router: Router) { this.user = this.authService.getUser(),this.produit = this.produitsService.getProduit(); ; 
       }

  ngOnInit() {
    this.produitsService.getMessageRecus(this.user['_value'] ).subscribe(message =>{
      this.messages = message;
    
    } )
    this.produitsService.getMessageEnvoyes(this.user['_value'] ).subscribe(msg =>{
      this.messagesEnvoyes = msg;
   
    } )

  }


  onSubmit(){
    let c = {
      emailEmetteur: this.user['_value'],
      emailReceveur:this.contact['emailReceveur'],
      message: this.contact['message'],
      date: new Date().toString().substr(4,21),
     id:Math.random().toString(36).substr(2, 9)
    }

    this.produitsService.EnvoiMessage(c).subscribe(reponse =>{
      this.message="message envoyé avec succés"
      this.produitsService.getMessageEnvoyes(this.user['_value'] ).subscribe(msg =>{
        this.messagesEnvoyes = msg;
      
      } )

    } )
  } 
  
  
}
