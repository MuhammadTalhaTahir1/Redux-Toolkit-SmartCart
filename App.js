import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Products from "./src/screens/Products";
import { Provider, useDispatch } from "react-redux";
import { mystore } from "./src/ReduxToolkit/MyStore";
import { useEffect } from "react";
import { addMyProduct } from "./src/ReduxToolkit/MyProductSlice";
import Cart from "./src/screens/Cart";
// const data = [
//   {
//     id: 1,
//     name: "t-shirt 2",
//     price: 349,
//     qty: 0,
//     image:
//       "https://png.pngtree.com/png-clipart/20190515/original/pngtree-white-t-shirt-mockup-png-image_3610313.jpg",
//   },
//   {
//     id: 2,
//     name: "t-shirt 3",
//     price: 200,
//     qty: 4,
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbGRe7Gwzr_YOtd_nFxSGfzM9H17HZo6RPrATeLBGIWdXWzvXPFNLy0c43QVsOH480jtc&usqp=CAU",
//   },
//   {
//     id: 3,
//     name: "t-shirt 4",
//     price: 299,
//     qty: 0,
//     image:
//       "https://png.pngtree.com/png-vector/20201128/ourmid/pngtree-cotton-t-shirt-png-image_2401873.jpg",
//   },
//   {
//     id: 4,
//     name: "t-shirt 5",
//     price: 399,
//     qty: 0,
//     image:
//       "https://png.pngtree.com/element_our/png/20180828/dark-blue-t-shirt-mockup-png_72947.jpg",
//   },
// ];
export default function App() {

  const Stack = createStackNavigator();
  return (
    <Provider store={mystore}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="products"
            component={Products}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="cart"
            component={Cart}
            // options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
