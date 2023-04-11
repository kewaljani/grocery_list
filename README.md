# Grocery List Web App
This is an interactive web app for creating and managing grocery lists. Users can add, edit, delete, and reorder items on their list. The app also stores historical list data in a SQL database for easy access to past shopping lists.

## Technologies Used
React.js for the front-end
Node.js and Express for the back-end
Mysql as database

## Getting Started
To run this app on your local machine, follow these steps:

Clone this repository onto your machine
Install dependencies using npm install
Create a new PostgreSQL database named grocery_list
Create a .env file in the root directory with the following variables:
DB_USER with your PostgreSQL username
DB_PASSWORD with your PostgreSQL password
DB_HOST with the host of your PostgreSQL server (usually localhost)
DB_PORT with the port of your PostgreSQL server (usually 5432)
Run npm run migrate to set up the database schema
Run npm start to start the app
Visit http://localhost:3000 in your web browser to use the app


## Features
Add items to the grocery list
Edit items on the list
Delete items from the list
Change the order of items on the list
View past shopping lists

## Future Improvements
User authentication to allow multiple users to have separate grocery lists
Allow users to share grocery lists with each other
Add a search feature to find specific items on the list or in past lists
Allow users to categorize items by department or type of food
Add a feature to suggest recipes based on items on the grocery list
