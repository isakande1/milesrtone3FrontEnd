import React, { useState, useEffect } from 'react';
import {
   Link
} from "react-router-dom";

export default function SearchCustomer() {
  const [queryResult, setQueryResult] = useState([]);
  const [itemSearched, setItemSearched] = useState("");
  const [option, setOption] = useState(0);
  const [toDel, setToDel] = useState("");
  const [customerInfos, setCustomerInfos] = useState([]);
  const [updateInfos, setUpdateInfos] = useState([]);



  useEffect(() => {
    fetchData();

    console.log(queryResult);
  }, []);
  const fetchData = async () => {
    const response = await fetch('/chCustomer');
    const result = await response.json();
    setQueryResult(result);
  }



  const deleteUser = async (e) => {
    e.preventDefault();
    setToDel(e.target.id.value);
    await fetch('/erase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toDel)

    });
    console.log(toDel);
  }
  const updateCustomer = async (e) => {
    e.preventDefault();
    const obj = e.target;
    setUpdateInfos([obj.store_id.value, obj.first_name.value, obj.last_name.value, obj.email.value, obj.address_id.value, obj.active.value, obj.id.value]);
    await fetch('/updateCustomer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateInfos)
    }

    );
    console.log(updateInfos)

  }
  const addCustomer = async (e) => {
    e.preventDefault();
    const obj = e.target;
    setCustomerInfos([obj.first_name.value, obj.last_name.value, obj.email.value, obj.address_id.value, obj.active.value, obj.store_id.value]);
    await fetch('/omer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customerInfos)
    }

    );
    console.log(customerInfos)

  }
  const fileterdItems = queryResult.filter(item => item[option].toString().includes(itemSearched));
  return (
    <>
      <div className='optionSearch'>
        <div className='search'>
          <label>Search</label>
          <input type="text" onChange={e => setItemSearched(e.target.value)} />
          <ul>
            {itemSearched != "" && fileterdItems.map(value => <p>{value[1]}  {value[2]}</p>)}
          </ul>
        </div>
        <div>
          <input type='radio' name="option" value='0' onChange={e => setOption(Number(e.target.value))} />Customer_id
          <input type='radio' name='option' value='1' onChange={e => setOption(Number(e.target.value))} />firstName
          <input type='radio' name='option' value='2' onChange={e => setOption(Number(e.target.value))} />lastName

        </div>
      </div>

      <div>

        <form onSubmit={(e) => deleteUser(e)}>
          <input type='text' name='id' placeholder='Enter id of customer to delete' />
          <button>Submit</button>
        </form>

        <button className='listAllCustomers' > <Link to='/customerpageAllCustomers'>List All Customers </Link></button>

        <button className='listAllCustomers' > <Link to='/rentalpage'>Rental Page </Link></button>
        
        <form className='customerForm' onSubmit={(e) => addCustomer(e)}>
          <h3>Add a new Customer</h3>
          <input type='number' name='store_id' placeholder='store_id' />
          <input type='text' name='first_name' placeholder='first_name' />
          <input type='text' name='last_name' placeholder='last_name' />
          <input type='email' name='email' placeholder='email' />
          <input type='number' name='address_id' placeholder='address_id' />
          <input type='number' name='active' placeholder='active' />
          <button>Submit</button>
        </form>
        <form className='customerForm' onSubmit={(e) => updateCustomer(e)}>
          <h3>Update a customer details</h3>
          <input type='number' name='id' placeholder='customer_id' />
          <input type='number' name='store_id' placeholder='store_id' />
          <input type='text' name='first_name' placeholder='first_name' />
          <input type='text' name='last_name' placeholder='last_name' />
          <input type='email' name='email' placeholder='email' />
          <input type='number' name='address_id' placeholder='address_id' />
          <input type='number' name='active' placeholder='active' />
          <button>Submit</button>
        </form>
      </div>
    </>
  );

}

