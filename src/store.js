import React from "react";

export const initialState = {
    basketValues: [],
    isSelected: false,
}
let Context = React.createContext(initialState)
export default Context;