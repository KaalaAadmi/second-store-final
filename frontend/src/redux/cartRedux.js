// import { createSlice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  products: [],
  quantity: 0,
  total: 50,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      // const products = state.products;
      // if (products.length === 0)
      //   products.push({ ...action.payload, quantity: action.payload.quantity });
      // for (let i = 0; i < products.length; i++) {
      //   if (
      //     products[i]._id === action.payload._id &&
      //     products[i].size === action.payload.size &&
      //     products[i].color === action.payload.color
      //   ) {
      //     products[i].quantity += action.payload.quantity;
      //     state.total += action.payload.price * action.payload.quantity;
      //     toast.success(` Increased ${action.payload.title} added to cart`, {
      //       position: "bottom-center",
      //       theme: "dark",
      //     });
      //   } else {
      //     const tempProduct = {
      //       ...action.payload,
      //       quantity: action.payload.quantity,
      //     };
      //     state.quantity += action.payload.quantity;
      //     state.products.push(tempProduct);
      //     state.total += action.payload.price * action.payload.quantity;
      //     toast.success(`${action.payload.title} added to cart`, {
      //       position: "bottom-center",
      //       theme: "dark",
      //     });
      //   }
      // }
      const itemIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );
      //       let indexes=[];
      //       const products = state.products;
      //       for(let i = 0; i < products.length; i++){
      // if(products[i]._id === action.payload._id) indexes.push(i);
      //       }
      //       for(let i = 0; i < indexes.length; i++){

      //       }
      if (itemIndex >= 0) {
        if (
          state.products[itemIndex].color === action.payload.color &&
          state.products[itemIndex].size === action.payload.size
        ) {
          state.products[itemIndex].quantity += action.payload.quantity;
          state.total += action.payload.price * action.payload.quantity;
          toast.info(`Increased ${action.payload.title} cart quantity`, {
            position: "bottom-center",
            theme: "dark",
          });
        } else if (
          (state.products[itemIndex].color !== action.payload.color &&
            state.products[itemIndex].size === action.payload.size) ||
          (state.products[itemIndex].color === action.payload.color &&
            state.products[itemIndex].size !== action.payload.size) ||
          (state.products[itemIndex].color !== action.payload.color &&
            state.products[itemIndex].size !== action.payload.size)
        ) {
          const tempProduct = {
            ...action.payload,
            quantity: action.payload.quantity,
          };
          state.quantity += 1;
          state.products.push(tempProduct);
          state.total += action.payload.price * action.payload.quantity;
          toast.success(`${action.payload.title} added to cart`, {
            position: "bottom-center",
            theme: "dark",
          });
        }
      } else {
        // const q = action.payload.quantity;
        const tempProduct = {
          ...action.payload,
          quantity: action.payload.quantity,
        };
        state.quantity += 1;
        state.products.push(tempProduct);
        state.total += action.payload.price * action.payload.quantity;
        toast.success(`${action.payload.title} added to cart`, {
          position: "bottom-center",
          theme: "dark",
        });
      }
    },
    removeFromCart: (state, action) => {
      const products = state.products;
      let nextCartItems = [];
      for (let i = 0; i < products.length; i++) {
        if (products[i]._id !== action.payload._id) {
          nextCartItems.push(products[i]);
        } else {
          if (products[i].color !== action.payload.color) {
            nextCartItems.push(products[i]);
          } else if (products[i].size !== action.payload.size) {
            nextCartItems.push(products[i]);
          } else {
            continue;
          }
        }
      }
      state.products = nextCartItems;
      state.quantity -= 1;
      state.total -= action.payload.price * action.payload.quantity;
      toast.error(
        `Removed ${action.payload.title} of size ${action.payload.size} from cart`,
        {
          position: "bottom-center",
          theme: "dark",
        }
      );
    },
    decreaseCart: (state, action) => {
      const products = state.products;
      for (let i = 0; i < products.length; i++) {
        if (
          products[i]._id === action.payload._id &&
          products[i].color === action.payload.color &&
          products[i].size === action.payload.size
        ) {
          if (products[i].quantity > 1) {
            products[i].quantity -= 1;
            state.total -= action.payload.price;
            toast.error(
              `Decreased ${action.payload.title} quantity from cart`,
              {
                position: "bottom-center",
                theme: "dark",
              }
            );
          } else if (products[i].quantity === 1) {
            let nextCartItems = [];
            for (let i = 0; i < products.length; i++) {
              if (products[i]._id !== action.payload._id) {
                nextCartItems.push(products[i]);
              } else {
                if (products[i].color !== action.payload.color) {
                  nextCartItems.push(products[i]);
                } else if (products[i].size !== action.payload.size) {
                  nextCartItems.push(products[i]);
                } else {
                  continue;
                }
              }
            }
            state.products = nextCartItems;
            state.quantity -= 1;
            state.total -= action.payload.price * action.payload.quantity;
            toast.error(
              `Decreased ${action.payload.title} quantity from cart`,
              {
                position: "bottom-center",
                theme: "dark",
              }
            );
          }
        }
      }
    },
    increaseCart: (state, action) => {
      const products = state.products;
      for (let i = 0; i < products.length; i++) {
        if (
          products[i]._id === action.payload._id &&
          products[i].color === action.payload.color &&
          products[i].size === action.payload.size
        ) {
          products[i].quantity += 1;
          state.total += action.payload.price;
          toast.info(`Increased ${action.payload.title} quantity in cart`, {
            position: "bottom-center",
            theme: "dark",
          });
        }
      }
    },
    clearCart: (state, action) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
      toast.error("Cleared Cart", {
        position: "bottom-center",
        theme: "dark",
      });
    },
    clearBuffer: (state, action) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const {
  addProduct,
  removeFromCart,
  decreaseCart,
  increaseCart,
  clearCart,
  clearBuffer,
} = cartSlice.actions;
export default cartSlice.reducer;
