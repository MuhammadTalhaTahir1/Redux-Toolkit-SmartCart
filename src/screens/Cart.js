import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToMyCart,
  deleteMyCartItem,
  removeMyCartItem,
} from "../ReduxToolkit/MyCartSlice";
import { decreaseQty, increaseQty } from "../ReduxToolkit/MyProductSlice";

const { width } = Dimensions.get("window");
const itemWidth = (width - 32 - 16) / 2; // Subtracting padding and margin
const Cart = () => {
  const cartItem = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  //   console.log('cart item ',cartItem);
  const getTotal = () => {
    let total = 0;
    cartItem.map((item) => {
      total = total + item.qty * item.price;
    });
    return total;
  };
  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Image style={styles.image} source={{ uri: item.image }} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>

      {item.qty == 0 ? null : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity style={styles.itembutton}>
            <Text
              style={styles.buttonText}
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
              -
            </Text>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, paddingHorizontal: 10 }}>
            {" "}
            {item.qty}
          </Text>
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
  );
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <FlatList
          data={cartItem}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.container}
        />
      </View>

      <View style={styles.bottom}>
        <View style={styles.innerBottom}>
          <Text>{"added items (" + cartItem.length + ")"}</Text>
          <Text>{"Total Price : $" + getTotal()}</Text>
        </View>
        <View style={styles.innerBottom}>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={{ color: "#fff" }}>CheckOut</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    elevation: 3,
  },
  detailsContainer: {
    flex: 1,
    marginRight: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    paddingRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    paddingLeft: 10,
  },
  price: {
    fontSize: 14,
    color: "#888",
    paddingLeft: 10,
  },
  button: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
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
  bottom: {
    backgroundColor: "#fff",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderTopWidth: 1, // Add a border to separate the Checkout view from FlatList
    borderTopColor: "red", // Set border color
  },
  innerBottom: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
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
