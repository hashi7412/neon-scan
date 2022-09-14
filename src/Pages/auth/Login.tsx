import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Deamtest from 'deamtest-react';
import './auth.scss'
import useStore, { config, tips, validateUsername } from '../../useStore';
import WebCrypto from '../../WebCrypto';

interface LoginStatus {
	username:		string
	password:		string
	captcha:		string
}
interface LoginError {
	username?:		boolean
	password?:		boolean
	captcha?:		boolean
	submit?:		number
}

const Login = () => {
	const history = useHistory()
	const {showLoading, getError, sendJson, update} = useStore()
	const [status, setStatus] = React.useState<LoginStatus>({
		username:	"",
		password:	"",
		captcha:	"",
	});

	const [error, setError] = React.useState<LoginError>({});

	const onVerify = async (captcha: string) => {
		onUpdate({captcha})
	}
	
	const onUpdate = async (attrs: Partial<LoginStatus>) => {
		const errs = {...error} as LoginError
		for (let k in attrs) delete errs[k]
		setStatus({...status, ...attrs})
		setError(errs)
	}

	const submit = async () => {
		const {username, password, captcha} = status
		const errs = {} as LoginError
		if (!validateUsername(username)) {
			errs.username = true
			tips(getError(20001))
		}
		if (password.length<6 && password.length<32) {
			errs.password = true
			tips(getError(20005))
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
			const hash = await WebCrypto.hash(password)
			const response = await sendJson("login", username, hash, captcha)
			if (response.result) {
				update({account: response.result})
				history.push(`/myaccount`)
			} else {
				setError({submit: response.error})
			}
		} catch (error) {}
		showLoading(false)
	}
	return (
		<div className='login'>
			<section className='container log-form'>
				<h3>Welcome back</h3>
				<p>Login to your account</p>
				<div className='form'>
					<div className='input-field'>
						<label>Username</label>
						<input type="text" className={`input input-block ${!!error.username ? 'danger': ''}`} placeholder='Username' value={status.username} onChange={(e) => onUpdate({username: e.target.value })}></input>
					</div>
					<div className='input-field'>
						<label>Password<Link to="/lostpassword"><small className='gray'>Forgot your password?</small></Link></label>
						<input type="password" className={`input input-block ${!!error.password ? 'danger': ''}`} placeholder='Password' value={status.password} onChange={(e) => onUpdate({password: e.target.value })}></input>
					</div>
					{/* <div className='mt-2'>
						<label>
							<input type="checkbox" /> Remember &amp; Auto Login
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
						<div>
							<div>Don't have an account?</div>
							<Link to="/register">Click to Sign Up</Link>
						</div>
						
						<button disabled={status.captcha===''} className='btn btn-primary pl-4 pr-4' onClick={submit}>LOGIN</button>
					</div>
				</div>
				
			</section>
		</div >
	)
};

export default Login;