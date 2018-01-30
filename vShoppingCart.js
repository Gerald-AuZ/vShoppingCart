/* 
*   Vanilla JavaScript Shopping Cart (vShoppingCart) v0.1.0 
*   Author: Gerald Aburto <https://github.com/Gerald-AuZ>
*   Repository: https://github.com/Gerald-AuZ/vShoppingCart
*   License: MIT
*/
(function (document, window) { 'use strict';

    let _this = {
        shoppingCart: JSON.parse(localStorage.getItem('vShoppingCart')) || {
            count: 0,
            total: 0,
            items: []
        },
        updateCart: function () {
            localStorage.setItem("vShoppingCart", JSON.stringify(this.shoppingCart));
        }
    };

    const vShoppingCart = {
        getAll: function () {
            return _this.shoppingCart.items;
        },
        add: function (item) {
            if (!item)
                throw 'Can\'t add null item.';
            if (Object.keys(item).length == 0)
                throw 'Can\'t add an empty item.';
            if (!item.id)
                throw 'Item must have an id.';
            if (!item.name)
                throw 'Item must have a name.';
            if (!item.price)
                throw 'Item must have a price.';
            if (!item.quantity)
                throw 'Item must have a count';
            if (!item.image)
                throw 'Item must have an image';

            var _item = {
                id: item.id,
                name: item.name,
                price: item.price,
                discount: item.discount || 0.0,
                quantity: item.quantity,
                image: item.image,
                plusOne: function () {
                    this.quantity++;
                    _this.shoppingCart.total += (this.price - this.discount);
                    _this.updateCart();
                },
                subtractOne: function () {
                    if (this.quantity == 1) return;
                    this.quantity--;
                    _this.shoppingCart.total -= (this.price - this.discount);
                    _this.updateCart();
                },
                removeFromCart: function () {
                    let index = _this.shoppingCart.items.indexOf(this);
                    _this.shoppingCart.items.splice(index, 1);
                    _this.updateCart();
                }
            };
            _this.shoppingCart.items.push(_item);
            _this.shoppingCart.count++;
            _this.shoppingCart.total += (_this.price - _this.discount);
            _this.updateCart();
        },
        count: _this.shoppingCart.count,
        clean: function () {
            localStorage.setItem("vShoppingCart", JSON.stringify({
                count: 0,
                total: 0,
                items: []
            }));
        }
    };

    window.vShoppingCart = vShoppingCart;

})(document, window);