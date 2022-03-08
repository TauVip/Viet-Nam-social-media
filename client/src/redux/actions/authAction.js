export const TYPES = {
  AUTH: 'AUTH'
}

export const login = data => dispatch => {
  try {
    dispatch({ type: 'NOTIFY', payload: { loading: true } })
  } catch (err) {}
}
