import React from "react"
import { Link } from "react-router-dom"

import AccountLayout, { BreadcrumbObject } from "."
import Icon from "../../components/Icon"
import Dialog from '../../components/Dialog'
import { config } from "../../useStore"
import Avatar from "../../assets/high.webp"

import "./index.scss"

interface MyaccountStatus {
	userId:			number
	username:		string
	email:			string
	newsletter:		string
	oldPassword:	string
	newPassword:	string
	rePassword:		string
	showDialog:		boolean
}

const breadcrumbData = [
	{
		title:          "Home",
		url:            "/"
	},
	{
		title:          `Public Profile`,
		url:            "/myprofile",
		active:         true
	}
] as BreadcrumbObject[]

const MyProfile = () => {
	const [status, setStatus] = React.useState<MyaccountStatus>({
		userId:			123123,
		username:		"felixjan412",
		email:			"felix44291@gmail.com",
		newsletter:		"1",
		oldPassword:	"",
		newPassword:	"",
		rePassword:		"",
		showDialog:		false
	});

    const onDelClose = () => setStatus({...status, showDialog: false});
	

	return (
		<section className="container">
			<AccountLayout 
				menuKey="myprofile"
				title={`Public Profile`}
				desc={`${config.chain} connect`}
				breadcrumb={breadcrumbData}
			>
				<div className="panel">
					<div className="panel-header d-middle justify-content-between">
						<h4>{`Public Profile`}</h4>
					</div>
					<p>Your Public Profile information is shared publicly. Please DO NOT enter sensitive information such as your private keys here.</p>
					<div className="panel-content list">
						<div>
							<span className="d-middle">
								<Icon icon="Polaroid" className="mr" />
								Public Profile Picture:
							</span>
							<span>
								<div className="d-middle gap">
									<img className="avatar" src={Avatar} alt="My Photo" />
									<button className="btn btn-sm" onClick={()=>setStatus({...status, showDialog: true})}>Change picture</button>
								</div>
							</span>
						</div>
						<div>
							<span className="d-middle">
								<Icon icon="AddressCard" className="mr" />
								Public Profile:
							</span>
							<span>
								<Link className="btn btn-outline-primary" to={`/profile/${status.userId}`}>View public profile page<Icon icon="External" className="ml" /></Link>
							</span>
						</div>
						<div>
							<span className="d-middle">
								<Icon icon="Badge" className="mr" />
								Public Profile Name:
							</span>
							<span>
								<div>
									<input className="input input-block mb" placeholder="Pullic user profile name" />
									<small className="gray"><Icon icon="Info" className="mr" size={11} />Your PUBLIC Profile information can be viewed publicly. Please do not enter sensitive information like your private keys here.</small>
								</div>
							</span>
						</div>
						<div>
							<span className="d-middle">
								<Icon icon="Globe" className="mr" />
								Public Profile Website:
							</span>
							<span>
								<input type="text" className="input input-block" placeholder="https://yourwebsite.com" />
							</span>
						</div>
						<div>
							<span className="d-middle">
								<Icon icon="ClipBoard" className="mr" />
								Public Profile Bio:
							</span>
							<span>
								<textarea className="input input-block" name="public_bio" id="public_bio" rows={5} placeholder="Your public profile BIO info (up to 155 characters)"></textarea>
							</span>
						</div>
					</div>
					<div className="panel-foote">
						<div className="text-right">
							<button className="btn mr">Cancle</button>
							<button className="btn btn-primary">Save Changes</button>
						</div>
					</div>
				</div>
			</AccountLayout>
            {status.showDialog && (
                <Dialog onClose={onDelClose}>
					<div className="input-field d-middle">
						<input className="mr" type="radio" name="avatar_form" id="avatar_form_1" checked />
						<label className="d-middle" htmlFor="address">
							<img className="avatar mr" src={Avatar} alt="avatar" />
							System assigned profile picture
						</label>
					</div>
					<div className="input-field d-middle">
						<input className="mr" type="radio" name="avatar_form" id="avatar_form_1" />
						<label className="d-middle" htmlFor="address">
							<img className="avatar mr" src={Avatar} alt="avatar" />
							Blockies Type Profile Picture
						</label>
					</div>
					<div className="input-field d-middle">
						<input className="mr" type="radio" name="avatar_form" id="avatar_form_1" />
						<label className="d-middle" htmlFor="address">
							<img className="avatar mr" src={Avatar} alt="avatar" />
							Custom Pic
							<button className="btn ml">Choose File</button>
						</label>
					</div>
                    <div className="text-right">
                        <button className="btn m-r-1" onClick={onDelClose}>Cancel</button>
                        <button className="btn btn-primary">Continue</button>
                    </div>
                </Dialog>
            )}	
		</section>
	)
};

export default MyProfile;