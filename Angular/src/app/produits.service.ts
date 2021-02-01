import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
export class ProduitsService {
urlBase: string = 'http://localhost:8888/';
private produit: Observable<string> = new Observable<string>();
  constructor(private http:HttpClient) { 
    
  }
  
  
  getProduits(): Observable<any> {
  let url = this.urlBase + 'annonces';
  console.log("dans le service ProduitService avec " + url);
  return this.http.get(url);
  }
  getCategories(): Observable<any>{
    return this.http.get(this.urlBase+'categories');
    }
    getAnnoncesParCategorie(categorie): Observable<any>{
      return this.http.get(this.urlBase+'annonces/'+categorie);
      } 
      getPanier(user): Observable<any>{
        
        return this.http.get(this.urlBase + 'meslocations/' + user)
      } 
      AjouterAuPanier(produit): Observable<any>{
        return this.http.post('http://localhost:8888/ajouterpanier',JSON.stringify(produit) ,httpOptions);
      }
      SupprimerProduit(produit){
        return this.http.get('http://localhost:8888/produitsupp/'+ produit);
      }
      creerAnnonce(produit): Observable<any> {
        
            return this.http.post('http://localhost:8888/annonce',JSON.stringify(produit) ,httpOptions);
        
        } 
        getAnnonces(user): Observable<any>{
        
          return this.http.get(this.urlBase + 'annonce/' + user)
}
        SupprimerAnnonce(produit){
            return this.http.get('http://localhost:8888/supp/'+ produit);
              }


              getProduitDetail(annonce): Observable<any> {
                console.log(annonce);
                return this.http.post(this.urlBase + 'annonces/details', annonce);
              }

              getProduit() {
                return this.produit;
              }

              saveProduit(data) {
                this.produit = data;
              }

              EnvoiMessage(message): Observable<any>{
                return this.http.post('http://localhost:8888/envoimessage',JSON.stringify(message) ,httpOptions);
              }

              getMessageRecus(user): Observable<any>{
        
                return this.http.get(this.urlBase + 'messages/' + user)
              }
              getMessageEnvoyes(user): Observable<any>{
        
                return this.http.get(this.urlBase + 'messagesEnvoyes/' + user)
              }

              getPropositions(user): Observable<any>{
        
                return this.http.get(this.urlBase + 'mespropositions/' + user)
              } 
}

