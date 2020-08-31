export let API_HOST = 'http://localhost:7000'
if (process.env.NODE_ENV === 'test') {
  API_HOST = 'http://localhost'
}
