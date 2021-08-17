import './faq.css';

export const Faq = () => {
    return(
        <div className='faq'>
            <h1>FREQUENTLY ASKED QUESTIONS</h1>
            <h3>What are the accepted payment methods?</h3>
            <p> MercadoPago: secure payment by account or credit card.</p>
            <h3>When will I recive my order?</h3>
            <p> The delivery time, merely indicative, is about 5 days
                business days from the date of payment of the order and 10 business days
                for custom items, plus times may vary by
                force majeure or due to traffic and road conditions.
                In general or by act of the Authorities.</p>
            <h3>What are the shipping methods?</h3>
            <p>The delivery, unless otherwise agreed in writing between the parties, 
                will be made during office hours: from 8.30 to 12.30; from 15.30 
                to 19.30, every day, except holidays, from Monday to Friday.</p>
        </div>
    )
}

export default Faq;