const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const router = require(`./routes/routes`)
const app = express()


const PORT = 3000

app.set('view engine', 'ejs')
app.use(express.static(`${__dirname}/public`))
app.use(bodyParser.urlencoded({
    extended: true
}))
mongoose.connect('mongodb://localhost:27017/userDB', {useNewUrlPArser: true})

app.use(router)



app.listen(PORT, () => {
    console.log(`Server started on Port 3000`)
})
