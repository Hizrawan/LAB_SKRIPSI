import LabOrder from "../../models/LabsOrder";

import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = (lab_id) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        try {
            const response = await fetch(`http://localhost:3000/orderlist?lab_id=${lab_id}`);
    
            if(!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
           console.log(resData[0]);
   
            const loadedProducts = [];
            for(const key in resData) {
                loadedProducts.push(
                    new LabOrder(
                        key,
                        resData[key].lab_name,
                        resData[key].lab_id,
                        resData[key].order_name,
                        resData[key].order_cd,
                        resData[key].lab_address,
                        resData[key].open_status,
                        resData[key].imageUrl,
                        resData[key].price
                    ));
            }        
    
            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts,
                userProducts: loadedProducts.filter(prod => prod.lab_name === userId)
                
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

export const createProduct = (lab_address, open_status, imageUrl) => {
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
        const response = await fetch(`https://shop-rn-guide.firebaseio.com/products.json?auth=${token}`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lab_address,
                open_status,
                imageUrl,
                lab_name: userId,
                lab_id: pushToken
            })
         });

         if( !response.ok ) {
             throw new Error('Something went wrong!');
         }
         
        const resData = await response.json();

        dispatch( { type: CREATE_PRODUCT, 
            productData: {
                id: resData.name,
                lab_address,
                open_status,
                imageUrl,
                lab_name: userId,
                pushToken: pushToken
            }
        });
    }
};

export const updateProduct = (id, lab_address, open_status, imageUrl) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(`https://shop-rn-guide.firebaseio.com/products/${id}.json?auth=${token}`, { 
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lab_address,
                open_status,
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
                lab_address,
                open_status,
                imageUrl
            }
        });
    };
};