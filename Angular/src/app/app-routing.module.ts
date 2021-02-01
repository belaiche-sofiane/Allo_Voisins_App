import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {ConnexionComponent} from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { MenuComponent } from './menu/menu.component';

import {AccueilComponent }  from './accueil/accueil.component';
import {ProduitsAjoutesComponent }  from './produits-ajoutes/produits-ajoutes.component';
import {MesannoncesComponent }  from './mesannonces/mesannonces.component';
import { AnnonceComponent } from './annonce/annonce.component';
import {MesmessagesComponent} from './mesmessages/mesmessages.component';
import {AnnoncesComponent} from './annonces/annonces.component';
import {MesLocationsComponent} from './mes-locations/mes-locations.component';
import {OffresComponent} from './offres/offres.component';
const routes: Routes = [
 
  { path:'annonces/:categorie', component:AnnoncesComponent} ,
 { path:'annonces',component:AnnoncesComponent},
 
 {path:'membre/connexion', component: ConnexionComponent},
{path:'inscription',component:InscriptionComponent},
{path: 'meslocations/:email', component:MesLocationsComponent},
{path:'accueil', component:AccueilComponent} ,
{path:'ajouter', component:ProduitsAjoutesComponent},
{path:'mesannonces', component:MesannoncesComponent},
{path:'mesmessages', component:MesmessagesComponent},
{
  path: 'annonce',
  component: AnnonceComponent,
},
{path:'offres', component:OffresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
