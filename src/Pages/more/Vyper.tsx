import React from 'react';
import { Link } from 'react-router-dom';

interface VyperStatus {
    version: string
    sourcecode: string
}

const Vyper = () => {
    const [status, setStatus] = React.useState<VyperStatus>({
        version: "",
        sourcecode: ""
    });

    return (
        <div className='vyper'>
            <section className='container'>
                <h3>Vyper Online Compiler (Experimental)</h3>
                <hr />
                <p>Compiles Vyper source code and outputs the ABI, ByteCode and Runtime Bytecode</p><br />
                <form className='form'>
                    <div className="input-field">
                        <label>[Step 1] Select Compiler Version</label>
                        <div className='col6'>
                            <select name="version" id="version" className="input input-block" onChange={(e) => setStatus({ ...status, version: e.target.value })} value={status.version}>
                                <option value={0}>[Please Select]</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                            </select>
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="">[Step 2] Enter Source Code Below</label>
                        <textarea className='input input-block' rows={15} placeholder="Please enter Source Code" onChange={(e) => setStatus({ ...status, sourcecode: e.target.value })}>{status.sourcecode}</textarea><br />
                    </div>
                    <p>Tip: Try compiling the sample <Link to="/">Prysmaticlabs Contract</Link> (for vyper version 0.1.0b7)</p>
                    <div className='text-right'>
                        <button type='submit' className='btn btn-primary'>Compiler Vyper</button>
                        <button type='reset' className='btn btn-primary'>Reset</button>
                    </div>
                </form>
                <div className='panel'>
                    <div className="panel-header">
                        <h4>Decode Bytecode:</h4>
                    </div>
                    <div className="panel-content grid-col">
                        <div>[0]LOG1</div>
                    </div>
                </div><br />
            </section>
        </div >
    )
};

export default Vyper;