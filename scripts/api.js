let insertProductToBasket = async function (basketElement) {
    const res = await fetch('http://api-product-list/create', {
        method: 'POST',
        body: JSON.stringify(basketElement),
    });
    //return await res.json();
};

let getProductFromBasket = async function () {
    const res = await fetch('http://api-product-list/product');
    return await res.json();
};

let deleteProductFromBasket = async function (id) {
    const res = await fetch('http://api-product-list/delete', {
        method: 'POST',
        body: JSON.stringify(id),
    });
    //return await res.json();
};

export {insertProductToBasket, getProductFromBasket, deleteProductFromBasket};