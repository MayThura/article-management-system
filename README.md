# Article Management System

## Introduction

Welcome to the Article Management System! This project is a fully functional front-end application built with React Js that allows users to manage articles, including creating, editing, viewing, and deleting articles. The application also includes user authentication and protected routes.

## Features

- **User Authentication (Login/Logout)**
  - Secure login/logout functionality.
  - Example login credentials:
    - Username: `admin1`, Password: `pswd123`
    - Username: `admin2`, Password: `pswd456`
- **Article Management**
  - Create, edit, view, and delete articles in the dashboard.
- **Search and Sort Articles**
  - Search articles by title.
  - Sort articles by title or author.
- **Pagination and Adjustable Page Size**
  - Navigate between pages of articles.
  - Adjust the number of articles displayed per page.
- **Responsive Design**
  - Mobile-friendly and responsive layout.
- **Mock API Layer**
  - Simulated backend interactions.
  - Easy integration with a real backend in the future.

## Live Demo

Check out the live demo of the project:

[Article Management System Live Demo](article-management-system-htfp5i4f0-maythuras-projects.vercel.app)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 20.x or higher)
- npm (version 9.x or higher)

## Installation

Follow these steps to set up the project on your local machine:

1. **Clone the Repository:**

    git clone
    cd article-management-system

2. **Install Dependencies:**

Using npm:

    npm install

## Running the Application

To start the development server, run:

Using npm:

    npm start

Open your browser and navigate to http://localhost:3000 to see the application running.

## Usage
### User Authentication

- **Login:** Users can log in with the provided example credentials. The mock API provides some default users.
- **Logout:** Users can log out by clicking the logout button in the app bar.

### Article Management

- **Create Article:** Click the "Add New Article" button on the dashboard and fill in the required fields to create a new article.
- **View Article:** Click the view button to see the article details.
- **Edit Article:** Click the edit icon next to an article to modify its content.
- **Delete Article:** Click the delete icon next to an article and confirm the deletion in the dialog.

### Search and Sort

- **Search:** Use the search bar to filter articles by title.
- **Sort:** Click on the column headers (Title, Author) to sort the articles.

### Pagination

- **Adjust Page Size:** Use the pagination controls at the bottom of the article list to navigate between pages and adjust the number of articles displayed per page.

## Testing

To run the tests, use the following command:

Using npm:

    npm test