import { useEffect, useState } from 'react'
import ResourceService from '../../services/resource.service'

const resourceService = new ResourceService()

export default function useResources() {
    const [loader, setLoader] = useState(false)
    const [resources, setResources] = useState([])

    useEffect(() => {
        setLoader(true)
        resourceService
            .getList()
            .then(data => {
                setResources(data)
                setLoader(false)
            })
            .catch(err => {
                console.log('err', err)
                setLoader(false)
            })
        return () => {
            setResources([])
        }
    }, [])

    return {
        loader,
        resources
    }
}
