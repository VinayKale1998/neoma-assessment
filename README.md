# SOCIAL-MEDIA-API

## Introduction

Welcome to our Social Media Platform, a robust and user-friendly Node.js application designed for dynamic social interactions and content management. This application, built with Node.js, Express.js, and MongoDB, offers a comprehensive suite of features tailored for an engaging social media experience.

## Key Features

### User Authentication

Secure signup, signin, and signout processes implemented with JSON Web Token (JWT). JWT ensures a secure and stateless way to manage user sessions, enhancing both security and performance.

### Posts Management

Users can effortlessly create, update, delete, and fetch posts. This feature allows for a vibrant user-generated content experience, essential in modern social media applications.

### User Relationships (Follow | Unfollow )

Our platform supports user interactions through follow and unfollow functionalities. Users can also fetch lists of their followers and those they are following, fostering a connected and interactive community.

### Error Handling

We employ custom error classes and handler middlewares to efficiently manage exceptions. This ensures a smooth user experience by providing meaningful feedback for client-side interactions.

### Data Integrity and Validation

Utilizing Express-Validator, our application ensures the integrity of user input, safeguarding against invalid data entries. Mongoose is employed for efficient data modeling with MongoDB, ensuring data consistency and reliability.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Contact Information](#contact-information)

## Prerequisites

Before diving into the setup, here's a quick checklist to ensure a smooth start:

- **Node.js**: I've built this project using Node.js. Ideally, you should have version 14 or newer. If Node.js isn't already on your machine, it's easy to download and install from the [Node.js official website](https://nodejs.org/).

- **MongoDB? No Worries!**: No need to set up MongoDB separately – I've got you covered with `mongo-memory-server`. It runs a MongoDB server in-memory, which is super handy for development purposes and means one less thing for you to install.

- **Dependencies**: All other necessary packages are listed in our `package.json` file. Just run a simple npm install command, and you’ll be all set. npm comes bundled with Node.js.

Once Node.js is up and running on your system and you've cloned the repository, you’re all set to move on to the installation steps. I can't wait to have you try out my project!

## Installation

Getting the project up and running on your local machine is straightforward and should only take a few steps:

1. **Clone the Repository**:
   Start by cloning the project repository to your local machine. Use the command: git clone https://github.com/VinayKale1998/neoma-assessment.git
2. **Install Dependencies**:
   Change to the project directory in your terminal. Install all the required dependencies by running: npm install
   This might take some time, as `mongo-memory-server` is part of the dependencies and can be a bit large. Apologies!

3. **Run the Application**:
   After the dependencies are fully installed, you can launch the application with: npm start
   This will start the server, usually accessible at `http://localhost:3000`. The exact URL and port will be displayed in your console output.

## Configuration

The application is designed to be simple and straightforward, with minimal configuration needed. Once you have completed the installation steps, the application is configured and ready to run. There are no additional environment variables or external setup requirements to worry about.

clone, install, and you’re all set to start using the application.

## Running the Application

After installing the application, getting it up and running is just a matter of a few simple steps:

1. **Start the Server**:
   In the root directory of the project, run the following command to start the server: npm start

2. **Using the Application**:

- The app will be now listening on your localhost 3000 unless there's some other process already listening to port 3000.
- If there is already another app listening to the PORT 3000, kindly navigate to the index.js file in the src directory and assign the PORT variable to a PORT which is available.
- Kindly follow the endpoints in the Swagger Documentation provided below

## API Documentation

## Testing

## Contact Information

If you have any questions, feedback, feel free to reach out to me. Your input and contributions are highly appreciated!

- **Email**: You can email me at [vinaykale1999@gmail.com](mailto:vinaykale1999@gmail.com) for any queries.

- **Phone**: For any additional info or questions, kindly contact me at +91-7975065148 - Vinay

- **LinkedIn**: Connect with me on LinkedIn, Here's my profile: [www.linkedin.com/in/vinay-raghavendra](www.linkedin.com/in/vinay-raghavendra).

Thanks for your time
