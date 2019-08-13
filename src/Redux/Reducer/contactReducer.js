
import * as actionTypes from '../actionType';

export default (state = [], action) => {
    switch (action.type){
      case actionTypes.CREATE_NEW_CONTACT:
      return [
        ...state,
        Object.assign({}, action.contact)
      ];
      case actionTypes.REMOVE_CONTACT:
      return state.filter((data, i) => i !== action.id);
      case actionTypes.EDIT_CONTACT:
      return state.map((contact)=> contact.id === action.id ? { ...contact, editing: !contact.editing } : contact);
      default:
            return state;
    }
  };