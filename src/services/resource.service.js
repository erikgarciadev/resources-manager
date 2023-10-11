import { db } from '../firebase'
import {
    collection,
    addDoc,
    Timestamp,
    orderBy,
    onSnapshot,
    where,
    query,
    getDocs,
    updateDoc
} from 'firebase/firestore'

const COLLECTION = 'resources'

export default class ResourceService {
    async add(data) {
        await addDoc(collection(db, COLLECTION), {
            ...data,
            deleted: false,
            created_at: Timestamp.now()
        })
    }

    async update(changes) {
        await updateDoc(collection(db, COLLECTION), {
            ...changes,
            updated_at: Timestamp.now()
        })
    }

    async delete(data) {
        await updateDoc(collection(db, COLLECTION), {
            deleted: true,
            updated_at: Timestamp.now()
        })
    }

    async getList() {
        let list = []
        const q = query(
            collection(db, COLLECTION),
            where('deleted', '==', false),
            orderBy('created_at', 'desc')
        )
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(doc => {
            list.push({
                id: doc.id,
                ...doc.data()
            })
        })
        // await onSnapshot(q, querySnapshot => {
        //     console.log('aca')
        //     console.log(querySnapshot.docs)
        //     list = querySnapshot.docs.map(doc => ({
        //         id: doc.id,
        //         data: doc.data()
        //     }))
        // })

        return list
    }
}
