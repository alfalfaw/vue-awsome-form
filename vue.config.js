const mockFormData = require('./mock/form.json')
module.exports = {
  devServer: {
    port: 8081,
    before(app) {
      app.get('/api/forms/:id', (req, res) => {
        res.json(mockFormData)
      })
    }
  }
}
