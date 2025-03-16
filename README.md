## How to Install

Follow these steps to set up and run the project locally:


0.  **Create Database in your MySQL Workbench:**

     **(User :root and Password: Siddhartha123@)**
    -----------------------------------------
   
    ```
    CREATE DATABASE myapp;
    USE myapp;
    CREATE TABLE users (
    id varchar(50) primary key,
    username varchar(50) unique,
    email varchar(50) unique,
    password varchar(50) not null
    );
    ```
     -----------------------------------------

2.  **Clone the Repository:**

    ```bash
    git clone https://github.com/honeybunnysidd/MySQL-with-Node.git
     cd "mysql-with-node"
    ```

3.  **Install Dependencies:**

    ```bash
    npm install
    ```

4.  **Run the Application:**

    ```bash
    node app.js
    ```

5.  **Open in Your Browser:**

    Open `http://localhost:3000` in your web browser.


## Special Thanks

A heartfelt thank you to Shradha Khapra didi #ApnaCollege for their invaluable support and collaboration. As mentors and teachers, your guidance has been instrumental in shaping the success of this CURD Project. Your dedication to fostering learning and innovation has made a lasting impact, and I'm grateful for the opportunity to learn and grow under your mentorship.

## Author

Siddhartha Raghuvanshi \
Email: siddhartharaghuvanshi01@gmail.com \
LinkedIn : https://www.linkedin.com/in/siddhartha-raghuvanshi/
