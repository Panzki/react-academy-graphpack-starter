import data from '../data'

const resolvers = {
  Query: {
    hello: () => `Hello World!`,
    articles: (_, {searchText}) => {
      if(searchText){
        return data.articles.filter(article => article.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
      }
      return data.articles
    },
    users: (_, { limit }) => {
      if(limit) {
        return data.users.slice(0, limit)
      }
      return data.users
    },
    article: (_, { id }) => {
      return data.articles.filter(article => article.id === id)[0]
    },
    user: (_, { id }) => {
      return data.users.filter(user => user.id === id)[0]
    }
  }
};

export default resolvers;
