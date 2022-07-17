import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppListComponent } from './app-list/app-list.component';
import { AppAddComponent } from './app-add/app-add.component';

export const routes = [
  { path: '', component: AppListComponent, pathMatch: 'full' },
  { path: 'add', component: AppAddComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [AppListComponent, AppAddComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ApplicationModule { }
