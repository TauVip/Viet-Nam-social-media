export const POST_TYPES = {
  CREATE_POST: 'CREATE_POST'
}

export const createPost =
  ({ content, images, auth }) =>
  dispatch => {
    console.log({ content, images, auth })
  }
