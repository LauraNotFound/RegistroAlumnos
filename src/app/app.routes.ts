import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AlumnsComponent } from './alumns/alumns.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
    },
    {
        path: 'register',
        component: RegisterComponent,
        title: 'Register'
    },
    {
        path: 'alumns',
        component: AlumnsComponent,
        title: 'Alumns',
        canActivate: [AuthGuard]
    }
];