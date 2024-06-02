# Learning - React Job Network

<a href="https://sumitrohilla.github.io/React-Job-Network/"><img src="https://img.shields.io/badge/-Website%20Link-23272f?style=for-the-badge&logo=React&logoColor=white"/></a>

## Overview

This project is a learning exercise to enhance understanding of React.js and React Router. It uses Vite to set up a React + JavaScript project, with Tailwind CSS for styling and JSON Server for backend data fetching. The UI is inspired by the official React website and is fully responsive.

## Project Features

- **React for Front-end**: Utilizes React.js for building the front-end.
- **Tailwind CSS**: Employed for efficient and modern styling.
- **JSON Server**: Used for simulating a backend by fetching data from a JSON file.
- **React Router**: Implemented for creating routes to multiple pages.
- **Responsive Design**: The UI is responsive and mobile-friendly, inspired by the official React website.

## Project Setup

### Create Project Using Vite

To create the project using Vite:

```bash
npm create vite@latest my-project
cd my-project
npm install
```

## Install React Router DOM

Install React Router DOM via npm with the following command:

```bash
npm install react-router-dom
```

## Install React Icons

Install React Icons via npm with the following command:

```bash
npm install react-icons
```

## Install JSON Server

Install JSON Server as a development dependency via npm with the following command:

```bash
npm i -D json-server
```

Add the following command under `scripts` in your `package.json` file to run the server:

```jsx
"scripts": {
  "server": "json-server *file-location* --port *port*"
}
```

Run JSON Server with the following command:

```bash
npm run server
```

## Install Tailwind CSS

Install Tailwind CSS via npm and create your `tailwind.config.js` file:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Configure Your Template Paths

Add the paths to all of your template files in your `tailwind.config.js` file:

```jsx
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## Add the Tailwind Directives to Your CSS

Add the `@tailwind` directives for each of Tailwind’s layers to your main CSS file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Start the Development Server

Use the following command to start the build process:

```bash
npm run dev
```

## Front-End Development

Front-end development involves creating the elements of a website that users interact with directly.

### HTML

- **HyperText Markup Language (HTML)**: The standard markup language used to create web pages. It consists of HTML elements defined by tags enclosed in angle brackets.

### CSS

- **Cascading Style Sheets (CSS)**: A style sheet language used for describing the look and formatting of a document written in a markup language.

### JavaScript

- **JavaScript**: A client-side scripting language used for creating dynamic and interactive web pages. It enhances the user experience by adding special effects and functionalities.
