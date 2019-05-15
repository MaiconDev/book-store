export default function cart(state = [], action) {

  switch (action.type) {
    case 'ADD_PRODUCT_CART':
      const duplicate = state.filter(product => product.id === action.product.id);
      if (!!duplicate.length) {
        const nproduct = duplicate[0];
        const newstate = state.filter(product => product.id !== action.product.id);

        nproduct.qty += 1;
        return [ ...newstate, nproduct ];
      }
      return [ ...state, action.product ];
    default:
      return state;
  }

}
