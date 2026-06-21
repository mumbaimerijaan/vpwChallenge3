const fs = require('fs');
const quizPath = 'quiz/data/questions.json';
const storyPath = 'build/data/carbon-story.json';

if (fs.existsSync(quizPath)) {
    let content = fs.readFileSync(quizPath, 'utf8');
    content = content.replace(/"images\//g, '"');
    fs.writeFileSync(quizPath, content);
}

if (fs.existsSync(storyPath)) {
    let content = fs.readFileSync(storyPath, 'utf8');
    content = content.replace(/"images\//g, '"');
    fs.writeFileSync(storyPath, content);
}
