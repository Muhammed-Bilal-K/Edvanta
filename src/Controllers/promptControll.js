const PromptService = require('../Services/promptService');

class PromptController {
    constructor() {
        this.promptService = new PromptService();
    }

    create(req, res) {
        try {
            const prompt = this.promptService.createPrompt(req.body);
            res.status(201).json(prompt);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    update(req, res) {
        try {
            const prompt = this.promptService.updatePrompt(req.params.id, req.body, req.query.username);
            res.json(prompt);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    get(req, res) {
        try {
            const prompt = this.promptService.getPrompt(req.params.id, req.query.username);
            res.json(prompt);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    getAll(req, res) {
        try {
            console.log(req.query);
            const prompts = this.promptService.getAllPrompts(req.query.username);
            res.json(prompts);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    delete(req, res) {
        try {
            this.promptService.deletePrompt(req.params.id, req.query.username);
            res.status(204).end();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = PromptController;
