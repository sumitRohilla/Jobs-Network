# Jobs Network

[![Website Link](https://img.shields.io/badge/-Website%20Link-23272f?style=for-the-badge&logo=React&logoColor=white)](https://jobs-network.onrender.com/)

## Overview

This project is a learning exercise to enhance understanding of React and Django. It uses Vite to set up a React + JavaScript project, with Tailwind CSS for styling and Django for backend data fetching and authentication. The UI is inspired by the official React website and is fully responsive.

## Project Features

- **React for Front-end**: Utilizes React.js for building the front-end.
- **Tailwind CSS**: Employed for efficient and modern styling.
- **React Router**: Implemented for creating routes to multiple pages.
- **Responsive Design**: The UI is responsive and mobile-friendly, inspired by the official React website.
- **Authentication**: Includes features for user authentication, login, and registration with OTP.
- **CRUD Operations**: Implements functionalities such as adding jobs, applying for jobs, and managing job applications.
- **CSRF Protection**: Utilizes CSRF tokens to protect against Cross-Site Request Forgery.
- **CORS Handling**: Manages Cross-Origin Resource Sharing to allow secure interaction between front-end and back-end.
- **React Spinners**: Integration of loading spinners for improved user experience during data fetching.
- **React Toastify**: Integration of toast notifications for displaying success, error, and information messages.

## Project Setup

### Create Project Using Vite

To create the project using Vite:

```bash
npm create vite@latest my-project
cd my-project
npm install
```

### Install React Router DOM

Install React Router DOM via npm with the following command:

```bash
npm install react-router-dom
```

### Install React Icons

Install React Icons via npm with the following command:

```bash
npm install react-icons
```

### Install React Spinners

Install React Spinners via npm with the following command:

```bash
npm install react-spinners
```

### Install React Toastify

Install React Toastify via npm with the following command:

```bash
npm install react-toastify
```

### Install JSON Server

Install JSON Server as a development dependency via npm with the following command:

```bash
npm i -D json-server
```

Add the following command under `scripts` in your `package.json` file to run the server:

```json
"scripts": {
  "server": "json-server *file-location* --port *port*"
}
```

Run JSON Server with the following command:

```bash
npm run server
```

### Install Tailwind CSS

Install Tailwind CSS via npm and create your `tailwind.config.js` file:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Configure Your Template Paths

Add the paths to all of your template files in your `tailwind.config.js` file:

```javascript
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### Add the Tailwind Directives to Your CSS

Add the `@tailwind` directives for each of Tailwind’s layers to your main CSS file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Start the Development Server

Use the following command to start the build process:

```bash
npm run dev
```

## Integrate React Build with Django

### Build React App for Production

- Generate optimized static files for deployment in React:
  ```bash
  npm run build
  ```
- The build output will be located in the `dist` directory by default.

### Configure Django Settings

- Ensure your Django `settings.py` includes configurations for static files and templates:

  ```python
  import os

  BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

  # Static files (CSS, JavaScript, Images)
  STATIC_URL = '/static/'
  STATICFILES_DIRS = [
      os.path.join(BASE_DIR, 'frontend', 'dist'),
  ]
  ```

### Serve Static Files in Templates

- Update your Django templates to load static files from the React build:

  ```html
  {% load static %}

  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>React Job Network</title>
      <link href="{% static 'css/app.css' %}" rel="stylesheet" />
    </head>
    <body>
      <div id="root"></div>
      <script src="{% static 'js/app.js' %}"></script>
    </body>
  </html>
  ```

### Configure URLs for React App

- Add a URL pattern in Django's `urls.py` to serve the React app:

  ```python
  from django.urls import path
  from django.views.generic import TemplateView

  urlpatterns = [
      path('', TemplateView.as_view(template_name='index.html')),
      # Add other Django URLs as needed
  ]
  ```

### Run Django Migrations and Server

- Apply initial migrations if any database changes are made:
  ```bash
  python manage.py migrate
  ```
- Start the Django development server:
  ```bash
  python manage.py runserver
  ```
- Access your application at `http://localhost:8000`.

## Acknowledgements

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/reference/react/)
- [Django Documentation](https://docs.djangoproject.com/en/stable/)
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/)
