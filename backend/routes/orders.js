const express =require('express');
const router= express.Router();
const db= require('../db');

// create
router.post('/add', (req,res)=>{
    const {name, email, order_details}=req.body;
    db.query(
        "INSERT INTO orders (name, email, order_details) VALUES (?,?,?)",
        [name, email, order_details],
        (err, result)=>{
            if(err) return res.status(500).send(err);
            res.send({msg:"Order added successfully", id:result.insertId});

        }
    );
});
//read all
router.get('/',(req,res)=>{
    db.query(
        "SELECT * FROM orders",
        (err,result)=>{
            if(err) return res.status(500).send(err);
            res.json(result);
        }

    );
});

//update
router.put('/update:id',(req,res)=>{
    const {id}=req.params;
    const {name, email,order_details}=req.body;
    db.query(
        "UPDATE orders SET name=? email=? order_details=?  WHERE id=?",
        [name, email, order_details, id],
        (err, result)=>{
            if(err) return res.status(500).send(err);
            res.send({msg:"Order updated"});
        }

    );

}

);

// delete
router.delete('/delete/:id', (req, res)=>{
    db.query(
        "DELETE FROM orders WHERE id=?",
        [req.params.id],
        (err)=>{
            if(err) return res.status(500).send(err);
            res.send({msg:"Orders deleted"});
        }
    );
});

module.exports=router;