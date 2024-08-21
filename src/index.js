const express = require('express');
const PromptController = require('./Controllers/promptControll');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));

const promptController = new PromptController();

app.get('/prompts', (req, res) => promptController.getAll(req, res));
app.get('/prompts/:id', (req, res) => promptController.get(req, res));
app.post('/prompts', (req, res) => promptController.create(req, res));
app.put('/prompts/:id', (req, res) => promptController.update(req, res));
app.delete('/prompts/:id', (req, res) => promptController.delete(req, res));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
