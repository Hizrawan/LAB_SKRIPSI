import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        try {

            // any async code here
            const response = await fetch(`http://localhost:3000/order/getorder`);

            if( !response.ok ) {
                throw new Error('Something went wrong!');
            }
            
            const resData = await response.json();
            const loadedOrders = [];
            console.log("iniresdatairder",resData);
            for( const key in resData) {
                loadedOrders.push(
                    new Order(
                        key,
                        resData[key].order_cd,
                        resData[key].total_price,
                        new Date()
                    )
                );
            }
            
            console.log("1dskfmdslfm",loadedOrders);
            dispatch({ type: SET_ORDERS, orders: loadedOrders });

        }catch (err) {
            throw err;
        }       
    };
};

export const addOrder = (order_code, quantity, price) => {
console.log("masuk dispathc",order_code,quantity,price)
    return async (dispatch, getState) => {

        const token = getState().auth.token;
        const userId = getState().auth.userId;

        const date = new Date();
        
        // any async code here
        const response = await fetch(`http://localhost:3000/insert?order_code=${order_code}&quantity=${quantity}&price=${price}`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_code,
                quantity,
                price,
               
            })
         });

         if( !response.ok ) {
             throw new Error('Something went wrong!');
         }
         
        const resData = await response.json();

        dispatch({ 
            type: ADD_ORDER,
            orderData: {
                order_code : order_code,
                quantity:quantity,
                price:price,
                amount:price
                
             }

        });

        // tutaj lecimy po kolei z itemami w koszyku, a moglibyśmy robić per pushtoken

        // for(const cartItem of cartItems){
        //     const pushToken = cartItem.productPushToken;

        //     fetch('https://exp.host/--/api/v2/push/send', {
        //         method: 'POST',
        //         headers: {
        //           'Accept': 'application/json',
        //           'Accept-Encoding': 'gzip, deflate',
        //           'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //           to: pushToken,
        //           title: 'Order was placed!',
        //           body: cartItem.productTitle
        //         })
        //       });  

        // }      
        
    }
};