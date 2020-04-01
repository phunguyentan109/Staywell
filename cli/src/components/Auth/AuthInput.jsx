import React, { useState } from 'react';

export default function AuthInput({ icon, type, ...props }){
    const [focus, setFocus] = useState(false);
    const toggleFocus = () => setFocus(prev => !prev);

    return (
        <div className='auth-input'>
            <i className={`${icon} ${focus ? 'focus' : ''}`}/>
            <input
                type={type || 'text'}
                className={`auth-input ${focus ? 'focus' : ''}`}
                onFocus={toggleFocus}
                onBlur={toggleFocus}
                {...props}
            />
        </div>
    );
}
