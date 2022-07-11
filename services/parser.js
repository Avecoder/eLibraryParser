import superagent from 'superagent'
import cheerio from 'cheerio'
import _ from 'lodash'
import ApiError from '../exception/apiError.js'


const baseUrl = 'https://www.elibrary.ru'

export const getAuthor = async id => {
  try {
    const authorUrl = `${baseUrl}/author_profile.asp?id=${id}`

    const { text } = await superagent
                            .agent()
                            .get(authorUrl)
                            .redirects(2)
                            .send()


    const author = {}
    const $ = cheerio.load(text)

    const fullName = $('form[name="results"] table td[align="left"] *[color="#F26C4F"] > b').text()
    const fragments = fullName.split(/\s+/)

    if(fragments[0]) author.lastName = _.capitalize(fragments[0].trim())
    if(fragments[1]) author.firstName = _.capitalize(fragments[1].trim())
    if(fragments[2]) author.extraName = _.capitalize(fragments[2].trim())

    const organozationEl = $('form[name="results"] table td[width="100%"] a')
    if (organozationEl.length) author.organization = organozationEl.text()


    return author

  } catch (err) {
    throw ApiError.BadGateway('Ошибка при парсинге', err)
  }
}

const parseArticle = $ => {
  let articles = []

  $('tr[id^="arw"],tr[id^="brw"]').each((index, element) => {
    const article = {}
    const idAttr = $(element).attr('id')

    article.id = parseInt(idAttr.replace('brw', '').replace('arw', ''), 10)

    const $title = $('td:nth-child(2) b', element)

    if ($title.length) article.title = $title.text().trim()


    const $source = $('font[color="#00008f"]:last-child', element)
    if ($source.length) article.source = $source.text().trim().replace(/\r?\n/g, '')

    const $authors = $('font[color="#00008f"]:nth-child(3)', element)

    if ($authors.length) {
      article.authors = $authors.text().split(', ').map((str) => {
        return str.trim()
      })
    }

    if (article.id || article.title) articles.push(article)
  })

  return articles
}

const getPostQuery = async (pageNum, url) => {
  const { text } = await superagent
                          .agent()
                          .get(`${url}&pagenum=${pageNum.toString()}`)
                          .send()
  return text
}



export const getArticles = async id => {
  try {
    const articlesUrl = `${baseUrl}/author_items.asp?pubrole=100&show_refs=1&authorid=${id}`

    const text = await getPostQuery(1, articlesUrl)


    const $ = cheerio.load(text)


    const articles = []

    articles.push(...parseArticle($))

    if(!articles.length) throw ApiError.BadGateway('Ошибка при парсинге', err)

    let pages = []
    $('.mouse-hovergr[bgcolor="#f5f5f5"] a').each((index, element) => {
      pages.push($(element).text())
    })

    if(pages.length) {
      let queries = []

      for(let pageNum of pages) {
        const pageData = await getPostQuery(pageNum, articlesUrl)

        queries.push(pageData)
      }

      for(let page of queries) articles.push(...parseArticle(cheerio.load(page)))
    }


    return articles


  } catch (err) {
    throw ApiError.BadGateway('Ошибка при парсинге', err)
  }
}
