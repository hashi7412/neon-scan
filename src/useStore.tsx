import { createSlice } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import useWebSocket from 'react-use-websocket';
import { v4 as uuidv4 } from 'uuid';
import Config from './config.json'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import zh from 'javascript-time-ago/locale/zh.json'
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { ethers } from 'ethers';
// import Networks from './config/networks.json'
// import TestnetNetworks from './config/networks.testnet.json'
TimeAgo.addLocale(en)
TimeAgo.addLocale(zh)

const timeAgos:{[key:string]:any} = {
	'en-US': new TimeAgo('en'),
	'zh-CN': new TimeAgo('zh'),
}

export const deamAppId = Number(process.env.REACT_APP_DEAM_ID || 0)
export const deamApiKey = process.env.REACT_APP_DEAM_KEY || ''


export const CodeFormats = [
    {key: "single", label: "Solidity (Single file)", 			title: "A simple interface for solidity code that fits or concatenated into a single file"},
    {key: "multi", 	label: "Solidity (Multi-Part files)", 		title: "Support for multi-part/file solidity code with imports"},
    {key: "json", 	label: "Solidity (Standard-Json-Input)",	title: "The recommended way to interface with the Solidity compiler especially for more complex and automated setups"},
    // {label: "Vyper (Experimental)", 			title: "Experimental support for the Vyper smart contract development language"},
]

export const EvmVersions = [
    {key: 'default',			label: 'default (compiler defaults)'},
	{key: 'homestead',			label: 'homestead (oldest version)'},
	{key: 'tangerineWhistle',	label: 'tangerineWhistle'},
	{key: 'spuriousDragon',		label: 'spuriousDragon'},
	{key: 'byzantium',			label: 'byzantium (default for &lt;= v0.5.4)'},
	{key: 'constantinople',		label: 'constantinople'},
	{key: 'petersburg',			label: 'petersburg (default for &gt;= v0.5.5)'},
	{key: 'istanbul',			label: 'istanbul (default for &gt;= v0.5.14)'},
]

export const LicenseTypes = [
	'No License (None)',
	'The Unlicense (Unlicense)',
	'MIT License (MIT)',
	'GNU General Public License v2.0 (GNU GPLv2)',
	'GNU General Public License v3.0 (GNU GPLv3)',
	'GNU Lesser General Public License v2.1 (GNU LGPLv2.1)',
	'GNU Lesser General Public License v3.0 (GNU LGPLv3)',
	'BSD 2-clause "Simplified" license (BSD-2-Clause)',
	'BSD 3-clause "New" Or "Revised" license (BSD-3-Clause)',
	'Mozilla Public License 2.0 (MPL-2.0)',
	'Open Software License 3.0 (OSL-3.0)',
	'Apache 2.0 (Apache-2.0)',
	'GNU Affero General Public License (GNU AGPLv3)',
	']Business Source License (BSL 1.1)',
]


export const config = Config
export const zeroAddress = "0x0000000000000000000000000000000000000000"

const fns = {} as {
	[id:string]:(response:ServerResponse) => Promise<void>
}

const locales = {
	"en-US": require('./locales/en-US.json'),
	"zh-CN": require('./locales/zh-CN.json'),
};

export const tips = (html:string) => {
	toast(html, {
		position: "top-right",
		autoClose: 3000,
	});
}
export const encodeCall = (iface: ethers.utils.Interface, contract:string, method: string, values: any[], id: number) => {
	return {
		jsonrpc: "2.0", 
		method: "eth_call", 
		params: [{to: contract, data: iface.encodeFunctionData(method, values)}, "latest"], 
		id
	} as RpcRequestType
}

export const decodeCallData = (iface: ethers.utils.Interface, method: string, json: RpcResponseType) => {
	if (json.result!==undefined) {
		try {
			const value = iface.decodeFunctionResult(method, json.result)
			if (Array.isArray(value)) return value[0]
		} catch (error) {
		}
	}
	return null
}
export const loadExternal = (key:string, uri: string):Promise<boolean> => {
	if (key && key in window) return Promise.resolve(true)
	return new Promise(resolve=>{
		const script = document.createElement("script");
		script.src = uri
		script.async = true;
		script.onload = ()=>resolve(true)
		document.body.appendChild(script);
	})
}
export const fetchJson = async (uri: string, params?: RpcRequestType|RpcRequestType[]) => {
	try {
		if (params===undefined) {
			const response = await fetch(uri, {
				headers: {Accept: "application/json", "Content-Type": "application/json"},
			});
			return await response.json()
		} else {
			const response = await fetch(uri, {
				body: JSON.stringify(params),
				headers: {Accept: "application/json", "Content-Type": "application/json"},
				method: "POST"
			});
			return await response.json() as RpcResponseType|RpcResponseType[];	
		}
	} catch (error) {
		console.log(error)
	}
	return null
}
export const NF = (n:string|number)=>String(n).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
export const toDate = (timestamp: number) => {
	const d = new Date(timestamp * 1e3)
	return [d.getMonth() + 1, d.getDate()].join('/')
}
export const toKillo = (n: number) => {
	return (Number(n) < 1000 ? String(n) : `${~~(Number(n)/1000)}k`)
}
export const ellipsis = (address: string, start?: number) => {
	if (!address) return ''
	const len = start || 10
	return address.length > len ? `${address.slice(0, start || 10)}...${address.slice(-4)}` : address
}
export const now = ()=> Math.round(+new Date().getTime() / 1e3)
export const isSolcVersionText = (version: string)=> (/^v\d{1,2}\.\d{1,2}\.\d{1,2}\+commit\.[0-9a-f]{8}$/.test(version))

export const validateAddress = (address: string) => /^0x[a-f0-9A-F]{40}$/.test(address)
export const isHex = (hex: string) => /^0x[a-f0-9A-F]+$/.test(hex)
export const validateEmail = (email:string):boolean =>email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) !== null;
export const validateUsername = (username:string):boolean => /^[a-zA-Z0-9]{6,20}$/.test(username);


export const prettyFormat = (n:number, p: number=8)=>{
	const x = String(n.toFixed(p)).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",").split('.')
	return (
		<>
			<span>{x[0]}.</span>
			<span className='gray'>{x[1]}</span>
		</>
	)
}

export const prettyPrint = (elem: HTMLElement) => {
	loadExternal('PR', '/run_prettify.min.js').then(()=>window.PR.prettyPrint(null, elem))
}

const setDocumentCookie = () => {
	const cookie = uuidv4()
	document.cookie = `${config.appKey}=${cookie}; path=/; sameSite=true; expires=${new Date(+new Date() + 7 * 86400000).toUTCString()}`
	return cookie
}

export const copyToClipboard = (text:string) => {
	var textField = document.createElement('textarea')
	textField.innerText = text
	document.body.appendChild(textField)
	textField.select()
	document.execCommand('copy')
	textField.remove()
};

const getStore = (initialState:StoreObject) => {
	try {
		const buf = window.localStorage.getItem(config.appKey)
		if (buf) {
			const json = JSON.parse(buf)
			for(let k in json) {
				if (initialState[k] !== undefined) {
					initialState[k] = json[k]
				}
			}
		}
		initialState.loading = false
		if (initialState.cookie==='') {
			// const cookie = uuidv4()
			initialState.cookie = uuidv4()
		}
	} catch (err) {
		console.log(err)
	}
	return initialState
}



const setStore = (state:any) => {
	delete state.L;
	window.localStorage.setItem(config.appKey, JSON.stringify(state))
}

const initialState: StoreObject = {
	theme:			'',
	lang:			'en-US',
	cookie:			'',
	loading:		false,
	account:		null,
	// account: 		{uid: "ryh20412", username: "ryh20412", email: "felix44291@gmail.com", emailVerified: true, lastLogin: 123123, lastIp: "192.168.114.12"},	
	/*
	{
		token: 		'1234567',
		email: 		'felix@gmail.com'
	}
	*/
	tokenIcons:		{},
	verify:			null
}

export const slice = createSlice({
	name: 'store',
	initialState: getStore(initialState),
	reducers: {
		update: (state: any, action) => {
			for (const k in action.payload) {
				if (state[k] === undefined) new Error(`undefined store key ${k}`)
				state[k] = action.payload[k]
			}
			setStore(state)
		}
	}
})

const useStore = () => {
	const history = useHistory()
	const G = useSelector((state: StoreObject) => state)
	const L = locales[G.lang]
	const dispatch = useDispatch()
	const update = (payload:Partial<StoreObject>) => dispatch(slice.actions.update(payload))

	const {sendJsonMessage} = useWebSocket(config.apiServer + '/' + config.apiKey + ':' + (G.cookie || ''), {
		shouldReconnect: (closeEvent) => true,
		onOpen: (e: WebSocketEventMap['open']) => {
			console.log("socket connected")
		},
		onClose: (e: WebSocketEventMap['close']) => {
			console.log("socket disconnected")
		},
		onMessage: async (e: WebSocketEventMap['message']) => {
			try {
				if (typeof e.data==="string") {
					const { jsonrpc, id, result, error } = JSON.parse(decodeURI(e.data))
					if (jsonrpc==="2.0" && typeof fns[id]==="function") {
						await fns[id]({result, error})
					}
				}
			} catch (error) {
				
			}
		},
		onError: (e: WebSocketEventMap['error']) => {
			console.log("socket error")
		},
		reconnectAttempts: 1000,
		reconnectInterval: 5000,
		share: true
	})

	const getError = (code:number, args?:{[key:string]:string|number}|string|number) => T("error."+code, args)

	const T = (key:string, args?:{[key:string]:string|number}|string|number):string => {
		let text = L[key]
		if (text === undefined) throw new Error('Undefined lang key[' + key + ']')
		if (typeof args === 'string' || typeof args === 'number') {
			text = text.replace(/\{\w+\}/, String(args))
		} else if (args){
			for(let k in args) text = text.replace(new RegExp('{'+k+'}', 'g'), String(args[k]))
		}
		return text
	}

	const sendJson = (method:string, ...params:Array<any>):Promise<ServerResponse> => {
		return new Promise(resolve=>{
			const id = [+new Date(), Math.round(Math.random()*1e6)].join('')
			const timer = setTimeout(()=>{
				resolve({error:32001})
				delete fns[id]
			}, 60000)
			fns[id] = async (response) => {
				resolve(response)
				delete fns[id]
				clearTimeout(timer)
			}
			sendJsonMessage({
				jsonrpc: "2.0",
				method,
				params: params || [],
				id
			})
		})
	}

	const timeAgo = (time:number):string => {
		if (time < 1e12) time *= 1000
		return timeAgos[G.lang].format(time)
	}

	const setCookie = (extra?:Partial<StoreObject>) => {
		const cookie = setDocumentCookie()
		update({cookie, ...extra})
	}

	const logout = (extra?:Partial<StoreObject>) => {
		setCookie({account:null, ...extra})
		history.push('/')
	}

	const showLoading = (show: boolean) => update({loading: show})

	return {...G, T, timeAgo, update, sendJson, setCookie, getError, showLoading, logout};
}

export default useStore