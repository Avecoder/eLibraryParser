import elibraryParser from '../elibrary-parser.js'


export const getPublic = async (req, res, next) => {
  try {

    const { authorid } = req.query


    const authorData = await elibraryParser().getAuthor(authorid)


    const publications = await elibraryParser().getArticles(authorid)


    return res.status(200).json({
      authorData: {...authorData, authorid},
      publications
    })
  } catch (err) {
    next(err)
  }
}
