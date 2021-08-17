import { useState } from 'react';
import {IoIosArrowDropdown} from 'react-icons/io'
import './faq.css';


export const Faq = () => {
    const [questCollapsed1, setQuestCollapsed1] = useState(true);
  function toggleQuestion1() {
    setQuestCollapsed1(!questCollapsed1);
  };
  const [questCollapsed2, setQuestCollapsed2] = useState(true);
  function toggleQuestion2() {
    setQuestCollapsed2(!questCollapsed2);
  };
  const [questCollapsed3, setQuestCollapsed3] = useState(true);
  function toggleQuestion3() {
    setQuestCollapsed3(!questCollapsed3);
  };
  const [questCollapsed4, setQuestCollapsed4] = useState(true);
  function toggleQuestion4() {
    setQuestCollapsed4(!questCollapsed4);
  };
    return(
        <div className='faq'>
            <h1>FREQUENTLY ASKED QUESTIONS</h1>

            <div className='container-questions'>
            <span className='btn-quest' onClick={toggleQuestion1}> How do I buy? <IoIosArrowDropdown/></span>
           
            <div className={`quest ${questCollapsed1 && "collapsedQ"}`}>     

                <p>1. Choose the products. You can search for products from "Home". Once you have entered the product grid,
                You can filter the search by brand, gender, discipline, etc. from the left side menu.
                If you are looking for a particular product, you can enter the name in the main search engine found
                just above the product grid.</p>

                <p>2. Select what you want and add it to your cart. Click on the product you want to buy.
                Press the "Add to cart" button. You can add more products to the purchase or click on the cart button
                in the upper right sector to view and / or finalize your purchase.</p>

                <p>3. Your cart: Once in the cart, check that the products that are there are the ones you chose (you can add more items if you wish) and
                go to checkout by pressing the "Confirm Payment" button.</p>

                <p>4. Billing information. Finally, you must complete the information that we are going to request to make your payment.</p>

                <p>And ready! Now it only remains to wait for your order to arrive.</p>
        </div>
        <span className='btn-quest' onClick={toggleQuestion2}> What are the payment methods? <IoIosArrowDropdown/></span>
           
            <div className={`quest ${questCollapsed2 && "collapsedQ"}`}>
                <p> MercadoPago: secure payment by account or credit card.</p>
                <p>We comply with the international data protection standard,
                so that your personal and credit card information is protected from unauthorized access.
                </p>
                </div>
                <span className='btn-quest' onClick={toggleQuestion3}>When will I recive my order? <IoIosArrowDropdown/></span>
           
           <div className={`quest ${questCollapsed3 && "collapsedQ"}`}>     

                <p> The delivery time, merely indicative, is about 5 days business from the date of payment of the order 
                    and 10 business days for custom items.</p> 
                <p>The times may vary by cases force majeure or due to traffic and road conditions in general 
                    or by act of the Authorities.</p>
            </div>
            <span className='btn-quest' onClick={toggleQuestion4}> What are the shipping methods? <IoIosArrowDropdown/></span>
           
            <div className={`quest ${questCollapsed4 && "collapsedQ"}`}> 
                <p>The delivery, unless otherwise agreed in writing between the parties, 
                    will be made during office hours:</p> <p>from 8.30 to 12.30; from 15.30 
                    to 19.30, every day, except holidays, from Monday to Friday.</p>
            </div>
            </div>
        </div>
    )
}

export default Faq;

/* 
import { Collapse } from 'antd';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

ReactDOM.render(
  <Collapse accordion>
    <Panel header="This is panel header 1" key="1">
      <p>{text}</p>
    </Panel>
    <Panel header="This is panel header 2" key="2">
      <p>{text}</p>
    </Panel>
    <Panel header="This is panel header 3" key="3">
      <p>{text}</p>
    </Panel>
  </Collapse>,
  mountNode,
); */