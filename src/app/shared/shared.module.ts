import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { FormResourceComponent } from './components/form-resource/form-resource.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, FormResourceComponent],
  exports: [HeaderComponent, FormResourceComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterLinkWithHref,
    RouterLinkActive,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
