import React from 'react'

function Loading({loading}) {
    return (
        <>
            {loading && (
                <div className="animate-spin mx-auto rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>

            )}
        </>
    )
}

export default Loading