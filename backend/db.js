const mysql= require('mysql2');

const connection= mysql.createConnection({
    host:'mysql',
    user:'root',
    password:'SANdatabase7$$',
    database:'orders_db'
});

connection.connect(err=>{
    if(err) throw err;
    console.log('Connected to mysql');
});

module.exports= connection;