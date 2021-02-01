import { Component, OnInit } from '@angular/core';
import { ProduitsService } from '../produits.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css']
})
export class AnnonceComponent implements OnInit {
  user: Observable<String>;
  produit;
  prixTotal=1;
  prix=0;
  DateAnnonce;
  EmailUser;
  message:string;
 
  messages: Object[] = new Array(); 
    
     messagesEnvoyes: Object[] = new Array(); 
 contact = {
  
  "message":"",
  date: new Date().toString().substr(4,21)
 }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private produitsservice: ProduitsService,
    private produitservice: ProduitsService,
    private authService: AuthentificationService) {
      this.user = this.authService.getUser();
      this.produit = this.produitservice.getProduit(); }

  ngOnInit(): void {
    var b = (<HTMLInputElement>document.getElementById("name")).value
    this.prixTotal = this.produit.prix * Number(b); 
    this.DateAnnonce = this.produit['date']


    this.produitsservice.getMessageRecus(this.user['_value'] ).subscribe(message =>{
      this.messages = message;
    
    } )
    this.produitservice.getMessageEnvoyes(this.user['_value'] ).subscribe(msg =>{
      this.messagesEnvoyes = msg;
    
    } )

  
    
  }
  
  ajoutpanier(produit){
	
    let produitAjoute = {
      email: this.user['_value'],
      id: Math.random().toString(36).substr(2, 9),
      nom: produit['nom'],
      descriptif: produit['descriptif'],
      photo: produit['lienPhoto'],
      Prix: produit['prix'],
      date: new Date().toString().substr(4,21),
      user:produit['email'],
      temps: (<HTMLInputElement>document.getElementById("name")).value,
      prixto: this.prixTotal
      };
      
      this.produitsservice.AjouterAuPanier(produitAjoute).subscribe((resultats) => {
        this.router.navigate(['/produits']);
        
      })
     
    
  }

  onSubmit(){
    let c = {
      emailEmetteur: this.user['_value'],
      emailReceveur:this.produit['email'],
      message: this.contact['message'],
      date: this.contact['date'],
      prduit:this.produit['nom'],
      image:this.produit['lienPhoto'],
     id:Math.random().toString(36).substr(2, 9),
     
    }

    this.produitsservice.EnvoiMessage(c).subscribe(reponse =>{
      this.message="message envoyé avec succés"
    } )
  } 



 
}
