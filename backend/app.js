const express = require('express');
const app = express();
const cors = require("cors")
const db = require('./db'); 
const { v4: uuidv4 } = require('uuid');
const sha256 = require('crypto-js/sha256');
// const router = require('./router');
// app.use('/api', router);


app.use(cors());
app.use(express.json());




// Example route handler using the database connection
app.get('/api/tasks', async (req, res) => {
    try {
        const id = req.params.id;
        const users = await db.any(`SELECT * FROM tasks`);
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// request for delete a todo 
app.delete('/api/tasks/:id',async (req, res) => {
    try{

        const id = req.params.id;
        // await db.none(`DELETE  FROM tasks WHERE id= ${id}`);
        await db.none('DELETE FROM tasks WHERE id = $1', [id]);
        // console.log(id);
        // if(!result){
        //     return res.status(404).send('The task with given ID does not exist.')

        // }else{
        //     return res.status(200).json(result)
        // }
    }
    catch(error) {
        return res.status(500).send('Internal server error')
    }
    });

// request to add todo task
app.post('/api/tasks', async (req, res) => {
    try{
        const  data = req.body;
        //  const result =
        // console.log(data.text);
        // console.log(shortenUUID(uuidv4()));
          await db.none('INSERT INTO tasks (id, text) VALUES ($1, $2)', [uuidv4(), data.text]);

        // res.status(200).json(result);
        res.status(200).json('successfully post request');
    }
    
    catch(error){
        return res.status(500).send('Internal server error');
    }
});

// request to update a task
app.put('/api/tasks/:id', (req, res) => {
    try{
        const id = req.params.id;
        // get data from body of the request
        const data = req.body;
        db.none('UPDATE tasks SET text=$1 WHERE id=$2', [data.text, id]);
        // res.status(200).json("Sucessfully put request");     
        // console.log(data)   
    }
    catch(error) {
        return res.status(500).send('Internal Server Error');
    }
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
