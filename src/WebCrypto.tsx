interface WebCrypto {
	iv: 		Uint8Array
	secretkey: 	CryptoKey
	privkey:	CryptoKey
	pubkey:		CryptoKey
}

class WebCrypto {
	ALGORITHM_RSASSA:RsaHashedKeyGenParams | EcKeyGenParams | EcKeyGenParams = {
		name: "RSASSA-PKCS1-v1_5",
		hash: {name: "SHA-256"},
		modulusLength: 2048,
		publicExponent: new Uint8Array([1, 0, 1])
	};
	ALGORITHM_AES:AesKeyGenParams | HmacKeyGenParams | Pbkdf2Params = {
		name: "AES-CBC",
		length: 256
	};
	Buf2B64 (buf:ArrayBuffer):string {
		var uarr = new Uint8Array(buf);
		var strings = [] as string[];
		let chunksize = 0xffff;
		for (var i=0; i*chunksize < uarr.length; i++){
			let array = uarr.subarray(i*chunksize, (i+1)*chunksize);
			const s = String.fromCharCode.apply(null, Array.from(array))
			strings.push(s);
		}
		return btoa(strings.join(''));
	}
	B642Buf (b64:string):Uint8Array {
		return Uint8Array.from(atob(b64), c => c.charCodeAt(0))
	}
	Bin2Pem (buf:ArrayBuffer, label:string):string {
		return "-----BEGIN RSA " + label + " KEY-----\r\n"+(this.Buf2B64(buf).match(/(.{1,64})/g) || []).join('\r\n')+"\r\n-----END RSA " + label + " KEY-----\r\n";
	};
	Pem2Bin (pem:string):Uint8Array {
		return this.B642Buf(pem.replace(/-{5}[^-]+-{5}|\r\n?|\n/g,''));
	};
	static create():WebCrypto|null {
		if (window.crypto && window.crypto.subtle) return new WebCrypto()
		return null
	}
	static async hash (message:string):Promise<string> {
		var buf = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(message.toString()));
		return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
	}
	async aesCreateWithKey(key:string,secret:string):Promise<boolean> {
		this.secretkey = await window.crypto.subtle.importKey("jwk", {kty:"oct",alg:"A256CBC",k:key,key_ops:["encrypt","decrypt"],ext:true}, {name: "AES-CBC",length: 256}, true, ["encrypt", "decrypt"]);
		this.iv = new TextEncoder().encode(secret.slice(0,16));
		return true;
	}
	async encode (p:string):Promise<string> {
		const buf = await window.crypto.subtle.encrypt({name: "AES-CBC",iv:this.iv},this.secretkey, new TextEncoder().encode(p));
		return this.Buf2B64(buf);
	}
	async decode (e:string):Promise<string|null> {
		try {
			const buf = await window.crypto.subtle.decrypt({name: "AES-CBC",iv:this.iv},this.secretkey, this.B642Buf(e));
			return new TextDecoder().decode(buf);
		} catch (err) {
			return null;
		}
	}
	async rsaCreate():Promise<boolean> {
		const { privateKey, publicKey } = await window.crypto.subtle.generateKey(this.ALGORITHM_RSASSA, true, ["sign", "verify"]);
        if (privateKey && publicKey) {
            this.privkey = privateKey;
            this.pubkey = publicKey;
            return true;
        }
		return false
	}
	async rsaCreateWithPubKey(pem:string):Promise<boolean> {
		this.pubkey = await window.crypto.subtle.importKey("spki", this.Pem2Bin(pem), this.ALGORITHM_RSASSA, true, ["verify"]);
		return true;
	}
	async rsaCreateWithPrivKey(pem:string):Promise<boolean> {
		this.privkey = await window.crypto.subtle.importKey("pkcs8", this.Pem2Bin(pem), this.ALGORITHM_RSASSA, true, ["sign"]);
		return true;
	}
	async rsaExportPubKey():Promise<string> {
		return this.Bin2Pem(await window.crypto.subtle.exportKey('spki', this.pubkey), "PUBLIC");
	}
	async rsaExportPrivKey():Promise<string> {
		return this.Bin2Pem(await window.crypto.subtle.exportKey('pkcs8', this.privkey), "PRIVATE");
	}
	async sign (p:string):Promise<string> {
		return this.Buf2B64(await window.crypto.subtle.sign(this.ALGORITHM_RSASSA, this.privkey, new TextEncoder().encode(p)));
	}
	async verify(sig:Uint8Array,p:string):Promise<boolean> {
		try {
			return await window.crypto.subtle.verify(this.ALGORITHM_RSASSA, this.pubkey, sig, new TextEncoder().encode(p))
		} catch (err) {
			return false;
		}
	}
}

export default WebCrypto