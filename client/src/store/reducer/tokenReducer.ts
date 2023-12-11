const initialState = {
    token: ''
};

export const tokenReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload,
            };
        default: 
            return state;
    }
};

