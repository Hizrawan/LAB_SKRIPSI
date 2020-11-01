class CartItem {
    constructor(quantity, productPrice, order_name, sum,order_code){
        this.quantity = quantity;
        this.productPrice = productPrice;
        this.productTitle = order_name;
        this.order_code = order_code;
        this.sum = sum;
    }
}

export default CartItem;