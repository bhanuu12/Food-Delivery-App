import React from 'react';
import trash from '../images/trash.png';
import { useCartDispatch, useCartState } from '../components/ContextReducer';

export default function Cart() {
  let data = useCartState();
  let dispatch = useCartDispatch();

  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>
          The Cart Is Empty
        </div>
      </div>
    );
  }
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem('userEmail');
    let response = await fetch('http://localhost:4000/api/orderData', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body:JSON.stringify({
        order_data:data,
        order_date:new Date().toDateString(),
        email:userEmail
      })
      
    });
    if(response.status===200){
      dispatch({type:'DROP'});
    }

  }
  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0" onClick={() => dispatch({ type: "REMOVE", index: index })}>
                    <img src={trash} alt="Delete" style={{ width: '20px', height: '20px' }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
        </div>
      </div>
    </div>
  );
}