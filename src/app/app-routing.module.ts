import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { TodoComponent } from './components/todo/todo.component';

const routes: Routes = [

  { path: 'login',
    component: LoginComponent
  },
  { path: 'todo',
    component: TodoComponent,
    canActivate: [authGuard]
  },
  {
    path: 'home',
    component: HomeComponent
   
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: '/todo',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
