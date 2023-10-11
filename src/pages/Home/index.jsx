import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useState } from 'react'
import { storage } from '../../firebase'
import storageService from '../../services/storage.service'
import useHome from './useHome'

export default function Home() {
    const { form, handleChange, handleSubmit, error, loader } = useHome()
    const [percent, setPercent] = useState(0)
    const [url, setUrl] = useState(null)

    const [file, setFile] = useState(null)

    const handleChangeFile = event => {
        setFile(event.target.files[0])
        const file = event.target.files[0]
        storageService.uploadFile(
            file,
            url => {
                setUrl(url)
                event.target.value = ''
            },
            console.log,
            setPercent
        )
    }

    const handleUpload = () => {
        if (file) {
            storageService.uploadFile(file, setUrl, console.log, setPercent)
        }
    }

    return (
        <div
            style={{ height: 'calc(100vh - 64px)' }}
            className="bg-blue-500 flex justify-center items-center"
        >
            <form
                onSubmit={handleSubmit}
                className="shadow-xl bg-white  rounded-3xl  p-5"
            >
                <p className="text-center text-2xl">AGREGAR RECURSO</p>

                <div className="w-full mt-4">
                    <label className="text-lg">Descripción</label>
                    <input
                        name="description"
                        type="text"
                        placeholder="Descripcion"
                        className="input"
                        onChange={handleChange}
                        value={form.description}
                    ></input>
                </div>
                <div className="w-full mt-4">
                    <label className="text-lg">Tipo</label>
                    <div className="flex gap-8 justify-center">
                        <div>
                            <input
                                name="type"
                                type="radio"
                                onChange={handleChange}
                                value="url"
                                checked={form.type === 'url'}
                            ></input>
                            <label htmlFor="url">Enlace</label>
                        </div>
                        <div>
                            <input
                                name="type"
                                type="radio"
                                onChange={handleChange}
                                value="file"
                                checked={form.type === 'file'}
                            ></input>
                            <label htmlFor="file">Archivo</label>
                        </div>
                    </div>
                </div>
                {form.type === 'url' && (
                    <div className="w-full mt-4">
                        <label className="text-lg">Enlace</label>
                        <input
                            name="url"
                            type="text"
                            placeholder="Ej: https://www.google.com/"
                            className={`input ${error?.url ? 'error' : ''}`}
                            onChange={handleChange}
                            value={form.url}
                        ></input>
                    </div>
                )}

                {form.type === 'file' && (
                    <>
                        {url ? (
                            <img width="100px" src={url} alt="" />
                        ) : (
                            <div>
                                <input
                                    type="file"
                                    onChange={handleChangeFile}
                                />
                                <p>{percent} "% done"</p>
                            </div>
                        )}
                    </>
                )}

                <button className="button" type="submit">
                    {!loader && 'Agregar'}
                    {loader && (
                        <div
                            style={{ borderTopColor: 'transparent' }}
                            className="animate-spin w-8 h-8 border-4  rounded-full"
                            viewBox="0 0 24 24"
                        ></div>
                    )}
                </button>
            </form>
        </div>
    )
}
