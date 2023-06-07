#!/usr/bin/env nod

import fs from 'fs';
import openai from 'openai';
import prompts from 'prompts';
import dotenv from 'dotenv';
import { promisify } from 'util';
import { exec as originalExec } from 'child_process';

dotenv.config();

openai.apiKey = process.env.OPENAI_API_KEY;

const exec = promisify(originalExec);

async function getGitSummary() {
  try {
    const { stdout } = await exec('git diff --cached --stat');
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

  const prompt = `Generate a Git commit message based on the following summary: ${gitSummary}\n\nCommit message: `;
  const response = await openai.Completion.create({
    engine: 'davinci-codex',
    prompt: prompt,
    max_tokens: 50,
    n: 1,
    stop: null,
    temperature: 0.5,
  });

  const message = response.choices[0].text.trim();

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
})();