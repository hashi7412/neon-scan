import React from 'react'; 
import './success.scss'

const Success = () => {
	return (
        <svg className="animation-success" viewBox="0 0 52 52">
            <circle className="circle" cx="26" cy="26" r="25" fill="none" />
            <path className="check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
        </svg>
	)
}

export default Success