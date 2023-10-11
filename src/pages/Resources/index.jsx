import React from 'react'
import Loader from '../../components/Loader'
import useDebounce from '../../hooks/useDebounce'
import useResources from './useResources'

export default function Resources() {
    const { resources, loader } = useResources()

    const handleSearch = useDebounce(e => {
        console.log(e.target.value)
    }, 300)

    return (
        <div className="wrapper">
            <div className="pt-10 pb-10">
                <span className="font-bold text-2xl text-blue-500">
                    Listado de recursos{' '}
                </span>
                {/* <div>
                    <input
                        type="text"
                        onChange={handleSearch}
                        className="w-56 bg-red-100"
                    />
                </div> */}
                {loader && <Loader height={'calc(100vh - 200px)'} />}
                {!loader && (
                    <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {resources.map(resource => (
                            <div
                                key={resource.id}
                                className="rounded-2xl p-5 shadow-lg h-full flex flex-col justify-between"
                            >
                                <span className="font-bold text-xl">
                                    {resource.description}
                                </span>
                                <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                                    <a
                                        className="pointer text-sm underline"
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {resource.url}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
