import { getAuthor } from './services/parser.js'


const test = async () => {
  const data = await getAuthor('1070519')
  console.log(data)
}

test()
