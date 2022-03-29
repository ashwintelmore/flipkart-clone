const Cart = require("../models/cart")

exports.addItemtocart = (req, res) => {

    // //console.log(req.user);
    // //console.log(req.body.product);
    // //console.log(req.body.quantity);
    // //console.log(req.body.cartItems);

    Cart.findOne({
        user: req.user._id
    }).exec((err, cart) => {
        if (err) {
            return res.status(400).json({
                err
            })
        } else {
            // //console.log(cart);
            if (cart) {
                //  if cart added to the collection then i want only increase quantitu of product
                const product = req.body.cartItems.product;
                const item = cart.cartItems.find(c => c.product == product); // find return only finded item

                let condition, updates;
                if (item) {
                    condition = {
                        "user": req.user._id,
                        "cartItems.product": product
                    };
                    updates = {
                        "$set": { //double quatation bcoz it is a mongoDB oprator
                            "cartItems.$": { // '$' is IMP
                                ...req.body.cartItems, //... for previous array item
                                quantity: item.quantity + req.body.cartItems.quantity
                            }
                        }
                    };

                } else {
                    condition = {
                        user: req.user._id
                    };
                    updates = {
                        "$push": { //double quation bcoz it is a mongoDB oprator
                            "cartItems": req.body.cartItems
                        }
                    };
                }
                Cart.findOneAndUpdate(condition, updates, (err, _cart) => { //findOneAndUpdate or UpdateOne(for more ckeck mongoose model documents)
                    if (err) return res.status(400).json({
                        err
                    });
                    if (_cart) {
                        return res.status(200).json({
                            cart: _cart
                        })
                    }
                })

            } else {
                // if there is no cart availabele then create the cart
                const cartItem = new Cart({
                    user: req.user._id,
                    cartItems: [req.body.cartItems]
                })
                cartItem.save((err, items) => {
                    if (err) {
                        return res.status(400).json({
                            err
                        })
                    } else {
                        res.status(200).json({
                            items
                        })
                    }
                })
            }
        }
    })
}
// res.json({
//     massege : "Cart"
// })