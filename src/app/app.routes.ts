import { Routes } from '@angular/router';
import { SignUpContainerComponent } from './features/sign-up/components/sign-up-container/sign-up-container.component';

export const routes: Routes = [
    { path: 'sign-up', component: SignUpContainerComponent  },
    { path:'' , redirectTo: 'sign-up' , pathMatch:'full'}
];
