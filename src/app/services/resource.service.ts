import { Injectable, inject } from '@angular/core';
import { FirebaseService } from './firebase.service';
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  collectionData,
  query,
  deleteDoc,
  addDoc,
  collection,
  updateDoc,
  Timestamp,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  firebaseSvc = inject(FirebaseService);
  path = 'resources';

  get() {}

  add(data: any) {
    return this.firebaseSvc.addDocument(this.path, {
      ...data,
      deleted: false,
      created_at: Timestamp.now(),
    });
  }

  update(uuid: string, data: any) {
    return this.firebaseSvc.updateDocument(`${this.path}/${uuid}`, {
      ...data,
      updated_at: Timestamp.now(),
    });
  }

  delete(uuid: string) {
    return this.firebaseSvc.updateDocument(`${this.path}/${uuid}`, {
      deleted: true,
      deleted_at: Timestamp.now(),
    });
  }
}
