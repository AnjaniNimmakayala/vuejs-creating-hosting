import express from 'express';
import { cartItems as cartItemsRaw, products as productItemsRaw} from './temp-data';

let cartItems = cartItemsRaw;
let products = productItemsRaw;

const app = express();
app.use(express.json);

app.get('/hello', (req, res) => {
    res.send("Hello!");
});

function populateCartIds (ids) {
    return ids.map(id => products.find(product => product.id === id))
}

app.get('/products', (req, res) => {
    // res.json(products);
    const populatedCart = populateCartIds(cartItems);
    res.json(populatedCart);
});

app.get('/cart', (req, res) => {
    res.json(cartItems);
});

app.get('/products/:productId', (req, res) => {
    const productId = req.params.productId;
    const product = products.find(product => product.id === productId);
    res.json(product);
});

app.post('/cart', (req, res) => {
    const productId = req.body.id;
    // const product = products.find(product => product.id === productId);
    // cartItems.push(product);
    // res.json(cartItems);
    cartItems.push(productId);
    const populatedCart = populateCartIds(cartItems);
    res.json(populatedCart);
});

app.delete('/cart/:productId', (req, res) => {
    const productId = req.params.id;
    // cartItems = cartItems.filter(product => product.id !== productId);
    cartItems = cartItems.filter(id => id !== productId);
    const populatedCart = populateCartIds(cartItems);
    // res.json(cartItems);
    res.json(populatedCart);
});

app.listen(8000, () =>{
    console.log('Server is listening on port 8000');
});