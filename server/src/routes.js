module.exports = (app) => {
  app.post('/register',(req,res) => {
    res.send({
        message : `hello ${req.body.password}! your user was registered!`
    })
  })
  app.get('/status' , (req , res) => {
    res.send({
        message : 'hello world'
    })
  })
}
