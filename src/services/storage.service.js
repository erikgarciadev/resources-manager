import { storage } from '../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

class StorageService {
    uploadFile(file, cbSuccess, cbError, cbLoad) {
        const storageRef = ref(storage, `/files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
            'state_changed',
            snapshot => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                console.log(percent)
                if (cbLoad) {
                    cbLoad(percent)
                }
            },
            err => cbError(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => {
                        cbSuccess(url)
                    })
                    .catch(err => cbError(err))
            }
        )
    }
}

export default new StorageService()
