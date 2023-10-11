import React from 'react'

export default function Loader({ height }) {
    return (
        <div
            style={{ height: height }}
            className="flex justify-center items-center w-full"
        >
            <div
                style={{ borderTopColor: 'transparent' }}
                className="w-16 h-16 border-4 border-blue-400 border-solid rounded-full animate-spin"
            ></div>
        </div>
    )
}
