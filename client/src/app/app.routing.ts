import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// importar user
import { UserEditComponent } from './components/user-edit.component';
import { ArtistListComponent } from './components/artist-list.component';

const appRoutes: Routes = [
  {
    path:'', redirectTo: 'Artista/1',
    pathMatch :'full'
  },
  {path:'', component: ArtistListComponent},
  {path:'Perfil', component: UserEditComponent},
  {path:'Artista/:page', component: ArtistListComponent},
  {path:'**', component: ArtistListComponent}
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
