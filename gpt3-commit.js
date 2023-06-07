#!/usr/bin/env node

const fs = require('fs');
const prompts = require('prompts');
const dotenv = require('dotenv');
const { promisify } = require('util');
const { exec: originalExec } = require('child_process');
const { Configuration, OpenAIApi } = require('openai');

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const exec = promisify(originalExec);

async function getGitSummary() {
    try {
        const { stdout } = await exec('git diff --staged');
        const summary = stdout.trim();

        if (summary.length === 0) {
            return null;
        }

        return summary;
    } catch (error) {
        console.error('Error while summarizing Git changes:', error);
        process.exit(1);
    }
}

(async () => {
    const gitSummary = await getGitSummary();
    if (!gitSummary) {
        console.log('No changes to commit. Commit canceled.');
        process.exit(0);
    }

    const prompt = `Generate a Git commit message, respecting the Conventional Commits specifications, based on the following summary generate by 'git diff --staged' command: ${gitSummary}\n\nCommit message: `;

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
          });

        const message = completion.data.choices[0].text.trim();

        const confirm = await prompts({
            type: 'confirm',
            name: 'value',
            message: `Suggested commit message: "${message}". Do you want to use it?`,
            initial: true,
        });

        if (confirm.value) {
            require('child_process').execSync(`git commit -m "${message}"`);
            console.log('Committed with the suggested message.');
        } else {
            console.log('Commit canceled.');
        }
    } catch (error) {
        try {
            console.error('Error occurred during AI completion:', error.response.data.error);
        } catch (other_error) {
            console.error('Error occurred during AI completion:', error);
        }
        process.exit(1);
    }
})();