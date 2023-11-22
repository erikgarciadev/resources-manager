import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent, Platform } from '@ionic/angular';
import { ResourceService } from 'src/app/services/resource.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-resources',
  templateUrl: './resources.page.html',
  styleUrls: ['./resources.page.scss'],
})
export class ResourcesPage implements OnInit {
  resourceSvc = inject(ResourceService);
  platform = inject(Platform);
  utilsSvc = inject(UtilsService);

  @ViewChild('popover') popover;

  loading = false;
  resources = [];
  lastInResponse: any;
  disable_next = false;
  limit = 10;
  isOpen = false;

  ngOnInit() {}

  ionViewWillEnter() {
    this.getResources();
  }

  getResources() {
    const wrapper_height = this.platform.height();
    const wrapper_width = this.platform.width();
    let limit = 10;

    if (wrapper_height < 700 && wrapper_width < 600) {
      limit = 5;
    }
    this.loading = true;
    this.limit = limit;
    let sub = this.resourceSvc.getResources(limit).subscribe({
      next: (res: any) => {
        let resources: any[] = [];
        if (res.docs.length !== 0) {
          this.lastInResponse = res.docs[res.docs.length - 1];
        }
        for (let data of res.docs) {
          const docData: any = data.data();
          resources.push({
            id: data.id,
            ...docData,
          });
        }

        this.resources = resources;
        this.loading = false;
        sub.unsubscribe();
      },
      error: (error: any) => {
        console.log(error);
        this.loading = false;
        sub.unsubscribe();
      },
    });
  }

  nextData(event) {
    if (this.disable_next) {
      (event as InfiniteScrollCustomEvent).target.complete();
      return;
    }

    let sub = this.resourceSvc
      .getNextResources(this.limit, this.lastInResponse)
      .subscribe({
        next: (res) => {
          let resources: any[] = [];

          if (res.docs.length !== 0) {
            this.lastInResponse = res.docs[res.docs.length - 1];
          }

          for (let data of res.docs) {
            const docData: any = data.data();
            resources.push({
              id: data.id,
              ...docData,
            });
          }

          this.resources = [...this.resources, ...resources];

          if (res.docs.length < this.limit) {
            this.disable_next = true;
          }
          sub.unsubscribe();

          setTimeout(() => {
            (event as InfiniteScrollCustomEvent).target.complete();
          }, 500);
        },
        error: () => {},
        complete: () => {
          sub.unsubscribe();
        },
      });
  }

  confirmDeleteResource(resource) {
    this.utilsSvc.presentAlert({
      header: 'Eliminar Recurso',
      message: 'Quieres eliminar este recurso ?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Si, eliminar',
          handler: () => {
            this.deleteResource(resource);
          },
        },
      ],
    });
  }

  async deleteResource(resource) {
    const loading = await this.utilsSvc.loading();
    await loading.present();

    this.resourceSvc
      .delete(resource.id)
      .then(() => {
        this.utilsSvc.presentToast({
          message: 'Recurso eliminado correctamente',
          duration: 2500,
          color: 'success',
          position: 'top',
          icon: 'checkmark-circle-outline',
        });
        this.getResources();
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

  async copyLink(e, link) {
    try {
      await navigator.clipboard.writeText(link);
      this.popover.event = e;
      this.isOpen = true;
      setTimeout(() => (this.isOpen = false), 1000);
    } catch (error) {
      console.log('error', error);
    }
  }
}
