const Prompts = require('../Models/promtModel');

class PromptService {
    constructor() {
        this.prompts = new Prompts();
    }

    createPrompt(promptData) {
        return this.prompts.create(promptData);
    }

    updatePrompt(id, updatedData, username) {
        return this.prompts.update(id, updatedData, username);
    }

    getPrompt(id, username) {
        return this.prompts.get(id, username);
    }

    getAllPrompts(username) {
        return this.prompts.getAll(username);
    }

    deletePrompt(id, username) {
        return this.prompts.delete(id, username);
    }
}

module.exports = PromptService;
