import Deamtest from 'deamtest-react';
import React from 'react';
import { Link } from 'react-router-dom';
import useStore, { config, tips, validateEmail, validateUsername } from '../../useStore';
import './auth.scss'
import Success from '../../components/Success';


interface RegisterStatus {
	username:		string
	email:			string
	password:		string
	confirm:		string
	captcha:		string
	agree:			boolean
	success:		boolean
	
}
interface RegisterError {
	username?:		boolean
	email?:			boolean
	password?:		boolean
	confirm?:		boolean
	captcha?:		boolean
	agree?:			boolean
	submit?:		number
}


const Register = () => {
	const {showLoading, getError, sendJson, T} = useStore()
	const [status, setStatus] = React.useState<RegisterStatus>({
		username:	'',
		email:		'',
		password:	'',
		confirm:	'',
		captcha:	'',
		agree:		false,
		success:	false
	});
	const [error, setError] = React.useState<RegisterError>({});

	const onVerify = async (captcha: string) => {
		onUpdate({captcha})
	}
	
	const onUpdate = async (attrs: Partial<RegisterStatus>) => {
		const errs = {...error} as RegisterError
		for (let k in attrs) delete errs[k]
		setStatus({...status, ...attrs})
		setError(errs)
	}

	const submit = async () => {
		const {username, email, password, confirm, agree, captcha} = status
		const errs = {} as RegisterError
		if (!validateUsername(username)) {
			errs.username = true
			tips(getError(20001))
		}
		if (!validateEmail(email)) {
			errs.email = true
			tips(getError(20002))
		}
		if (password.length<6 && password.length<32) {
			errs.password = true
			tips(getError(20005))
		}
		if (password!==confirm) {
			errs.confirm = true
			tips(getError(20018))
		}
		if (!agree) {
			errs.agree = true
			tips(getError(20019))
		}
		if (captcha==='') {
			errs.captcha = true
			tips(getError(20011))
		}
		if (Object.keys(errs).length!==0) {
			setError(errs)
			return
		}
		showLoading(true)
		try {
			// 
			const response = await sendJson("register", username, email, password, captcha)
			if (response.result===true) {
				setStatus({...status, success: true})
			} else {
				setError({submit: response.error})
			}
		} catch (error) {}
		showLoading(false)
	}

	return (
		<div className='register'>
			<section className='container log-form'>
				<h3>Register a New Account</h3>
				{ status.success ? (
					<div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}} className='mt-5 mb-5'>
						<Success />
						<h3 className='mt-3'>{T('register.success')}</h3>
						<div className='mt-3'>
							<Link to="/login" className="btn btn-primary pl-4 pr-4">Login</Link>
						</div>
						
					</div>
				) : (
					<div className='form'>
						<div className='input-field'>
							<label>Username</label>
							<input type="text" className={`input input-block ${!!error.username ? 'danger': ''}`} placeholder='6 to 20 alphanumeric characters.' minLength={6} maxLength={20} value={status.username} onChange={(e) => onUpdate({username: e.target.value})}></input>
						</div>
						<div className='input-field'>
							<label>Email Address</label>
							<input type="text" className={`input input-block ${!!error.email ? 'danger': ''}`} placeholder='A confirmation code will be sent to this address' value={status.email} onChange={(e) => onUpdate({ email: e.target.value })}></input>
						</div>
						<div className="section-split">
							<div className="col6">
								<div className='input-field'>
									<label>Password</label>
									<input type="password" className={`input input-block ${!!error.password ? 'danger': ''}`} placeholder='Password' value={status.password} minLength={6} maxLength={32} onChange={(e) => onUpdate({ password: e.target.value })}></input>
								</div>
							</div>
							<div className="col6">
								<div className='input-field'>
									<label>Confirm Password</label>
									<input type="password" className={`input input-block ${!!error.confirm ? 'danger': ''}`} placeholder='Confirm Password' value={status.confirm} minLength={6} maxLength={32} onChange={(e) => onUpdate({ confirm: e.target.value })}></input>
								</div>
							</div>
						</div>
						<div className='gray'>
							<label className='d-middle gap'>
								<input type="checkbox" checked={status.agree} onChange={e => onUpdate({agree: e.target.checked})} /> I agree to the <Link to="/terms">Terms and Conditions</Link>
							</label>
							{!!error.agree && <div className='error'>Please accept our Terms and Conditions.</div>}
						</div>
						{/* <div className='gray'>
							<label>
								<input type="checkbox" /> I agree to receive the {config.title} newsletter and understand that I can unsubscribe at any time.
							</label>
						</div> */}
						<div className='d-center mt-3 mb-3'>
							<div style={{width: 300}}>
								<Deamtest appId={config.deamAppId} apiKey={config.deamApiKey} onVerify={onVerify} />
								{!!error.captcha && <div className='error'>Click to verify captch, please</div>}
							</div>

						</div>
						{error.submit!==undefined && <div className='error'>{getError(error.submit)}</div>}
						<div className="flex" style={{ justifyContent: "space-between", alignItems: "center" }}>
							<span className='gray'>Already have an account?&nbsp;<Link to="/login">Click to Sign In</Link></span>
							<button disabled={status.captcha===''} className='btn btn-primary' onClick={submit}>Create an Account</button>
						</div>
					</div>
				)}
			</section>
		</div>
	)
};

export default Register;