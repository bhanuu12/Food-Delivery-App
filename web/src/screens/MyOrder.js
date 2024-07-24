import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState(null);

    const fetchMyOrder = async () => {
        const response = await fetch("http://localhost:4000/api/myOrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        });
        const data = await response.json();
        setOrderData(data.orderData);
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <NavBar />
            <div className='container'>
                <div className='row'>
                    {orderData ? orderData.order_data.slice(0).reverse().map((data, index) => (
                        <div key={index}>
                            {data.map((item, idx) => (
                                <div key={idx}>
                                    {item.Order_date ? (
                                        <div className='m-auto mt-5'>
                                            {item.Order_date}
                                            <hr />
                                        </div>
                                    ) : (
                                        <div className='col-12 col-md-6 col-lg-3'>
                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                <img src={item.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.name}</h5>
                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                        <span className='m-1'>{item.qty}</span>
                                                        <span className='m-1'>{item.size}</span>
                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5'>
                                                            ₹{item.price}/-
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )) : "Loading..."}
                </div>
            </div>
            <Footer />
        </div>
    );
}
