import React from 'react'

const Notif = ( { message, className }) => {
    return (
        <div className={className}>
            {message}
        </div>
    )
}

export default Notif