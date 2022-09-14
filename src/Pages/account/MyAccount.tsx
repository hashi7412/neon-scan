import React from "react"
import AccountLayout, { BreadcrumbObject } from "."

import useStore from "../../useStore"
import "./index.scss"
import Icon from "../../components/Icon"
import Login from "../auth/Login"

const breadcrumbData = [
	{
		title:          "Home",
		url:            "/"
	},
	{
		title:          "Account Setting",
		url:            "/myaccount",
		active:         true
	}
] as BreadcrumbObject[]

const MyAccount = () => {
	const {account, timeAgo} = useStore()

	const data = account===null ? [] : [
		{
			title: "Personal Info",
			items: [
				{
					label: "Your username",
					text: <b>{account.username}</b>,
					tip: null,
					icon: "PersonCircle"
				},
				{
					label: "Your Email Address",
					text: <b>{account.email}</b>,
					tip: null,
					icon: "Email"
				},
				{
					label: "Last Login",
					text: <span>{account.lastLogin===0 ? 'First Login' : timeAgo(account.lastLogin)}</span>,
					tip: null,
					icon: "RightInBox"
				}
			],
			desc: "Below are the username, email and overview information for your account."
		},
		/* {
			title: "Overview Usage",
			items: [
				{
					label: `Total ${config.symbol} Balance`,
					text: `${status.myAccount.totalEthBalance} ${config.symbol}`,
					tip: null,
					icon: "Wallet"
				},
				{
					label: "Your Email Address",
					text: `${status.myAccount.emailNotif} emails sent out`,
					tip: null,
					icon: "Email"
				},
				{
					label: "Address Watch List",
					text: <Link to="/myaddress">{status.myAccount.addressWatchList} address alert(s)</Link>,
					tip: `${status.myAccount.addressWatchListLimit} limit`,
					icon: "Heart"
				},
				{
					label: "Txn Private Notes",
					text: <Link to="/mynotes_tx">{status.myAccount.txnNotes}transaction private note(s)</Link>,
					tip: `${status.myAccount.txnNotesLimit} limit`,
					icon: "File"
				},
				{
					label: "Address Tags",
					text: <Link to="/mynotes_address">{status.myAccount.addressTags} address tag(s)</Link>,
					tip: `${status.myAccount.addressTagsLimit} limit`,
					icon: "Paper"
				},
				{
					label: "API Key Usage",
					text: <Link to="/myapikey">{status.myAccount.apiKeyUsage} active API(s)</Link>,
					tip: `${status.myAccount.apiKeyUsageLimit} limit`,
					icon: "Key"
				},
				{
					label: "Verified Address",
					text: <Link to="/myverify_address">{status.myAccount.verifiedAdresses} verified addresses</Link>,
					tip: status.myAccount.verifiedAdressesStatus?"Limited":"Unlimited",
					icon: "PatchCheck"
				}
			],
			desc: "Below are the username, email and overview information for your account."
		} */
	]

	return account===null ? <Login/> : (
		<div className="container">
			<AccountLayout 
				menuKey="myaccount"
				title="Account Settings"
				desc="This page provides an overview of your Ft,Scam account. You can also update your email address or password here."
				breadcrumb={breadcrumbData}
			>
				<div>
					{
						data.map((p, k) => (
							<div className="panel m-b-2" key={k}>
								<div className="panel-header">
									<h4>{p.title}</h4>
								</div>
								<div className="panel-content list">
									<p>{p.desc}</p>
									{p.items.map((i, k2) => (
										<div key={k2}>
											<span><Icon icon={i.icon} margin={10} />{i.label}:</span>
											<span>
												{i.text}
												{i.tip && (<small className="gray">{i.tip}</small>)}
											</span>
										</div>
									))}
								</div>
							</div>
						))
					}
				</div>
			</AccountLayout>
		 </div>
	)
};

export default MyAccount;