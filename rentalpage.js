import React, { useState, useEffect } from 'react';

export default function Rental(){
    const [availableMovies, setAvailableMovies] = useState([]);
    const [customerInfos, setCustomerInfos] = useState([]);
    useEffect(() => {
        fetchMovies();
    
      }, []);
    
      const fetchMovies = async () => {
    
        const response = await fetch('/availableMovies');
        const result = await response.json();
        setAvailableMovies(result);
        console.log(result);
    
      }

      const rentToCustomer = async (e) => {
        e.preventDefault();
        const obj = e.target;
        setCustomerInfos([obj.inventory_id.value, obj.customer_id.value, obj.staff_id.value]);
        await fetch('/rentToCustomer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(customerInfos)
        }
    
        );
        console.log(customerInfos)
    
      }

      const returnedRent = async (e) => {
        e.preventDefault();
        const obj = e.target;
        setCustomerInfos([obj.inventory_id.value, obj.customer_id.value]);
        await fetch('/returnedRent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(customerInfos)
        }
    
        );
        console.log(customerInfos)
    
      }

return (
  <div className='rentalPage'> 
  <div>
    <div className='queryavailableMovies'>
    <h4 className='paragraph'>Inventory_id</h4>
      <h4 className='paragraph'>Title</h4>
      <h4 className='paragraph'>Movie_id</h4>
      
    </div>
    {availableMovies.map((item) => (
      <div key={item[0]} className='queryavailableMovies'>
        <p className='paragraph'>{item[0]}</p>
        <p className='paragraph'>{item[1]}</p>
        <p className='paragraph'>{item[2]}</p>
      </div>
    ))}
</div>
     <div>
        <form className='rentToCustomer' onSubmit={(e) => rentToCustomer(e)}>
          <h3> Rent a movie to a Customer</h3>         
          <input type='number' name='inventory_id' placeholder='inventory_id' />
          <input type='number' name='customer_id' placeholder='customer_id' />
          <input type='number' name='staff_id' placeholder='staff_id' />
          <button>Submit</button>
        </form>
        
        <form className='returnedRent' onSubmit={(e) => returnedRent(e)}>
          <h3> Return a Movie</h3>         
          <input type='number' name='inventory_id' placeholder='inventory_id' />
          <input type='number' name='customer_id' placeholder='customer_id' />
          <button>Submit</button>
        </form>
        </div>

  </div>
);

 
}