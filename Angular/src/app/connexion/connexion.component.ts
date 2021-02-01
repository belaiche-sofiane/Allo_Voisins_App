import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
	  utilisateur = {"email":"","password":""};
	  message: string = "";
	
	constructor(private authService: AuthentificationService,
				private router:Router) { }

  onSubmit() {
	
	this.authService.VerificationConnexion(this.utilisateur).subscribe(reponse =>{
		
		this.message= reponse['message'];
		if(reponse['resultat']== 1 ){
			this.authService.connect(this.utilisateur.email);
		
	
			    this.router.navigate(['/annonces']);
		}
		    // setTimeout(()=>{this.router.navigate(['/produits']);},1000);
	
});
  }
 
 creerCompte(){
	this.router.navigate(['/inscription']);
  } 


}