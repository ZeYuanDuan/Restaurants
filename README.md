# AC Restaurant List

Explore restaurants by name and category, discovering detailed information and ratings on our website. It's built by using [Node.js](https://nodejs.org/en) + [Express](https://www.npmjs.com/package/express), with the template engine [express-handlebars](https://www.npmjs.com/package/express-handlebars).

## Preview

![website preview](/image/website-preview.png)

## Environment Setup

This project requires [Node.js](https://nodejs.org/en) to be installed on your system for execution.

## Features

- Users can click on restaurants to view detailed information.
- Users can search by restaurant name or category.

## Installing

Execute the installation process in the terminal (for Windows users, execute on [Git Bash](https://gitforwindows.org/)):

1. Use the following command to clone this project to your desired local folder:

```
git clone https://github.com/ZeYuanDuan/Restaurants.git
```

2. Change directory to the project folder.

```
cd Restaurants
```

3. Install npm packages.

```
npm install
```

4. After installation, use the command to run the server:

```
npm run dev
```

To access the website, enter the URL in your browser: [http://localhost:3000](http://localhost:3000), or click on the link in the console.

## Version Control

This project has the package [commitizen](https://www.npmjs.com/package/commitizen) installed to assist developers in writing commit messages. The usage process is as follows:

1. As with regular git operations, use `git add` to add files to the staging area.
2. You can use the traditional `git commit` to commit files, or use the command:

```
npx cz
```

3. At this point, an interactive console window will appear. Select the type of changes made (build, feat, etc.) and follow the prompts to fill in the message.

For more information, visit [commitizen](https://www.npmjs.com/package/commitizen).
