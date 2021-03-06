export const checkImage = file => {
  let err = ''
  if (!file) err = 'File does not exist.'

  if (file.size > 1024 * 1024) err = 'The largest image size is 1mb'

  if (file.type !== 'image/jpeg' && file.type !== 'image/png')
    err = 'Image format is incorrect'

  return err
}

export const imageUpload = async images => {
  let imgArr = []
  for (const item of images) {
    const formData = new FormData()

    if (item.camera) formData.append('file', item.camera)
    else formData.append('file', item)

    formData.append('upload_preset', 'efxjficn')
    formData.append('cloud_name', 'devat-channel')

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/devat-channel/upload',
      {
        method: 'POST',
        body: formData
      }
    )

    const data = await res.json()
    imgArr.push({ public_id: data.public_id, url: data.secure_url })
  }
  return imgArr
}
/*
1. https://res.cloudinary.com/devat-channel/image/upload/v1647684662/v-network/kdwvzufmxpespsiqcysw.png
2. https://res.cloudinary.com/devat-channel/image/upload/v1647759114/v-network/wnjmawoama0ofz9sas8n.jpg
3. https://res.cloudinary.com/devat-channel/image/upload/v1648015712/v-network/vndz100jjsud6dmlztmg.png
4. https://res.cloudinary.com/devat-channel/image/upload/v1648016351/v-network/dyyjrpwgkztiqicz4m9o.png
*/
