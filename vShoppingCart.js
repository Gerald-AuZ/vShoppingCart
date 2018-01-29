(function (document, window) {
    'use strict';

    const _this = {
        shoppingCart: JSON.parse(localStorage.getItem('vShoppingCart')) || {
            count: 0,
            total: 0,
            items: []
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
            if (!item.count)
                throw 'Item must have a count';

            var _item = {
                id: item.id,
                name: item.name,
                price: item.price,
                discount: item.discount || 0.0,
                count: item.count,
                plusOne: function () {
                    this.count++;
                },
                subtractOne: function () {
                    if (this.count > 1)
                        this.count--;
                }
            };
            _this.shoppingCart.items.push(_item);
            _this.shoppingCart.count++;
            localStorage.setItem("vShoppingCart", JSON.stringify(_this.shoppingCart));
        }
    };

    window.vShoppingCart = vShoppingCart;

})(document, window);