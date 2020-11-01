// import React, { useEffect, useState, useCallback } from 'react';
// import {
//     View,
//     FlatList,
//     Button,
//     ActivityIndicator,
//     StyleSheet,
//     Text
//  } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../shop/ProductItem';
import CartHeaderButton from '../../UI/CartHeaderButton';
import MenuHeaderButton from '../../UI/MenuHeaderButton';

import * as cartActions from '../../../store/actions/cart';
import * as productsActions from '../../../store/actions/products';
import Colors from '../../../constans/Colors';

// const LabProductsOverviewScreen = props => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [isRefreshing, setIsRefreshing] = useState(false);
//     const [error, setError] = useState();
//     const products = useSelector(state => state.products.availableProducts);
//     const dispatch = useDispatch();

//     const loadProducts = useCallback(async () => {
//         setError(null);
//         setIsRefreshing(true);
//         try {
//             await dispatch(productsActions.fetchProducts());
//         } catch (err) {
//             setError(err.message);
//         }
//         setIsRefreshing(false);

//     }, [dispatch, setIsLoading, setError]);

//     // nie robić async przy useEffect, tzn. useEffect(async () => {...}) !!
//     useEffect(() => {
//         setIsLoading(true);
//         loadProducts().then(() => {setIsLoading(false)}).catch(err => { /*  handle errors! */});
//     }, [dispatch, loadProducts]);

//     // ładujemy zawsze, gdy wejdziemy na ten ekran, bo mogło się coś zmienić na serwerze
//     useEffect(() => {
//         const unsubscribe = props.navigation.addListener('focus', loadProducts);

//         return () => {
//             unsubscribe();
//         };
//     }, [loadProducts]);

//     const onViewDetails = (id, title) => { 
//         props.navigation.navigate('ProductsOverview', {
           
//         });
//      };

//     if(error) {
//         return (
//             <View style={styles.centered}>
//                 <Text>An error occured.</Text>
//                 <Button title="Try again" onPress={loadProducts} color={Colors.primary} />
//             </View>
//         );        
//     }

//     if(isLoading) {
//         return (
//             <View style={styles.centered}>
//                 <ActivityIndicator size="large" color={Colors.primary} />
//             </View>
//         ); 
//     }

//     if(!isLoading && products.length === 0) {
//         return (
//             <View style={styles.centered}>
//                 <Text>No products found. Add some.</Text>
//             </View>
//         );
//     }

//     return (
      

//         <FlatList
//             onRefresh={loadProducts}
//             refreshing={isRefreshing}
//             data={products}
//             keyExtractor={item => item.id}
//             renderItem={ itemData => <ProductItem
//                 image={itemData.item.imageUrl}
//                 title={itemData.item.title}
//                 price={itemData.item.price}
//                 onSelect={() => onViewDetails(itemData.item.id, itemData.item.title)}
//             >
//                 <Button color={Colors.primary} title="View Details"
//                     onPress={() => {
//                         onViewDetails(itemData.item.id, itemData.item.title)
//                         }}
//                 />
//                 <Button title="Add to Cart" 
//                     onPress={() => { 
//                         dispatch(cartActions.addToCart(itemData.item));
//                     }} 
//                 />                
//             </ProductItem>}
//         />    
//     );
// };

export const screenOptions = navData => {
    return {
        headerTitle: 'HOME',
       
    }
};

// const styles = StyleSheet.create({
//     centered: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     }
// });

// export default LabProductsOverviewScreen;

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';


const onViewDetails = () => { 
            props.navigation.navigate('ProductsOverview', {
               
             });
         };
export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:1, title: "Daftar Laboratorium", image:"https://img.icons8.com/color/70/000000/cottage.png", screen: "LabList"},
        {id:2, title: "Daftar Pemeriksaan", image:"https://img.icons8.com/color/70/000000/administrator-male.png", screen: "Orders"},
        {id:3, title: "Jadwal Pemeriksaan", image:"https://img.icons8.com/color/70/000000/filled-like.png", screen: "ScheduleOrders"} ,
        {id:4, title: "Hasil Pemeriksaan", image:"https://img.icons8.com/color/70/000000/facebook-like.png", screen: "TestResult"} ,
        {id:5, title: "Manage Laboratorium",image:"https://img.icons8.com/nolan/70/000000/job.png", screen: "UserProducts"} ,
        {id:5, title: "Logout",image:"https://img.icons8.com/nolan/70/000000/exit.png"} 
      ]
    };
  }

  clickEventListener(item) {
    Alert.Alert(item.title)
  }

  

  render() {
    return (
      <View style={styles.container}>
        <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.data}
          horizontal={false}
          numColumns={2}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
              
            return (
               
                <TouchableOpacity style={[styles.card, {backgroundColor:item.color}]} onPress={() => {
                    if (item.screen == null)
                    {
                        dispatch(authActions.logout());
                    }
                    else
                    {
                        this.props.navigation.navigate(item.screen, { })
                    }
                    
                }}>
                <View style={styles.cardFooter}></View>
                <Image style={styles.cardImage} source={{uri:item.image}}/>
                <View style={styles.cardHeader}>
                  <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={styles.title}>{item.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor:"#E6E6E6",
  },
  listContainer:{
    alignItems:'center'
  },
  /******** card **************/
  card:{
    shadowColor: '#00000021',

    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 10,
    backgroundColor:"white",
    flexBasis: '42%',
    marginHorizontal: 10,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems:"center", 
    justifyContent:"center"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage:{
    height: 70,
    width: 70,
    alignSelf:'center'
  },
  title:{
    fontSize:18,
    flex:1,
    alignSelf:'center',
    color:"#696969"
  },
});   