import { getArticles } from '../services/parser.js'
import { uploadAllPosts, getAllPosts } from '../services/postService.js'
import { getUserByName, getAllUsersId } from '../services/userService.js'
import ApiError from '../exception/apiError.js'


export const uploadPosts = async () => {
  try {
    const users = await getAllUsersId()

    for(let user of users) {
      const data = await getArticles(user.eLibraryId)

      await uploadAllPosts(data, user.id)
    }

    console.log(`Posts updated - ${new Date()}`)
  } catch (err) {
    console.log(err)
    throw ApiError.BadGateway('Ошибка БД', err)
  }
}

export const getAllPublications = async (req, res, next) => {
  try {
    const { lastname, limit } = req.query

    const { _id } = await getUserByName(lastname)
    const posts = await getAllPosts(_id, limit)

    return res.status(200).json({count: posts.length, posts})
  } catch (err) {
    console.log(err)
    next(err)
  }
}
