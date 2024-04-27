var express = require('express');
const db = require('../config/db');
var router = express.Router();

router.get('/', async function(req, res, next) {
  try {
    
    const result = await db.query(
        'select * from products'
    );

    res.status(200).json(result[0]);

  } 
  catch (error) {
    console.error(error);
    res.status(500).send({error: error});
  }
});

router.get('/:productId', async function(req, res, next) {
    const productId = req.params.productId;

    try {
        const result = await db.query(
            'select * from products where productId = ?', 
            [productId]
        );
    
        if(result[0][0].length === 0){
            res.status(404).send({message: "Produk tidak ada"});
        }

        res.status(200).send(result[0][0]);
    } 
    catch (error) {
        console.error(error);
        res.status(500).send({error: error});
    }
});

router.post('/', async function(req, res, next) {
    const { name, category, description, gender, price, size, stocks } = req.body;

    try {
        await db.query(
            'insert into products(name, category, description, gender, price, size, stocks) values (?, ?, ?, ?, ?, ?, ?)',
            [name, category, description, gender, price, size, stocks]
        );

        res.status(201).send({message: "Produk sukses ditambahkan"});
    } 
    catch (error) {
        console.error(error);
        res.status(500).send({error: error});    
    }
});

router.put('/:productId', async function(req, res, next) {
    const productId = req.params.productId;
    const { name, category, description, gender, price, size, stocks } = req.body;

    try {
        await db.query(
            'update products set name = ?, category = ?, description = ?, gender = ?, price = ?, size = ?, stocks = ? where productId = ?',
            [name, category, description, gender, price, size, stocks, productId]
        );

        res.status(201).send({message: "Produk berhasil terupdate"});
    } 
    catch (error) {
        console.error(error);
        res.status(500).send({error: error});
    }

});

router.delete('/:productId', async function(req, res, next) {
    const productId = req.params.productId;

    try {
        await db.query(
            'delete from products where productId = ?',
            [productId]
        );
        
        res.status(201).send({message: "Produk berhasil dihapus"});
    } 
    catch (error) {
        console.error(error);
        res.status(500).send({error: error});
    }
});

module.exports = router;
