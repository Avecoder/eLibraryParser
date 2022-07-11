import { getArticles } from '../services/parser.js'
import { uploadAllPosts, getAllPosts } from '../services/postService.js'
import { getUserId, getAllUsersId } from '../services/userService.js'
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
    const { authorid, limit } = req.query

    const userId = await getUserId(authorid)
    const posts = await getAllPosts(userId, limit)

    return res.status(200).json({count: posts.length, posts})
  } catch (err) {
    console.log(err)
    next(err)
  }
}
