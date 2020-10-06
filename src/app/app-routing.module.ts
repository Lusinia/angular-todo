import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainFormComponent } from './components/main-form/main-form.component';
import { TodosComponent } from './components/todos/todos.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'login', component: MainFormComponent
  },
  {
    path: 'todos', component: TodosComponent,  canActivate: [AuthGuardService]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
