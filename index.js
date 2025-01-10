const input = require('prompt-sync')(); // 'prompt-sync' is a package that allows synchronous user input from the terminal. Use `npm install prompt-sync` as command to install it.
const fileSystem = require('fs'); //'fs'(File System) is a built-in Node.js module for working with files. there is no necessity to install it sha.
const readlineSync = require('readline-sync'); // A Library for interactive CLI

let articles = [];

const loadArticles = () => {
          try {
                    const rawData = fileSystem.readFileSync('articles.json', 'utf-8');
                    articles = JSON.parse(rawData);
          } catch (error) {
                    if (error.code === 'ENOENT') {
                              console.log('File not found. Creating a new articles.json file.');
                              fileSystem.writeFileSync('articles.json', '[]'); // Create an empty JSON file
                              articles = [];
                    } else {
                              console.error("Error loading articles:", error);
                    }
          }
};

const saveArticles = () => {
          try {
                    fileSystem.writeFileSync('articles.json', JSON.stringify(articles, null, 2));
          } catch (error) {
                    console.error("Error saving articles:", error);
          }
};

const createArticle = () => {
          const heading = input('Enter article title: ');
          const content = input('Enter article content: ');
          articles.push({ heading, content });
          saveArticles();
          console.log('You have successfully created an article!');
};

const listArticles = () => {
          console.log('List of articles:');
          if (articles.length === 0) {
                    console.log('You have not added any articles yet.');
                    return;
          }
          articles.forEach((article, index) => {
                    console.log(`${index + 1}. ${article.heading}`);
          });
};

const editArticle = () => {
          listArticles();
          if (articles.length === 0) return;

          const index = parseInt(input('Enter the index of the article to edit: ')) - 1;
          if (index >= 0 && index < articles.length) {
                    const heading = input('Enter new title: ');
                    const body = input('Enter new content: ');
                    articles[index] = { heading, body };
                    saveArticles();
                    console.log('Article edited successfully!');
          } else {
                    console.log('Invalid index.');
          }
};

const deleteArticle = () => {
          listArticles();
          if (articles.length === 0) return;

          const index = parseInt(input('Enter the index of the article to delete: ')) - 1;
          if (index >= 0 && index < articles.length) {
                    articles.splice(index, 1);
                    saveArticles();
                    console.log('Article deleted successfully!');
          } else {
                    console.log('Invalid index.');
          }
};

const viewBlogLink = () => {
          console.log('Visit my blog articles on Medium: https://medium.com/@nzubeakpamgbo/a-comprehensive-guide-in-understanding-the-concept-of-variable-declaration-in-javascript-let-2320b707239d');
};

const mainMenu = () => {
          const options = [
                    'Create Article',
                    'List Articles',
                    'Edit Article',
                    'Delete Article',
                    'View Blog Link',
                    'Exit'
          ];

          while (true) {
                    console.clear();
                    console.log('Use arrow keys to navigate and press Enter to select:');
                    const index = readlineSync.keyInSelect(options, 'Choose an action:', { cancel: false });

                    switch (index) {
                              case 0:
                                        createArticle();
                                        break;
                              case 1:
                                        listArticles();
                                        input('Press Enter to return to the menu...');
                                        break;
                              case 2:
                                        editArticle();
                                        break;
                              case 3:
                                        deleteArticle();
                                        break;
                              case 4:
                                        viewBlogLink();
                                        input('Press Enter to return to the menu...');
                                        break;
                              case 5:
                                        console.log('Goodbye!');
                                        process.exit(0);
                    }
          }
};

function main() {
          loadArticles(); // Load existing articles from the file
          mainMenu();
}

main();