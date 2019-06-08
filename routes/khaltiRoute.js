const express = require("express");
const router = express.Router();
const mongo = require('../database/tbl_transaction');
const db = mongo.db;
const axios = require('axios');

router.post('/transaction', function(req, res){

    let data = {
        "token": (req.body.token),
        "amount": (req.body.amount)
    };

    let config = {
        headers: {'Authorization': 'Key test_secret_key_2ff879c83221405bad79b372e79b049f'}
    };
    
    axios.post("https://khalti.com/api/v2/payment/verify/", data, config)
        .then(response => {
            
            var verify_idx = response.data['idx'];//get the transaction_id after verification success response

            db.transaction.insert({
                'token': req.body.token,
                'amount': req.body.amount,
                'verification_idx': verify_idx
            });
        })
        .catch(error => {
            console.log(error);
        });

        res.json({
            'message': "transaction completed"
        });

});

router.get('/history', function(req, res){
    db.transaction.find({}, function(err, data){
        if(err){
            res.send('ssdfdsf');
        }else{
            res.send(data);
        }
    })
});

module.exports = router;