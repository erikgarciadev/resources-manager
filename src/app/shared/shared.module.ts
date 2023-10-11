import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { FormResourceComponent } from './components/form-resource/form-resource.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [HeaderComponent, FormResourceComponent, LoaderComponent],
  exports: [HeaderComponent, FormResourceComponent, LoaderComponent],
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
