import React, { useEffect, useRef, useState } from 'react';
import { useCartDispatch, useCartState } from './ContextReducer';

export default function Card(props) {
    let data = useCartState();
    let dispatch = useCartDispatch();
    let options = props.options || {};
    let priceOptions = Object.keys(options);
    const priceref = useRef();
    let [qty, setQty] = useState(1);
    let [size, setSize] = useState('');

    useEffect(() => {
        setSize(priceref.current.value);
    }, []);

    let finalPrice = qty * parseInt(options[size]);

    let handleAddToCart = async () => {
        let food=[];
        for(const item of data){
            if(item.id===props.foodItem._id){
                food=item;
                break;
            }
        }
        if(food!==[]){
            if(food.size===size){
                await dispatch({type:'UPDATE',id:props.foodItem._id,price:finalPrice,qty:qty});
                return;
            }
            await dispatch({
                type: "ADD",
                id: props.foodItem._id,
                name: props.foodItem.name,
                price: finalPrice,
                qty: qty,
                size: size
            });
            return ;
        }
        await dispatch({
            type: "ADD",
            id: props.foodItem._id,
            name: props.foodItem.name,
            price: finalPrice,
            qty: qty,
            size: size
        });
    };

    // Log the updated cart state whenever it changes
    useEffect(() => {
        console.log(data);
    }, [data]);

    // Style for the image
    const imgStyle = {
        height: '120px',  // Set a maximum height for the image
        width: 'auto',
        objectFit: 'fill'  // Maintain aspect ratio
    };

    return (
        <div>
            <div className="card mt-3 ms-3" style={{ width: "18rem" }}>
                <img className="card-img-top" src={props.foodItem.img} alt="Card cap" style={imgStyle} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className='container w-100'>
                        <select className='m-2 h-100 bg-success rounded' onChange={(e) => { setQty(e.target.value) }}>
                            {
                                Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={(i + 1)} value={(i + 1)}>{i + 1}</option>
                                    );
                                })
                            }
                        </select>
                        <select className='m-2 h-100 bg-success rounded' ref={priceref} onChange={(e) => { setSize(e.target.value) }}>
                            {
                                priceOptions.map(data => {
                                    return <option key={data} value={data}>{data}</option>;
                                })
                            }
                        </select>
                        <div className='d-inline'>
                        ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr />
                    <button className='btn btn-success justify-content-center ms-2' onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}