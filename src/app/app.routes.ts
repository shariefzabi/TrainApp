import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TrainComponent } from './train/train.component';
import { SearchComponent } from './search/search.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"

    },

    {
        path: "home",
        component: HomeComponent

    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'Train',
        component: TrainComponent
    },
    {
        path: "search/:fromStation/:toStation/:dateOfTravel",
        component: SearchComponent

    },
    {
        path: 'Register',
        component: RegisterComponent
    },
    {
        path: 'Login',
        component: LoginComponent
    }
]

