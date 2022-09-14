import React from "react"
import { Link } from "react-router-dom"
import Icon from "../../components/Icon"
import { config } from "../../useStore"
import Avatar from "../../assets/high.webp"
import TabBar, { TabHeader } from "../../components/TabBar"
import Table, { TableHeader } from "../../components/Table"
import Dialog from "../../components/Dialog"

interface UserInfoObject {
	owner:				string
	joinedDate:			number
}

interface NameTagsObject {
	address:			string
	nameTags:			string
	desc:				string
}

interface ProfileStatus {
	userInfo:			UserInfoObject,
	tabKey:				string
	nameTags:			NameTagsObject[]
	likes:				any[]
	following:			any[]
	followers:			any[]
	hello:				any[]
	showDialog:			boolean
	modalData:          any
}

const mockNameTags = [
	{
		address:			"0x1222222222222222222222222222222222222222",
		nameTags:			"asdfsdf",
		desc:				"stssadsdasdring"
	}
]

const Profile = () => {
	const [status, setStatus] = React.useState<ProfileStatus>({
		userInfo:   		{
			owner:              "anon_f87c361eef6350d",
			joinedDate:         123123123
		},
		tabKey:				"nametags",
		nameTags:			mockNameTags,
		likes:				[],
		following:			[],
		followers:			[],
		hello:				[],
		showDialog:			false,
        modalData:          {
            address:    "",
            desc:       "",
            notifyType: "",
            options:    ""
        }
	})

	const headers = [
		{key: 'nametags',		label: 'Name Tags'},
		{key: 'likes',			label: 'Likes'},
		{key: 'following',		label: (<>Following<span className="badge badge-gray badge-pill ml">{status.following.length}</span></>)},
		{key: 'followers',		label: (<>followers<span className="badge badge-gray badge-pill ml">{status.followers.length}</span></>)},
		{key: 'hello',			label: (<>Hello<Icon icon="Comment" className="ml" /></>)},
	] as TabHeader[]

	const nameTagsField = [
		{key: "address",		label: "",			render: (v:string, i:any) => (
			<div>
				<div className="d-middle mb">
					<Link className="mr" to={`/address/${i.address}`}>{i.address}</Link>
					<span className="badge badge-info badge-md badge-thin">{i.nameTags}</span>
				</div>
				<p className="mb-1">{i.nameTags}</p>
				<div className="d-middle gap gray">
					<span className="d-middle warning"><Icon icon="Heart" size={20} /></span>
					<span className="mr-2">0 Likes</span>
					<span className="d-middle"><Icon icon="Edit" className="mr" />6 mins ago</span>
				</div>
			</div>
		)}
	] as TableHeader[]

    const onDelClose = () => setStatus({...status, showDialog: false});

    const inputChangeHandle = (e) => {
        setStatus({...status, modalData: {...status.modalData, [e.target.name]: e.target.value}})
    }

	return (
		<div className="profile">
			<section className="container">
				<h3>
					Public Profile
				</h3>
				<div className="section-split">
					<div className="col4">
						<div className="panel">
							<div className="text-center">
								<img className="avatar avatar-lg mb" src={Avatar} alt="avatar" />
								<h4 className="mb"><b>{status.userInfo.owner}</b></h4>
								<div className="d-middle justify-content-center gray mb-1">
									<Icon icon="CalendarAlt" /> 
									<span>{status.userInfo.joinedDate}</span>
								</div>
								<Link to={'/contactus'}>Report this user</Link>
								<hr />
							</div>
							<div>
								<div className="mb-1"><b>BADGES AWARDED</b></div>
								<div className="flex flex-wrap">
									<div className="d-middle flex column justify-content-center">
										<img className="avatar mb" src={Avatar} alt="avatar" />
										<span>User</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col8">
						<div>
							<h3 className="d-middle flex-wrap mb">
								<span className="mr">Hi, I am {status.userInfo.owner}</span>
								<div className="badge badge-gray badge-pill">Newbie</div>
							</h3>
							<TabBar headers={headers} onChange={tabKey=>setStatus({...status, tabKey})}>
								{status.tabKey === 'nametags' && (
									<div>
										<div className="text-right">
											<a><b className="d-middle" onClick={()=>setStatus({...status, showDialog: true})}><Icon icon="FillPlus" size={30} />Add</b></a>
										</div>
										<Table 
											header={(<p>Showing 0 to 0 of 0 entries</p>)}
											data={status.nameTags}
											fields={status.nameTags.length ? nameTagsField : []}
											page={0}
											total={status.nameTags.length}
										/>
									</div>
								)}
								{status.tabKey === 'likes' && (
									<div>
										likes
									</div>
								)}
								{status.tabKey === 'following' && (
									<div>
										following
									</div>
								)}
								{status.tabKey === 'followers' && (
									<div>
										followers
									</div>
								)}
								{status.tabKey === 'Hello' && (
									<div>
										Hello
									</div>
								)}
							</TabBar>
						</div>
					</div>
				</div>
			</section>
            {status.showDialog && (
                <Dialog onClose={onDelClose}>
					<div className="input-field">
						<label className="gray" htmlFor="address">{config.chain} Address</label>
						<input type="text" className="input input-block"name="address" id="address" placeholder="0x.." value={status.modalData.address} onChange={inputChangeHandle} />
					</div>
					<div className="input-field">
						<label className="gray" htmlFor="name_tags">Name Tags</label>
						<input type="text" className="input input-block"name="name_tags" id="name_tags" value={status.modalData.address} onChange={inputChangeHandle} />
						<small className="gray">Name Tags (up to 35 characters) can be used for easy identification of addresses</small>
					</div>
					<div className="input-field">
						<label className="gray" htmlFor="comment">Comment (Optional)</label>
						<textarea className="input input-block"name="comment" id="comment" rows={5} value={status.modalData.address} onChange={inputChangeHandle} />
						<small className="gray">Description of what this address is for (500 characters max)</small>
					</div>
                    <div className="text-right">
                        <button className="btn m-r-1" onClick={onDelClose}>Close</button>
                        <button className="btn btn-primary">Save Changes</button>
                    </div>
                </Dialog>
            )}	
		</div>
	)
}

export default Profile