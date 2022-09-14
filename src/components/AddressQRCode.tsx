import React from 'react'
import { QRCode } from 'react-qrcode-logo';
import Actions from './Actions';
import Dialog from './Dialog';

interface AddressQRCodeProps {
	address: string
	onClose: Function
}

const AddressQRCode = ({ address, onClose }: AddressQRCodeProps) => {
	const onCopyImage = () => {
		const canvas = document.querySelector<HTMLCanvasElement>('#react-qrcode-logo')
		if (canvas) {
			const link = document.createElement('a');
			link.download = `${address}.png`;
			link.href = canvas.toDataURL("image/png")
			link.click()
		}
	}

	return (
		<Dialog onClose={onClose}>
			<h3 style={{textAlign: 'center', marginBottom: '1em'}}>Account QR Code</h3>
			<div className="d-center">
				<div style={{backgroundColor: 'white', border: '1px solid var(--border)', padding: '0.5em'}}>
					<QRCode value={address} eyeRadius={5} size={250} logoImage="/qrcode.webp" logoWidth={60} logoHeight={60} />
				</div>
			</div>
			<div className="d-center" style={{textAlign: 'center', marginTop: '2em', marginBottom: '2em'}}>
				<code style={{ wordBreak: 'break-all' }}>{address}</code>
				<Actions.Copy text={address} />
			</div>
			<div style={{padding: '1em'}}>
				<button onClick={onCopyImage} className='btn btn-primary full'>Copy QRCode</button>
			</div>
		</Dialog>
	)
}

export default AddressQRCode