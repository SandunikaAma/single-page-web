import React, {useState, useEffect} from "react";

import axios from 'axios';

function OrderForm(){
    const [name, setName]=useState("");
    const [email,setEmail]=useState("");
    const [order_details,setOrderDetails]=useState("");
    const [msg,setMsg]=useState("");
    const [orders,setOrders]=useState([]);
    const [editingId,setEdditingId]=useState(null);

    const fetchOrders = ()=>{
        axios.get('http://15.207.114.235:3009/api/orders').then(res=>{
            setOrders(res.data);
        });

    };

    useEffect(()=>{
        fetchOrders();

    },[]);

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(editingId){
            axios.put(
                `http://15.207.114.235:3009/api/orders/update/${editingId}`,
                {name, email, order_details}
            ).then(()=>{
                setMsg("Order Updated!");
                resetForm();
                fetchOrders();
            });
        }else{
            axios.post(
                "http://15.207.114.235:3009/api/orders/add",
                {name, email, order_details}
            ).then(()=>{
                setMsg("Order added!");
                resetForm();
                fetchOrders();
            });
        }

    };
    const resetForm=()=>{
        setName("");
        setEmail("");
        setOrderDetails("");
        setEdditingId(null);
    };
    const handleEdit=(order)=>{
        setName(order.name);
        setEmail(order.email);
        setOrderDetails(order.order_details);
        setEdditingId(order.id);

    };
    const handleDelete=(id)=>{
        axios.delete(`http://15.207.114.235:3009/api/orders/delete/${id}`).then(()=>{
            setMsg("Order Deleted!");
            fetchOrders();
        });

    };
    return (
        <div className="order-form">
            <h2>{editingId ? "Update Order": "Place your order"}</h2>
            <p>{msg}</p>
            <form onSubmit={handleSubmit}>
            <input 
                 type="text"
                 placeholder="Your name"
                 value={name}
                 onChange={e=>setName(e.target.value)}
                 required/>
                 <br/>
            <input 
                 type="email"
                 placeholder="Your email"
                 value={email}
                 onChange={e=>setEmail(e.target.value)}
                 required/>
                 <br/>  
            <textarea 
                 type="text"
                 placeholder="Your order details"
                 value={order_details}
                 onChange={e=>setOrderDetails(e.target.value)}
                 required/>
                 <br/>  
            <button>Submit</button>           
            </form>
            <hr/>
            <h3>Your orders</h3>
            {
                orders.length ===0 ? (<p>You have no orders yet</p>): (
                    <ul>
                        {orders.map((o,id)=>{
                            <li key={id}>
                                <strong>o.name</strong>{o.email}<br/>
                                <em>{o.order_details}</em><br/>
                                <button onClick={()=>handleEdit(o)}>Edit</button>
                                <button onClick={()=>handleDelete(o.id)}>Delete</button>
                            </li>
                        })}
                    </ul>
                )

            }




        </div>
    );
}
export default OrderForm;