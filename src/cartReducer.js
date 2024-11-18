
//whatever we return from the useReducer becomes the new state
export default function cartReducer(cart, action) {
    switch (action.type) {
        case "add": {
            const { id, sku} = action;
            const itemInCart = cart.find((ele) => ele.sku === sku);
            if (itemInCart) {
                // Return new array with quantity increased
                return cart.map((i) => 
                i.sku === sku
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
                );
            }
            // Return a new array with a new item appended
            return [...cart, { id, sku, quantity: 1 }];
        }
        case "updateQuantity": {
            const { quantity, sku} = action;
            if (quantity === 0) {
                return cart.filter((i) => i.sku !== sku);
              }
              // Return new array with quantity increased
            return cart.map((i) => 
            i.sku === sku
                ? { ...i, quantity }
                : i
            );
        }
        case "empty": 
            return [];
        default:
            throw new Error("Unhandled action" + action.type);
    }
}
