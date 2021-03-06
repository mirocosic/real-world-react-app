export default (state = {}, action) => {
  switch(action.type){
    case "LOGIN":
    case 'REGISTER':
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.error : null
      }
    case 'LOGIN_PAGE_UNLOADED':
      return {};

    case "UPDATE_FIELD_AUTH":
      return {
        ...state,
        [action.key]:action.value
      };
    case "ASYNC_START":
      if(action.subtype === "LOGIN") {
        return {
          ...state,
          inProgress: true
        }
      }
      return state;
    default:
      return state;
  }
}
