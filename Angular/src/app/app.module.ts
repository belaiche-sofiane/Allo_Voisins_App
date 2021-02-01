import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import {AuthentificationService} from './authentification.service';
import {FormsModule }  from '@angular/forms'; 
import {HttpClientModule }  from '@angular/common/http';
import {ProduitsService }  from './produits.service';
import { MenuComponent } from './menu/menu.component';

import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';

import { AccueilComponent } from './accueil/accueil.component';
import { ProduitsAjoutesComponent } from './produits-ajoutes/produits-ajoutes.component';
import { MesannoncesComponent } from './mesannonces/mesannonces.component';
import { AnnonceComponent } from './annonce/annonce.component';
import { MesmessagesComponent } from './mesmessages/mesmessages.component';
import { AnnoncesComponent } from './annonces/annonces.component';

import { MesLocationsComponent } from './mes-locations/mes-locations.component';
import { OffresComponent } from './offres/offres.component';




@NgModule({
  declarations: [
    AppComponent,
  
    MenuComponent,
    
    ConnexionComponent,
    InscriptionComponent,
    
    AccueilComponent,
    ProduitsAjoutesComponent,
    MesannoncesComponent,
    AnnonceComponent,
    MesmessagesComponent,
    AnnoncesComponent,
  
    MesLocationsComponent,
  
    OffresComponent,
  
  
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ProduitsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
