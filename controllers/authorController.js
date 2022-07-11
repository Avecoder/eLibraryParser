import { getAuthor } from '../services/parser.js'
import { createUser, getUserByName, removeUser, getAllUsersId } from '../services/userService.js'



export const getAuthorInfoFromElibrary = async (req, res, next) => {
  try {
    const { authorid } = req.query

    const author = await getAuthor(authorid)

    return res.status(200).json(author)
  } catch (err) {
    next(err)
  }
}

export const getAuthorByName = async (req, res, next) => {
  try {
    const { lastName } = req.query

    const author = await getUserByName(lastName)

    return res.status(200).json(author)
  } catch (err) {
    next(err)
  }
}


export const addAuthor = async (req, res, next) => {
  try {
    const author = await createUser(req.body)

    return res.status(200).json(author)
  } catch (err) {
    next(err)
  }
}


export const removeAuthor = async (req, res, next) => {
  try {
    const { id } = req.params

    const author = await removeUser(id)

    return res.status(200).json(author)
  } catch (err) {
    next(err)
  }
}


export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersId()

    return res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}
