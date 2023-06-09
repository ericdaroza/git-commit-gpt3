const fs = require('fs');

class TextFile {
  constructor(fileName, content) {
    this.fileName = fileName;
    this.content = content;
  }

  create() {
    fs.writeFile(this.fileName, this.content, (err) => {
      if (err) {
        console.error('Error creating the file:', err);
        return;
      }

      console.log('File created successfully.');
    });
  }

  read() {
    fs.readFile(this.fileName, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading the file:', err);
        return;
      }

      console.log('File content:', data);
    });
  }

  delete() {
    fs.unlink(this.fileName, (err) => {
      if (err) {
        console.error('Error deleting the file:', err);
        return;
      }

      console.log('File deleted successfully.');
    });
  }
}

module.exports = TextFile;