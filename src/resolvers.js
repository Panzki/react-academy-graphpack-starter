import data from '../data'

function getArticles(searchText) {
  if (searchText) {
    return data.articles.filter(article => article.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));
  }
  return data.articles;
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
  }
};

export default resolvers;