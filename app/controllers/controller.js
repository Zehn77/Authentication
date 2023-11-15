const User = require('../models/model')
const Book = require('../models/book.model')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

const getBooks = async (req, res) => {
    const books = await Book.find( { userId: req.userId } )
    return await res.json( { books } )
}

const addBook = async (req, res) => {

    const user = await User.findOne({ _id: req.userId });

    const newBook = await Book.insertMany({
        name: req.body.name,
        naem: req.body.pages,
        userId: req.userId,
        username: user.login
    })

    return await res.send({ message: "Book was added successfully!", newBook })
}

const registr = async (req, res) => {
    
    const existingUser = await User.findOne( { login: req.body.login } )

    if (existingUser) {
        console.log('alik');
        res.send( { message: 'This login already registrated, Please choose another login' })
        return
    }


    const newUser = new User({
        login: req.body.login,
        password: bcrypt.hashSync(req.body.password, 8),
        age: req.body.age,
        phone: req.body.phone,
        email: req.body.email
    })

    console.log(newUser)

    
    await newUser.save()
        .then((user) => {
            console.log('Item added:', user);
        })
        .catch((error) => {
            console.error('Failed to add item:', error);
        });

    return await res.send({ message: "User was registered successfully!" })
}

const login = async (req, res) => {
    const user = await User.findOne({ login: req.body.login })
    if (!user) {
        res.send({ message: "We cannot find this login" });
        return;
    }

    const passwordIsValid = await bcrypt.compare(req.body.password, user.password)

    if (!passwordIsValid) {
        res.send({ message: "Your password was wrong" });
        return;
    }

    const access_token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: 7200 // 31536000 // 2 hours = 2 * 60 * 60 (7200)
    });

    const refresh_token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: 7200000 // 31536000 // 2 hours = 2 * 60 * 60 (7200)
    });

    res.status(200).send({
        success: true,
        data: {
          _id: user?._id,
          access_token: access_token,
          refresh_token: refresh_token,
          login: user.login
        },
        error: {
        }
    });
}

const removePhone = async (req, res) => {
    console.log(req.body)
    return await res.send('Phone removed')
}

module.exports = {
    getBooks,
    registr,
    login,
    removePhone,
    addBook
}