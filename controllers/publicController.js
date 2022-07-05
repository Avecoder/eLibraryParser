import elibraryParser from '../elibrary-parser.js'


export const getPublic = (req, res, next) => {
  const { authorid } = req.query

  elibraryParser()
    .getArticles(authorid)
    .then(data => {
      res.status(200).json(data)
    })
    .catch((err) => res.status(404).json({message: 'Нет постов'}))

}


export const getAuthor = (req, res, next) => {
  const { authorid } = req.query

  elibraryParser()
    .getAuthor(authorid)
    .then(data => {
      res.status(200).json(data)
    })
    .catch((err) => res.status(404).json({message: 'Автор не найден'}))

}
