import React from "react"
import { useParams } from "react-router-dom"
import Actions from "../../components/Actions"
import Icon from "../../components/Icon"

import "./verifysig.scss"

const info = {
    address:        "0x624d7b7cc32611e616bb52d192aed326303fad85",
    msg:            "Shisutā-Kawaii#2138;whitweddn;5CJJVYSio6mKDJECvVH7o9f3a5po7JrxbaK2AcNPB1RgNPdL;",
    signHash:       "0xb7a806c06298f4a6ba9727a16a1b6a1fb976936a89680ffce7262f604e260eee7fcdc6a260f2d83b29c891807722a4dce732605addbefb5bff89c5009083d5471c"
}

const VerifySig = () => {
    const params = useParams()
	const id = params["id"]

    return (
        <div className="verify-sig">
            <section className="container">
                <h3>Message Signature #{id}</h3>
                <div className="panel">
                    <div className="panel-content">
                        <div className="msg-info d-middle"><Icon icon="Check" />Message Signature Verified</div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="address">Address<Actions.Copy text={info.address} /></label>
                        <input type="text" className="input input-block" id="address" value={info.address} readOnly />
                    </div>
                    <div className="input-field">
                        <label htmlFor="address">Address<Actions.Copy text={info.msg} /></label>
                        <textarea className="input input-block" id="address" value={info.msg} readOnly />
                    </div>
                    <div className="input-field">
                        <label htmlFor="signHash">Signature Hash<Actions.Copy text={info.signHash} /></label>
                        <textarea className="input input-block" id="signHash" value={info.signHash} readOnly />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default VerifySig