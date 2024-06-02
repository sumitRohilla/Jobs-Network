# Learning - React Job Network

<a href="https://sumitrohilla.github.io/React-Job-Network/"><img src="https://img.shields.io/badge/-Website%20Link-4285F4?style=for-the-badge&logo=React&logoColor=#61dbfb"/></a>

## React Project :

• This is a learning project to improve understanding of React.js, React Routers.\
• We have used Vite with React + JavaScript for creating this project.\
• In this website we have used React for Front-end, Tailwindcss for CSS.\
• This website is also using Json Server for fetching data as Back-end.\
• We have used React Routers for Creating Routes to Multiple pages.\
• This website is also using Json Server for fetching data as Back-end.\
• UI for this is inspired by Reacts official Website and it is also a responsive website.

## Create Project using Vite :

• Install React via npm using Vite.

```
npm create vite@latest my-project
cd my-project
npm install
```

## Install React Router DOM :

• Install React Router DOM via npm with below command.

```
npm install react-router-dom
```

## Install React icons :

• Install React icons via npm with below command.

```
npm install react-icons
```

## Install Json Server :

• Install Json Server as Dependency via npm with below command.

```
npm i -D json-server
```

• Add below command under scripts in package.json file for running the server.

```
"server": "json-server --watch *file-location* --port *port*
```

## Install Tailwind CSS :

• Install tailwindcss via npm, and create your tailwind.config.js file.

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Configure your template paths :

• Add the paths to all of your template files in your tailwind.config.js file.

```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Add the Tailwind directives to your CSS :

• Add the @tailwind directives for each of Tailwind’s layers to your main CSS file.

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Start the Server :

• Use below COMMOND to start build process

```
npm run dev
```

## FRONT-END :

FRONT-END development is the development of those elements of a website that the customer sees and interacts with directly.

## HTML :

• HyperText Markup Language is the standard markup language used to create web pages.\
• It is written in the form of HTML elments consisting of tag enclosed in angles brackets.

## CSS :

• Cascading Style Sheets is a style sheet language used for describing the look and formatting of a document written in a markup language.

## JavaScript :

• JavaScript is a client scripting language which is used for creating web pages.\
• It also allows to make webpage to be dynamic and add special effects.
