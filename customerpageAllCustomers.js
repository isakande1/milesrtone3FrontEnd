import React, { useState, useEffect } from 'react';


export default function CustomerPageAll() {
  const [allCustomers, setAllCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [alldetailsCustomers, setalldetailsCustomers] = useState([]);

  useEffect(() => {
    fetchAllCustomers();

  }, []);

  const fetchAllCustomers = async () => {

    const response = await fetch('/queryAllCustomers');
    const result = await response.json();
    setAllCustomers(result);
    console.log(result);

  }

  const Click = async (customerID) => {
    const response = await fetch('/lCustomer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customerID)
    });
    const alldetailsJsonResult = await response.json();
    setalldetailsCustomers(alldetailsJsonResult);
    setSelectedCustomer(customerID);
    console.log(alldetailsCustomers);
  }

  return (

    <>

      <div className='queryRowsCustomers'> <h4 className='paragraph'>Customer_id</h4> <h4 className='paragraph'>Store_id</h4> <h4 className='paragraph'>first_name</h4> <h4 className='paragraph'>last_name</h4> <h4 className='paragraph'>email</h4><h4 className='paragraph'>address_id</h4> <h4 className='paragraph'>active</h4> <h4 className='paragraph'>create_date</h4><h4 className='paragraph'>last_update</h4></div>
      {allCustomers.map((item) => (
        <div key={item[0]}>
          <div className='queryRowsCustomers' onClick={() => Click(item[0])}>
            <p className='paragraph'>{item[0]}</p> <p className='paragraph'>{item[1]}</p> <p className='paragraph'>{item[2]}</p><p className='paragraph'>{item[3]}</p> <p className='paragraph'>{item[4]}</p> <p className='paragraph'>{item[5]}</p> <p className='paragraph'>{item[6]}</p> <p className='paragraph'>{item[7]}</p> <p className='paragraph'>{item[8]}</p>
          </div>

          {selectedCustomer == item[0] && <>
            <div className='queryRowsalldetails'> <h5 className='paragraph'>rental_id</h5> <h5 className='paragraph'>rental_date</h5> <h5 className='paragraph'>inventory_id </h5> <h5 className='paragraph'>customer_id</h5> <h5 className='paragraph'>return_date</h5>  <h5 className='paragraph'>staff_id</h5>  <h5 className='paragraph'>last_update</h5> </div>
            {alldetailsCustomers.map((alldetails) => (
              <div className='queryRowsalldetails' key={alldetails[0]}> <p className='paragraphalldetails'>{alldetails[0]}</p><p className='paragraphalldetails'>{alldetails[1]}</p><p className='paragraphalldetails'>{alldetails[2]}</p> <p className='paragraphalldetails'>{alldetails[3]}</p> <p className='paragraphalldetails'>{alldetails[4]}</p> <p className='paragraphalldetails'>{alldetails[5]}</p> <p className='paragraphalldetails'>{alldetails[6]}</p></div>
            ))} </>}

        </div>
      ))}
     </>

  );

}