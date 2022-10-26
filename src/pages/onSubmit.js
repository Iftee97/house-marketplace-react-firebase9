const onSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)

  if (discountedPrice >= regularPrice) {
    setLoading(false)
    toast.error('Discounted price needs to be less than regular price')
    return
  }
  if (images.length > 6) {
    setLoading(false)
    toast.error('Max 6 images')
    return
  }

  // Store image in firebase
  const storeImage = async (image) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage()
      const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`
      const storageRef = ref(storage, 'images/' + fileName)
      const uploadTask = uploadBytesResumable(storageRef, image)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
            default: 
              break
          }
        },
        (error) => {
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
          })
        }
      )
    })
  }

  const imgUrls = await Promise.all(
    [...images].map((image) => storeImage(image))
  ).catch(() => {
    setLoading(false)
    toast.error('Images not uploaded')
    return
  })

  const formDataCopy = {
    ...formData,
    imgUrls,
    timestamp: serverTimestamp(),
  }

  delete formDataCopy.images
  !formDataCopy.offer && delete formDataCopy.discountedPrice

  const docRef = await addDoc(collection(db, 'listings'), formDataCopy)
  setLoading(false)
  toast.success('Listing saved')
  navigate(`/category/${formDataCopy.type}/${docRef.id}`)
}