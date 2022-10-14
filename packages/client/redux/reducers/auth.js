const init_state = {
    id: "",
    username: "",
    email: "",
    fullname: "",
    phone_number: 0,
    date_of_birth: "",
    gender: "",
    is_verified: false,
    avatar_url: "",
    role: "",
    oldpassword: "",
    img_url: "",
    category: "",
};

import auth_types from "./types/auth";
const auth_reducer = (state = init_state, action) => {
    if (action.type === auth_types.AUTH_LOGIN) {
        return {
            ...state,
            id: action.payload.id,
            username: action.payload.username,
            email: action.payload.email,
            fullname: action.payload.fullname,
            phone_number: action.payload.phone_number,
            gender: action.payload.gender,
            is_verified: action.payload.is_verified,
            avatar_url: action.payload.avatar_url,
            date_of_birth: action.payload.date_of_birth,
            role: action.payload.role,
            oldpassword: action.payload.oldpassword,
            img_url: action.payload.img_url,
            category: action.payload.category,
        };
    } else if (action.type === auth_types.AUTH_LOGOUT) {
        return init_state;
    }

    return state;
};

export default auth_reducer;
