import data from '../data'

function filterArticles(articles, search) {

  const rules = []

  if (search.text) {
    rules.push(article => article.body.toLowerCase().includes(search.text.toLocaleLowerCase()))
  }
  if(search.isPublished !== undefined){
    rules.push(article => article.isPublished === search.isPublished)
  }

  return articles.filter(article => rules.every(rule => rule(article)))
}

function getUsers(limit) {
  if (limit) {
    return data.users.slice(0, limit)
  }
  return data.users
}

function findArticleById(id) {
  return data.articles.filter(article => article.id === id)[0]
}

function findUserById(id) {
  return data.users.filter(user => user.id === id)[0]

}

const resolvers = {
  Query: {
    hello: () => `Hello World!`,
    articles: (_, { search }) => filterArticles(data.articles, search),
    users: (_, { limit }) => getUsers(limit),
    article: (_, { id }) => findArticleById(id),
    user: (_, { id }) => findUserById(id)
  },
  User: {
    articles: (user, {search}) => {
      const articlesOfUser = data.articles.filter(article => article.authorId === user.id)
      
      return filterArticles(articlesOfUser, search)
    },
  },
  Article: {
    author: (article) => {
      return data.users.find(user => user.id === article.authorId)
    }
  }
};

export default resolvers;