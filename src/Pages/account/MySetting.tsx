import React from "react"
import AccountLayout, { BreadcrumbObject } from ".";
import Icon from "../../components/Icon"
import useStore from "../../useStore";

import "./index.scss"

interface MyaccountStatus {
	username:		string
	email:			string
	newsletter:		string
	oldPassword:	string
	newPassword:	string
	rePassword:		string
	showNewsletter:	boolean
}

const breadcrumbData = [
	{
		title:          "Home",
		url:            "/"
	},
	{
		title:          "Account Setting",
		url:            "/mysetting",
		active:         true
	}
] as BreadcrumbObject[]

const MySetting = () => {
	const {account} = useStore()
	const [status, setStatus] = React.useState<MyaccountStatus>({
		username:		account?.username || '',
		email:			account?.email || '',
		newsletter:		"1",
		oldPassword:	"",
		newPassword:	"",
		rePassword:		"",
		showNewsletter:	false
	});
	
	const inputChangeHandle = (e) => {
		setStatus({...status, [e.target.name]: e.target.vale})
	}

	return (
		<div className="container">
			<AccountLayout 
				menuKey="mysetting"
				title="Deam Connect"
				desc="account setting"
				breadcrumb={breadcrumbData}
			>
				<>
				<div className="panel mb-1">
						<div className="panel-header d-middle justify-content-between">
							<h4>Account Setting</h4>
						</div>
						<p>Below are the username, email and overview information for your account.</p>
						<div className="panel-content list">
							<div>
								<span className="d-middle">
									<Icon icon="UserCircle" className="mr" />
									Your username:
								</span>
								<span>
									<b>{status.username}</b>
								</span>
							</div>
							<div>
								<span className="d-middle">
									<Icon icon="Email" className="mr" />
									Your email address:
								</span>
								<span>
									<input type="text" className="input input-block" name="email" value={status.email} onChange={inputChangeHandle} />
								</span>
							</div>
							{/* <div>
								<span className="d-middle">
									<Icon icon="MailBox" className="mr" />
									Newsletter:
								</span>
								<span>
									<div>
										<div className="flex">
											<input type="checkbox" className="mr" name="newsletter_checkbox" id="newsletter_checkbox" onChange={() => setStatus({...status, showNewsletter: !status.showNewsletter})} />
											<label htmlFor="newsletter_checkbox">
												<div className="mb"><span>Subscribe to Newsletter</span></div>
												<p className="gray" style={{lineHeight: "1.5em"}}>Etherscan's monthly newsletter brings you the latest features, analyses, trending stories, community contributions, job listings and giveaways!</p>
											</label>
										</div>
										{status.showNewsletter && (<div>
											<p className="gray mb">Please let us want to receive these emails</p>
											<div>
												<div className="d-middle mb">
													<input type="radio" name="newsletter_setting" id="newsletter_1" checked />
													<label htmlFor="newsletter_1">I no longer want to receive thses emails</label>
												</div>
												<div className="d-middle mb">
													<input type="radio" name="newsletter_setting" id="newsletter_2" />
													<label htmlFor="newsletter_2">I never signed up for this mailing list</label>
												</div>
												<div className="d-middle mb">
													<input type="radio" name="newsletter_setting" id="newsletter_3" />
													<label htmlFor="newsletter_3">The emails are inappropriate</label>
												</div>
												<div className="d-middle mb">
													<input type="radio" name="newsletter_setting" id="newsletter_4" />
													<label htmlFor="newsletter_4">The emails are spam and should be reported</label>
												</div>
												<div className="d-middle mb">
													<input type="radio" name="newsletter_setting" id="newsletter_5" />
													<label htmlFor="newsletter_5">Other</label>
												</div>
											</div>
										</div>)}
									</div>
								</span>
							</div> */}
						</div>
						<div className="panel-footer">
							<div className="text-right">
								<button className="btn mr">Cancel</button>
								<button className="btn btn-primary">Save Changes</button>
							</div>
						</div>
					</div>
					<div className="panel mb-1">
						<div className="panel-header d-middle justify-content-between">
							<h4>Account Setting</h4>
						</div>
						<p>Edit the fields below to update your password.</p>
						<div className="panel-content list">
							<div>
								<span className="d-middle">
									<Icon icon="Lock" className="mr" />
									Enter OLD password:
								</span>
								<span>
									<input type="text" className="input input-block" name="oldPassword" value={status.oldPassword} onChange={inputChangeHandle} />
								</span>
							</div>
							<div>
								<span className="d-middle">
									<Icon icon="Lock" className="mr" />
									Enter NEW password:
								</span>
								<span>
									<input type="text" className="input input-block" name="newPassword" value={status.newPassword} onChange={inputChangeHandle} />
								</span>
							</div>
							<div>
								<span className="d-middle">
									<Icon icon="Lock" className="mr" />
									Re-Confirm password:
								</span>
								<span>
									<input type="text" className="input input-block" name="rePassword" value={status.rePassword} onChange={inputChangeHandle} />
								</span>
							</div>
						</div>
						<div className="panel-footer">
							<div className="text-right">
								<button className="btn mr">Cancel</button>
								<button className="btn btn-primary">Save Changes</button>
							</div>
						</div>
					</div>
					<div className="panel mb-1">
						<div className="panel-header d-middle justify-content-between">
							<h4>Delete Account</h4>
						</div>
						<div className="panel-content">
							<div className="">
								<p className="mb"><b>Are you sure you want to permanently delete your user account?</b></p>
								<p className="gray">Deleting your user account will also delete all the watchlists, transaction notes, private tags and verified addresses ownership. Recovery of the above is not possible upon delete confirmation.</p>
							</div>
						</div>
						<div className="panel-footer d-middle justify-content-between">
							<div className="d-middle">
								<input type="checkbox" name="delete_account" id="delete_account" />
								<label htmlFor="delete_account">Confirm that I want to delete my account</label>
							</div>
							<button className="btn btn-primary danger-bg">Delete Account</button>
						</div>
					</div>
				</>
			</AccountLayout>
		</div>
	)
};

export default MySetting;