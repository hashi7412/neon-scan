import React from 'react'

interface DialogProps {
	children?: any
	onClose: Function
}

const Dialog = ({children, onClose}: DialogProps) => {
	return (
		<div className="modal">
			<div className="modal-overlay"></div>
			<div className="modal-container">
				<div style={{ textAlign: 'right' }}>
					<span className="modal-close" onClick={() => onClose()}>&times;</span>
				</div>
				{children}
			</div>
		</div>
	)
}

export default Dialog