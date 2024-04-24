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
  const data = [
    {
      id: 0,
      name: "t-shirt 1",
      price: 300,
      image:
        "https://img.freepik.com/free-psd/isolated-white-t-shirt-front-view_125540-1194.jpg",
      qty: 0,
    },
    {
      id: 1,
      name: "t-shirt 2",
      price: 349,
      qty: 0,
      image:
        "https://png.pngtree.com/png-clipart/20190515/original/pngtree-white-t-shirt-mockup-png-image_3610313.jpg",
    },
    {
      id: 2,
      name: "t-shirt 3",
      price: 200,
      qty: 0,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbGRe7Gwzr_YOtd_nFxSGfzM9H17HZo6RPrATeLBGIWdXWzvXPFNLy0c43QVsOH480jtc&usqp=CAU",
    },
    {
      id: 3,
      name: "t-shirt 4",
      price: 299,
      qty: 0,
      image:
        "https://png.pngtree.com/png-vector/20201128/ourmid/pngtree-cotton-t-shirt-png-image_2401873.jpg",
    },
    {
      id: 4,
      name: "t-shirt 5",
      price: 399,
      qty: 0,
      image:
        "https://png.pngtree.com/element_our/png/20180828/dark-blue-t-shirt-mockup-png_72947.jpg",
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
        <Text style={styles.reduxText}>Redux ToolKit</Text>
        <TouchableOpacity
          style={styles.cartIcon}
          onPress={() => navigation.navigate("cart")}
        >
          <FontAwesome name="shopping-cart" size={24} color="black" />
          {myCartItem.length !== 0 ? (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{myCartItem.length}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
      <FlatList
        data={myProducts}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Image style={styles.image} source={{ uri: item.image }} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>
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
                        dispatch(removeMyCartItem(item));
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
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  itemContainer: {
    width: itemWidth,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    borderRadius: 5,
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
