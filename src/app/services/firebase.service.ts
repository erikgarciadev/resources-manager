import { Injectable, inject } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';
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
import { CollectionReference, DocumentData } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore = inject(AngularFirestore);

  getCollectionData(path: string, collectionQuery?: any) {
    console.log(path, collectionQuery);
    console.log(getFirestore());
    const ref = collection(getFirestore(), path);
    console.log(ref);

    console.log;

    return collectionData(query(ref, ...collectionQuery), { idField: 'id' });
  }

  getList(
    path: any,
    callbackRef?: QueryFn
  ) {
    return this.firestore.collection(path, callbackRef).get();
  }

  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

  updateDocument(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data);
  }

  deleteDocument(path: string) {
    return deleteDoc(doc(getFirestore(), path));
  }
}
