export default function error(state = {}, action) {
  switch (action.type) {
    case 'ERROR':
      return {
        error: action.error
      };
    default:
      return {
        error: null
      };
  }
}
