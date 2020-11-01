import detail from "../../models/detail";

import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = (order_cd) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        try {
            const response = await fetch(`http://localhost:3000/detail/getdetail?order_cd=${order_cd}`);
    
            if(!response.ok) {
                throw new Error('Something went wrong!');
            }
            
            const resData = await response.json();
           //console.log("asoudsaidjioasjdioasjdasoijdoasidoj",resData)
            const loadedProducts = [];
            console.log('bentar lagi selessai',resData);
            //console.log("test123",loadedProducts);
            for(const key in resData) {
                //console.log([key],resData[key].order_cd);
                loadedProducts.push(
                    new detail(
                        key,
                        resData[key].order_cd,
                        resData[key].order_desc,
                        resData[key].queue
                    )
                );
                    
            }     //console.log("ss",loadedProducts);  
            
            dispatch({
               
                type: SET_PRODUCTS,
                products: loadedProducts,
                userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
            });
        } catch(err) {
            throw err;
        }
    }
};

export const deleteProduct = productId => {
    return async (dispatch, getState) => {

        const token = getState().auth.token;
        const response = await fetch(`https://shop-rn-guide.firebaseio.com/products/${productId}.json?auth=${token}`, { 
            method: 'DELETE',            
         });

         if(!response.ok) {
             throw new Error('Something went wrong!');
         }

         dispatch( { type: DELETE_PRODUCT, pid: productId } );
     };
};

export const createProduct = (order_code, quantity, price) => {
    return async (dispatch, getState) => {

        const STATUS ='granted';

        let statusObj = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if (statusObj.status !== STATUS) {
          statusObj = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        }

        let pushToken;
        if (statusObj.status !== STATUS) {
          pushToken = null;
        } else {
          pushToken = (await Notifications.getExpoPushTokenAsync()).data;
        }

        const token = getState().auth.token;
        const userId = getState().auth.userId;
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

        dispatch( { type: CREATE_PRODUCT, 
            productData: {
                id: resData.name,
                title,
                description,
                imageUrl,
                price,
                ownerId: userId,
                pushToken: pushToken
            }
        });
    }
};

export const updateProduct = (id, title, description, imageUrl) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(`https://shop-rn-guide.firebaseio.com/products/${id}.json?auth=${token}`, { 
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl
            })
         });

         if(!response.ok) {
             throw new Error('Something went wrong!');
         }

        dispatch({ 
            type: UPDATE_PRODUCT, 
            pid: id,
            productData: {
                title,
                description,
                imageUrl
            }
        });
    };
};