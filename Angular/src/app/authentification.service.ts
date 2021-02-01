import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Subject,BehaviorSubject} from 'rxjs';
import {Observable} from 'rxjs';
const httpOptions = {
	headers: new HttpHeaders({
		"Access-Control-Allow-Methods":"GET, POST",
		"Access-Control-Allow-Headers":"Content-type",
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin":"*",
		
	})
};

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
    user: Subject<string>= new BehaviorSubject<string>(undefined);
    private baseURL: string="http://localhost:8888/"
  constructor(private http:HttpClient) { }
getUser(){
  return this.user;
  
}

connect(data: string){
  this.user.next(data);
}
disconnect(){
  this.user.next(null);
}
VerificationConnexion(identifiants):Observable<any>{
  return this.http.post(this.baseURL +"membre/connexion",JSON.stringify(identifiants),httpOptions);
  
}
creerCompte(utilisateur): Observable<any> {
  console.log("creerCompte utlisateur:"+ JSON.stringify(utilisateur));
      return this.http.post('http://localhost:8888/membre',JSON.stringify(utilisateur) ,httpOptions);
  
  }
  Ajouter(utilisateur): Observable<any>{
    return this.http.post('http://localhost:8888/ajouterpanier',JSON.stringify(utilisateur) ,httpOptions);
  }
}
