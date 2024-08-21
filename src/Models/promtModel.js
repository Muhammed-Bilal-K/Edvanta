const fs = require('fs');
const path = require('path');


class Prompts {
    constructor() {
        this.filePath = path.join(__dirname, '../Api/prompts.json');
        this.prompts = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
    }

    create(promptData) {
        const newPrompt = { ...promptData, _id: new Date().getTime().toString() };
        this.prompts.push(newPrompt);
        this.save();
        return newPrompt;
    }

    update(id, updatedData, username) {
        const index = this.prompts.findIndex(prompt => prompt._id === id);
        if (index === -1) throw new Error('Prompt not found');
        const prompt = this.prompts[index];
        if (prompt.actor.username !== username && prompt.visibility !== 'public') {
            throw new Error('Access denied');
        }
        this.prompts[index] = { ...prompt, ...updatedData };
        this.save();
        return this.prompts[index];
    }

    get(id, username) {
        const prompt = this.prompts.find(prompt => prompt._id === id);
        if (!prompt) throw new Error('Prompt not found');
        const sharedAccessList = Array.isArray(prompt.sharedAccess) ? prompt.sharedAccess : [];   
        if (prompt.visibility === 'public' || prompt.actor.username === username || sharedAccessList.includes(username)) {
            return prompt;
        } else {
            throw new Error('Access denied');
        }
    }

    getAll(username) {        
        return this.prompts.filter(prompt => {
            const sharedAccessList = Array.isArray(prompt.sharedAccess) ? prompt.sharedAccess : [];            
            return prompt.visibility === 'public' ||
                   prompt.actor.username === username ||
                   sharedAccessList.includes(username);
        });
    }

    delete(id, username) {
        const index = this.prompts.findIndex(prompt => prompt._id === id);
        if (index === -1) throw new Error('Prompt not found');
        const prompt = this.prompts[index];
        if (prompt.actor.username !== username) {
            throw new Error('Access denied');
        }
        this.prompts.splice(index, 1);
        this.save();
    }

    save() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.prompts, null, 2), 'utf8');
    }
}

module.exports = Prompts;
