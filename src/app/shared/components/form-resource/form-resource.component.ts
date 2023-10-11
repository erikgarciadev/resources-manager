import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ResourceService } from 'src/app/services/resource.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-form-resource',
  templateUrl: './form-resource.component.html',
  styleUrls: ['./form-resource.component.scss'],
})
export class FormResourceComponent implements OnInit {
  urlValidator: ValidatorFn = (control: AbstractControl) => {
    let validUrl = true;

    try {
      new URL(control.value);
    } catch {
      validUrl = false;
    }

    return validUrl ? null : { invalidUrl: true };
  };

  form = new FormGroup({
    description: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required, this.urlValidator]),
  });

  resourceSvc = inject(ResourceService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {}

  async submit() {

    const loading = await this.utilsSvc.loading();
    await loading.present();

    this.resourceSvc
      .add(this.form.value)
      .then((res) => {
        this.utilsSvc.presentToast({
          message: 'Recurso agregado correctamente',
          duration: 2500,
          color: 'success',
          position: 'top',
          icon: 'checkmark-circle-outline',
        });
        this.form.reset();
      })
      .catch((err) => {
        this.utilsSvc.presentToast({
          message: err.message,
          duration: 2500,
          color: 'primary',
          position: 'top',
          icon: 'alert-circle-outline',
        });
      })
      .finally(() => loading.dismiss());
  }

  getErrorTextUrl() {
    if (this.form.controls.url.errors?.['required']) return '';

    if (
      this.form.controls.url.touched &&
      this.form.controls.url.errors?.['invalidUrl']
    ) {
      return 'El enlace tiene un formato inválido';
    }

    return '';
  }
}
