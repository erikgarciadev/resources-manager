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
import { limit, orderBy, where } from 'firebase/firestore';
import { COLLECTIONS } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  firebaseSvc = inject(FirebaseService);
  path = COLLECTIONS.RESOURCES;

  getResources(limit = 10) {
    return this.firebaseSvc.getList(this.path, (ref) =>
      ref
        .limit(limit)
        .where('deleted', '==', false)
        .orderBy('created_at', 'desc')
    );
  }

  getNextResources(limit = 10, lastInResponse: any) {
    return this.firebaseSvc.getList(this.path, (ref) =>
      ref
        .where('deleted', '==', false)
        .orderBy('created_at', 'desc')
        .startAfter(lastInResponse)
        .limit(limit)
    );
  }

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
