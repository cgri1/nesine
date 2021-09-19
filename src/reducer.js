export function reducer(state, action) {
    switch (action.type) {
        case "PUSH_BASKET":
            let newBasketValue = state.basketValues;
            newBasketValue.push(action.value)
            state.basketValues = newBasketValue;
            return { basketValues: state.basketValues, isSelected: !state.isSelected }
        case "POP_BASKET":
            let newBasketValue1 = state.basketValues;
            let sameId = -1;
            newBasketValue1.forEach((data, index) => { if (data.Id === action.value.Id) { sameId = index; } });
            if (sameId > -1) {
                newBasketValue1.splice(sameId, 1);
            }
            state.basketValues = newBasketValue1;
            return { basketValues: state.basketValues }
        default:
            return state;

    }
}