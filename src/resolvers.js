import data from '../data'

function getArticles(searchText) {

  const rules = []

  if (searchText) {
    rules.push((article) => article.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
  }

  return data.articles.filter(article => rules.every(rule => rule(article)))
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
    articles: (_, { searchText }) => getArticles(searchText),
    users: (_, { limit }) => getUsers(limit),
    article: (_, { id }) => findArticleById(id),
    user: (_, { id }) => findUserById(id)
  },
  User: {
    articles: (user) => {
      return data.articles.filter(article => article.authorId === user.id)
    },
  },
  Article: {
    author: (article) => {
      return data.users.find(user => user.id === article.authorId)
    }
  }
};

export default resolvers;