# Git GPT-3 Commit

This repository hosts a unique Node.js script that uses OpenAI's GPT-3 model to generate meaningful Git commit messages based on the changes made. The script provides a summarized output of the 'git diff --staged' command and uses it as a prompt for the GPT-3 model, which then creates a commit message that adheres to the Conventional Commits specifications. Users have the option to accept or reject the generated message before the commit is made.

## Prerequisites

Before you begin, ensure that you have the following installed on your machine:

- Node.js and npm (Node Package Manager)
- Git
- An OpenAI API Key, which you'll need to store in a .env file in the root of your project as `OPENAI_API_KEY=your_key_here`.

## Cloning the Repository
To clone the repository and start using the script, follow these steps:

1. Open your terminal.
2. Choose a directory for the project.
3. Run the following command to clone the repository:

```bash
$ git clone https://github.com/ericdaroza/git-commit-gpt3.git
```

Move into the newly created directory:

```bash
$ cd git-commit-gpt3
```
Now you can proceed to the setup.

## Setting Up the Script

The script requires a few dependencies, which you can install by navigating to the project directory and running the following command:

```bash
$ npm install
```

This will install the required dependencies listed in the package.json file: [dotenv](https://www.npmjs.com/package/dotenv), [openai](https://www.npmjs.com/package/openai), [prompts](https://www.npmjs.com/package/prompts).

### Creating a Symbolic Link

In order for the script to be executable from any Git repository, you need to create a symbolic link to it using npm's link command. From your project's root directory, run:

```bash
$ npm link
```

This command will create a global symbolic link (symlink) named git-gpt3-commit, which points to your script. With this symlink, you can run the script from any Git repository on your system.

### Using the Git Extension

Once the symlink is created, you can test the script in any of your Git repositories. After making some changes in your repository, stage your changes with:

```bash
$ git add .
```

Then, to generate and review a commit message using the AI model, run:

```bash
$ git gpt3-commit
```

If there are no changes staged for commit, the script will inform you and cancel the commit process. However, if changes are detected, it will use these changes to generate a commit message, which you can then review and approve before it is used to commit your changes.

### Removing the Symbolic Link

If you no longer need to use the extension or if you wish to uninstall it, you can remove the symbolic link by navigating to your project directory and running:

```bash
$ npm unlink
```

This command will remove the git-gpt3-commit symlink from the global node_modules directory.

## Contributing
We appreciate your interest in contributing to our project! Whether you want to report a bug, suggest a feature, or ask a question, we welcome your input. To ensure a smooth and collaborative process, please follow the guidelines below:

### Opening an Issue
If you encounter a bug, have a feature request, or need clarification, please consider opening an issue using one of the provided templates. This will help us understand your needs and ensure a prompt response.

Before opening a new issue, please take a moment to search the existing issues to see if a similar topic has already been raised. This can help avoid duplication and provide valuable insights from previous discussions.

### Contributing Code
If you would like to contribute code to the project, we encourage you to fork the repository and submit a pull request. Before starting your work, please ensure that you have reviewed our [contribution guidelines](CONTRIBUTING.md) for detailed instructions on the development process.

We value the time and effort of all contributors, and we will do our best to provide feedback and keep the lines of communication open throughout the process.

### Be Friendly and Respectful
Remember to maintain a friendly and respectful tone when interacting with other contributors and maintainers. We strive to foster a welcoming and inclusive community where everyone feels comfortable and supported.

Thank you for your interest in contributing to our project. Your involvement and feedback are highly appreciated!

## Conclusion

`git-commit-gpt3` is an innovative way to utilize AI capabilities to streamline your Git workflow. With this extension, you can generate meaningful and standardized commit messages based on the actual changes you made. Try it out to bring more clarity and consistency to your commit history!

I would like to express our gratitude to [Anis Marrouchi](https://www.linkedin.com/in/marrouchi/), whose insightful [LinkedIn article](https://www.linkedin.com/pulse/auto-generating-git-commit-messages-openai-gpt-3-anis-marrouchi/) on auto-generating Git commit messages with OpenAI GPT-3 provided the foundation and inspiration for this script.

For further exploration and examples of harnessing AI for Git commits, we recommend checking out his repository [git-commit-gpt](https://github.com/nooqta/git-commit-gpt) on GitHub.

I believe that AI can be a powerful tool in automating and enhancing various aspects of software development, and this is just one example. Happy coding!


