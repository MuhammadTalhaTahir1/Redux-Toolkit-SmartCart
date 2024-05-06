import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { parseIconFromClassName } from "react-native-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  addMyProduct,
  decreaseQty,
  increaseQty,
} from "../ReduxToolkit/MyProductSlice";
import {
  addProductToMyCart,
  deleteMyCartItem,
  removeMyCartItem,
} from "../ReduxToolkit/MyCartSlice";

const { width } = Dimensions.get("window");
const itemWidth = (width - 32 - 16) / 2; // Subtracting padding and margin

const Products = () => {
  const navigation = useNavigation();
  const foodData = [
    {
      id: '1',
      name: 'Burger',
      imageUrl: 'https://kfc.ee/wp-content/uploads/2024/01/Cheddar-Burger.png', 
    },
    {
      id: '2',
      name: 'Pizza',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/022/149/342/non_2x/hot-italian-pizza-cutout-png.png', 
    },
    {
      id: '3',
      name: 'Nuggets',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/025/222/173/original/chicken-nuggets-isolated-on-transparent-background-png.png', 
    },
    {
      id: '4',
      name: 'Pasta',
      imageUrl: 'https://assets-global.website-files.com/6305f7d600c9842969920a58/64be4dce089aca2670712bff_pasta.png', 
    },
    {
      id: '5',
      name: 'Shawarma',
      imageUrl: 'https://png.pngtree.com/png-vector/20240130/ourmid/pngtree-shawarma-sandwich-isolated-png-png-image_11573054.png', 
    },
  ];
  const data = [
    {
      id: 0,
      name: "Zinger Burger Deal",
      price: 400,
      image:
        "https://sendgiftpakistan.com/blog/wp-content/uploads/2015/06/KFC-Krunch-Burger-With-Fries-N-Drink.png",
      qty: 0,
    },
    {
      id: 1,
      name: "Zinger Burger",
      price: 290,
      qty: 0,
      image:
        "https://kfcromania.vtexassets.com/arquivos/ids/155779/WEB-Zinger_Burger-1200x1200px.png?v=638376324281070000",
    },
    {
      id: 2,
      name: "Zinger Patty Burger",
      price: 380,
      qty: 0,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuLNAbbFOn_8yJYGnMvzzcoOdsNuk66uCIMw&usqp=CAU",
    },
    {
      id: 3,
      name: "Special Deal",
      price: 600,
      qty: 0,
      image:
        "https://kfc.lt/wp-content/uploads/2024/02/Cheddar-meal-L.png",
    },
    {
      id: 4,
      name: "Mighty Burger",
      price: 320,
      qty: 0,
      image:
        "https://kfc.ee/wp-content/uploads/2024/01/Cheddar-Burger.png",
    },
    {
      id: 5,
      name: "Tower Burger Deal",
      price: 399,
      qty: 0,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEuRhzfz7pmsox0mXKOZaO09k5IeydVEjG25pw6qnrf57kRotRlcOd9Iv1v0sTjQkuCo0&usqp=CAU",
    },
    {
      id: 6,
      name: "Chicken Patty Burger",
      price: 280,
      qty: 0,
      image:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/12/30/13/kfc-vegan-burger.png?width=1200&height=1200&fit=crop",
    },
    {
      id: 7,
      name: "Patty Burger",
      price: 220,
      qty: 0,
      image:
        "https://www.onegreenplanet.org/wp-content/uploads/2022/01/veganburger_alc.jpeg",
    },
  ];

  const totalcartItem = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const myProducts = useSelector((state) => state.product);
  const myCartItem = useSelector((state) => state.cart);
  const getTotal = () => {
    let total = 0;
    totalcartItem.map((item) => {
      total = total + item.qty * item.price;
    });
    return total;
  };
  useEffect(() => {
    data.map((item) => {
      if (myProducts.length == 0) {
        dispatch(addMyProduct(item));
      }
    });
  }, []);

  //   console.log(myProducts);
  console.log("cart item:", myCartItem);
  return (
    <View style={styles.containerr}>
      <View style={styles.header}>
        <Text style={styles.reduxText}>Categores</Text>
        <TouchableOpacity
          style={styles.cartIcon}
          onPress={() => navigation.navigate("cart")}
        >
          <FontAwesome name="shopping-cart" size={24} color="black" />
          {/* <Image style={{height:24,width:24}} source={{uri:'https://media.istockphoto.com/id/467367107/tr/foto%C4%9Fraf/empty-kfc-bucket.jpg?s=612x612&w=0&k=20&c=mKMqA8XC2Zxj4sGQzDDLbxfzlqK2KAduPK288pkj2pA='}}/> */}
          {myCartItem.length !== 0 ? (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{myCartItem.length}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal // Makes the list horizontal
        data={foodData} // The data source
        keyExtractor={(item) => item.id} // Key extractor
        renderItem={({ item }) => ( // Render each item
          <View style={styles.item1}>
            <Image source={{ uri: item.imageUrl }} style={styles.image1} /> 
            <Text style={styles.name1}>{item.name}</Text> 
          </View>
        )}
        showsHorizontalScrollIndicator={false} // Hide the horizontal scroll bar
      />
      <View style={{margin:5}}>
      <Text style={styles.reduxText}>Fast Food</Text>

      </View>
      <FlatList
        data={myProducts}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: item.image }} />
            {/* Absolute position for the detail icon */}
            <TouchableOpacity
              style={styles.infoIcon}
              onPress={() => console.log('Info Icon Pressed')} // Action when icon is clicked
            >
              <FontAwesome name="info" size={11} color="gray" />
            </TouchableOpacity>
          </View>
            <Text style={styles.name}>{item.name}</Text>
            {/* <Text style={styles.price}>${item.price}</Text> */}
            <View>
              {item.qty == 0 ? (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    dispatch(addProductToMyCart(item));
                    dispatch(increaseQty(item.id));
                  }}
                >
                  <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
              ) : null}
              {item.qty == 0 ? null : (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <TouchableOpacity
                    style={styles.itembutton}
                    onPress={() => {
                      if (item.qty > 1) {
                        dispatch(removeMyCartItem(item.id));
                        dispatch(decreaseQty(item.id));
                      } else {
                        dispatch(deleteMyCartItem(item.id));
                        dispatch(decreaseQty(item.id));
                      }
                    }}
                  >
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={{ marginTop: 10 }}> {item.qty}</Text>
                  <TouchableOpacity
                    style={styles.itembutton}
                    onPress={() => {
                      dispatch(addProductToMyCart(item));
                      dispatch(increaseQty(item.id));
                    }}
                  >
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        )}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.container}
        numColumns={2}
      />
      {myCartItem.length > 0 ? (
        <View style={styles.bottom}>
          <Text>
            {"(" + totalcartItem.length + ")" + "Total Price : $" + getTotal()}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  containerr: {
    flex: 1,
    paddingTop: 20,
    marginTop: 10,
    paddingBottom: 10,
  },
  header: {
    flexDirection: "row", // Arrange items in same line
    justifyContent: "space-between", // Align items to opposite ends of the container
    alignItems: "center", // Center items vertically
    paddingHorizontal: 16,
    marginTop: 10, // Add margin from the top
    marginBottom: 10,
  },
  reduxText: {
    fontSize: 25,
    fontWeight: "bold",
  },

   item1: {
    marginRight: 16, // Spacing between items
    alignItems: 'center', // Center items horizontally
    height:120,

  },
  image1: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  name1: {
    // marginTop: 8,
    fontSize: 15,
  },
  container: {
    // paddingHorizontal: 16,
    alignItems:'center',
    paddingTop: 20,
  },
  itemContainer: {
    width: itemWidth,
    // margin: 8,
    backgroundColor: "#fff",
    // borderRadius: 8,
    // padding: 16,
    elevation: 3,
    marginBottom: 8,
    marginHorizontal: 8,
    padding:5,
  elevation:10
  },
  imageContainer: {
    position: 'relative', // Important for absolute positioning inside it
  },
  infoIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode:"stretch"
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#E3242B",
    paddingVertical: 10,
    // borderRadius: 5,
    alignItems: "center",
  },
  itembutton: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  cartIcon: {
    flexDirection: "row", // Set flexDirection to row to align icon and badge horizontally
    alignItems: "center", // Center items vertically
  },
  cartBadge: {
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 0, // Add margin between the icon and badge
    marginBottom: 5,
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    width: "50%",
    height: 35,
    borderTopWidth: 1,
    borderTopColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 10,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    elevation: 10,
  },

  checkoutButton: {
    width: "70%",
    height: 35,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
  },
});
