const express = require('express');
const mongoose = require('mongoose');
const User = require('./Schemas/userSchema');
const dotenv = require('dotenv');


const app = express('');
app.use(express.json()),
dotenv.config();


const port = process.env.PORT || 8000;
const db = process.env.DB_LOCAL;


app.get('/', (req, res) => {
    res.send('This is my homepage')
})




mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>{
    console.log('Database connected successfully');
}).catch((err) =>{
    console.log(err)
});

app.get('/', () => {
    res.send('Welcome honurable guest');
});

app.post('/register', async(req, res) => {
    const { name, dob, phoneNumber, email, password } = req.body;

    const user = await User.create({
        name,
        dob,
        phoneNumber,
        email,
        password
    });

    if (user) {
        res.status(201).json({
            status: true,
            message: 'User was created',
            data: user
        })
    } else{
        res.status(400).json({
            status: false,
            message: 'Something went wrong'
        })
    }
});


app.get('/fetch', async(req, res) =>{
    const users = await User.find()


    if(users){
        res.status(200).json({
           status: true,
           message: 'You are a genuis',
           data: users 
        })
    } else{
        res.status(404).json({
            status: false,
            message: 'You are lost'
        })
    }
});



app.delete('/remove/:id', async(req, res)=>{
    const user = await User.findByIdAndDelete(req.params.id)

    if (user){
        res.status(200).json({
            status: true,
            message: 'User has been deleted succesfully',
            data: user,
        })
    } else {
        res.status(400).json({
            status: false,
            message: "Sorry Unable to delete user"
        })
    }
});


app.put('/add/:id', async(req, res)=>{
    const {id} = req.params;
    const changes = req.body;

    const user = await User.updateOne(changes).where({_id: id});

    if(user){
        res.status(200).json({
            status: true,
            message: "Updated",
            data: user
        })
    }else {
        res.status(400).json({
            status: false,
            message: "Sorry something went wrong",
        })
    }
});




app.patch('/edit/:id', async(req, res)=>{
    const {id} = req.params;
    const changes = req.body;

    const user = await User.updateOne(changes).where({_id: id});

    if(user){
        res.status(200).json({
            status: true,
            message: "Updated",
            data: user
        })
    }else {
        res.status(400).json({
            status: false,
            message: "Sorry something went wrong",
        })
    }
});

// app.patch('/edit/:id', async(req, res)=>{
//     const {id} = req.params;
//     const{name, dob, phoneNumber, email, password} = req.body;

//     const user = await User.updateOne({
//         name: name,
//         dob: dob,
//         phoneNumber: phoneNumber,
//         email: email,
//         password: password,
//     }).where({_id: id});

//     if(user){
//         res.status(200).json({
//             status: true,
//             message: "Updated",
//             data: user
//         })
//     }else {
//         res.status(400).json({
//             status: false,
//             message: "Sorry something went wrong",
//         })
//     }
// });






app.listen(port, ()=>{
    console.log('listening on port')
})