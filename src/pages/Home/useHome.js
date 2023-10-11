import { useState } from 'react'
import ResourceService from '../../services/resource.service'

const resourceService = new ResourceService()

export default function useHome() {
    const [form, setForm] = useState({
        description: '',
        url: '',
        type: 'url'
    })

    const [error, setError] = useState({
        url: ''
    })

    const [loader, setLoader] = useState(false)

    const handleChange = e => {
        const name = e.target.name
        const value = e.target.value
        setForm({
            ...form,
            [name]: value
        })
        setError({
            ...error,
            [name]: ''
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if (form.url === '') {
            setError({
                url: 'Requerido'
            })
            return
        }
        try {
            setLoader(true)
            await resourceService.add(form)
            setForm({
                description: '',
                url: ''
            })
            setLoader(false)
        } catch (err) {
            console.log(err)
            setLoader(false)
        }
    }

    return {
        form,
        handleChange,
        handleSubmit,
        error,
        loader
    }
}
