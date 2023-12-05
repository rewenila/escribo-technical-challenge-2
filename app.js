// imports
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const moment = require('moment')

const app = express()

// config JSON response
app.use(express.json())

// models
const User = require('./models/User')

// open route - public route
app.get('/', (req, res) => {
  res.status(200).json({ msg: "Bem vindo à minha API!" })
})

// private route
app.get("/user/:id", checkToken, async (req, res) => {
  
  const id = req.params.id

  // check if user exists
  const user = await User.findById(id, '-password')

  if(!user) {
    return res.status(404).json({ msg: 'Usuário não encontrado.' })
  }

  res.status(200).json({ user })
})

function checkToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]
  
  if(!token) {
    return res.status(401).json({ msg: 'Acesso negado.' })
  }

  try {

    const secret = process.env.SECRET

    jwt.verify(token, secret)

    next()

  } catch(error) {
    res.status(400).json({ msg: 'Token inválido.' })
  }

}

// register user
app.post('/auth/register', async(req, res) => {

  const {name, email, password, confirmpassword, phone} = req.body

  // validations
  if(!name) {
    return res.status(422).json({ msg: 'O nome é obrigatório.' })
  }

  if(!email) {
    return res.status(422).json({ msg: 'O email é obrigatório.' })
  }
    
  if(!password) {
    return res.status(422).json({ msg: 'A senha é obrigatória.' })
  }

  if(password !== confirmpassword) {
    return res.status(422).json({ msg: 'As senhas não conferem.' })
  }

  if(!phone) {
    return res.status(422).json({ msg: 'O telefone é obrigatório.' })
  }

  // check if user already exists
  const userExists = await User.findOne({ email: email })

  if (userExists) {
    return res.status(422).json({ msg: 'O email já está sendo utilizado.' })
  }

  // create password
  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)

  // get current date and time
  const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss')

  // create user
  const user = new User({
    name,
    email,
    password: passwordHash,
    phone,
    date_creation: currentDateTime,
    date_update: currentDateTime,
    last_login: null,
  })

  try {
    await user.save()

    res.status(201).json({ msg: 'Usuário criado com sucesso.' })  
  } catch(error) {
    console.log(error)

    res.status(500).json({
        msg: 'Ocorreu um erro no servidor, tente novamente mais tarde.'
    })
  }
})

// login user
app.post("/auth/login", async (req, res) => {
  const{ email, password } = req.body

  // validations
  if(!email) {
    return res.status(422).json({ msg: 'O email é obrigatório.' })
  }

  if(!password) {
    return res.status(422).json({ msg: 'A senha é obrigatória.' })
  }

  // check if user exists
  const user = await User.findOne({ email: email })

  if (!user) {
    return res.status(404).json({ msg: 'Usuário não encontrado.' })
  }

  // check if password match
  const checkPassword = await bcrypt.compare(password, user.password)

  if (!checkPassword) {
    return res.status(422).json({ msg: 'Senha inválida.' })
  }

  // get current date and time
  const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss')

  // update user last login
  user.last_login = currentDateTime

  try {
    await user.save()
    
    const id = user.id
    const date_creation = user.date_creation
    const date_update = user.date_update
    const last_login = user.last_login
    const secret = process.env.SECRET
    const token = jwt.sign(
      {
        id: user._id,
      },
      secret,
    )

    res.status(200).json({ msg: 'Autenticação realizada com sucesso.', id, date_creation, date_update, last_login, token })

  } catch(err) {
    console.log(err)

    res.status(500).json({
        msg: 'Ocorreu um erro no servidor, tente novamente mais tarde.'
    })
  }

})

// credentials

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS
 
mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.rptmwya.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(3000)
        console.log('Conectou ao banco.')
    })
    .catch((err) => console.log(err))