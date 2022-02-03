import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCarthData = () => {
    
  return async (dispatch) => {
    
    const fetchData = async () => {
        const response = await fetch(
          "https://react-https-c205c-default-rtdb.firebaseio.com/cart.json"
        );
        if (!response.ok) {
          throw new Error("Could not fetch cart data!");
        }
        const data = response.json();
        return data;
    }
        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
              items: cartData.items || [],
              totalQuantity: cartData.totalQuantity
            }));

          } catch (error) {
            dispatch(
              uiActions.showNotification({
                status: "error",
                title: "Error!",
                message: "Could not fetch cart data!",
              })
            );
          }
      };
  

};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-https-c205c-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Cart data sent Successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed.",
        })
      );
    }
  };
};
