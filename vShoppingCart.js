/* 
*   Vanilla JavaScript Shopping Cart (vShoppingCart) v0.1.0 
*   Author: Gerald Aburto <https://github.com/Gerald-AuZ>
*   Repository: https://github.com/Gerald-AuZ/vShoppingCart
*   License: MIT
*/
(function (document, window) {
    'use strict';

    let _this = {
        shoppingCart: JSON.parse(localStorage.getItem('vShoppingCart')) || {
            count: 0,
            total: 0,
            items: []
        },
        updateCart: function () {
            localStorage.setItem("vShoppingCart", JSON.stringify(this.shoppingCart));
            vShoppingCart.subscribe();
        }
    };

    const vShoppingCart = {
        getAll: function () {
            return _this.shoppingCart.items;
        },
        add: function (item) {
            if (!item)
                throw 'Can\'t add null item.';
            if (Object.keys(item).length === 0)
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
                image: item.image
            };
            _this.shoppingCart.items.push(_item);
            _this.shoppingCart.count++;
            _this.shoppingCart.total += (_item.price - _item.discount);
            _this.updateCart();
        },
        plusOne: function (id) {
            let find = _this.shoppingCart.items.find((item) => { return item.id == id; });
            find.quantity++;
            _this.shoppingCart.total += (find.price - find.discount);
            _this.updateCart();
        },
        subtractOne: function (id) {
            let find = _this.shoppingCart.items.find((item) => { return item.id == id; });
            if (find.quantity == 1) return;
            find.quantity--;
            _this.shoppingCart.total -= (find.price - find.discount);
            _this.updateCart();
        },
        removeFromCart: function (id) {
            let find = _this.shoppingCart.items.find((item) => { return item.id == id; });
            let index = _this.shoppingCart.items.indexOf(find);
            _this.shoppingCart.items.splice(index, 1);
            _this.shoppingCart.count--;
            _this.shoppingCart.total -= (find.price * find.quantity);
            _this.updateCart();
        },
        clean: function () {
            localStorage.setItem("vShoppingCart", JSON.stringify({
                count: 0,
                total: 0,
                items: []
            }));
        },
        count: function () {
            return _this.shoppingCart.count;
        },
        total: function () {
            return _this.shoppingCart.total;
        },
        subscribe: function () {

        }
    };

    window.vShoppingCart = vShoppingCart;

})(document, window);
