import PublicationModel from '../models/PublicationModel.js'
import ApiError from '../exception/apiError.js'

export const getAllPosts = async (authorId, limit) => {
  const publications = await PublicationModel.find({authorId}).limit(limit)

  return publications
}


export const uploadAllPosts = async (data, userId) => {
  for(let item of data) {
    const post = await PublicationModel.findOneAndUpdate({publicationId: item.id}, {
      title: item.title,
      source: item.source,
      authors: item.authors,
    })


    if(!post) {
      const newPost = new PublicationModel({...item, publicationId: item.id, authorId: userId})
      await newPost.save()
    }
  }

  console.log(`data count - ${data.length}`)
}
