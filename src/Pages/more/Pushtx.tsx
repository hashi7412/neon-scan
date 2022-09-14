import React from 'react';
import useStore, { isHex } from '../../useStore';

const Pushtx = () => {
    const {sendJson, getError, showLoading} = useStore()
    const [raw, setRaw] = React.useState('')
    const [txId, setTxId] = React.useState('')
    const [error, setError] = React.useState('')

    const submit = async () => {
        if (raw!=='' && isHex(raw) && (raw.length % 2)===0) {
            showLoading(true)
            try {
                setError('')
                setTxId('')
                const {result, error} = await sendJson('send-transaction', raw)
                if (result) {
                    if (result.txId) {
                        setTxId(result.txId)    
                    } else {
                        setError(getError(10203, result.error))
                    }
                } else if (error) {
                    setError(getError(error))
                }
            } catch (error) {
                console.log(error)
            }
            showLoading(false)
        }
    }

    return (
        <div className='pushtx'>
            <section className='container'>
                <h3>Broadcast Raw Transaction</h3>
                <hr />
                <p>This page allows you to paste a Signed Raw Transaction in hex format (i.e. characters 0-9, a-f) and broadcast it over the Fantom network.</p><br />
                <div className='form'>
                    {txId!=='' && <div className='success'>{txId}</div>}
                    {error!=='' && <div className='error' dangerouslySetInnerHTML={{__html: error}} />}
                    <textarea className='input input-block' rows={15} placeholder="Enter signed transaction hex (hex)" value={raw} onChange={e => setRaw(e.target.value)} />
                    <div className='text-right'>
                        <button disabled={raw==='' || !isHex(raw) || (raw.length % 2)!==0} className='btn btn-primary' onClick={submit}>Send Transaction</button>
                    </div>
                </div>
            </section>
        </div >
    )
};

export default Pushtx;