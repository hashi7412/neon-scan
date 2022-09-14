import nopageimg from '../assets/nopage.webp';

const NoPage = () => {
    return (
        <section className='container'>
            <div className='nopage' style={{ marginBottom: "100px" }}>
                <img width="50%" src={nopageimg} alt="404"></img>
            </div>
        </section >
    )
};

export default NoPage;