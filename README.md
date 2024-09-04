# Micro Earn

## Introduction

Briefly introduce your project here. Mention what it does and why it is useful.

**Client Side Github Repository Link:** https://github.com/rakibgithub21/Micro_Earn-client_site

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

List the tools and software you need to install to run the project.

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/yourproject.git
    ```

2. Navigate to the project directory:

    ```bash
    cd yourproject
    ```

3. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

    
4. Install `nodemon` globally to facilitate automatic restarting of the application when changes are made:

    ```bash
    npm install -g nodemon
    ```

### Environment Variables
To run this project,add your url
```url
example:Add your own
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.****.mongodb.****/?retryWrites=true&w=majority&****=Cluster0`;
```


To run this project, you will need to add the following environment variables to your `.env` file:

    ```env
    USER_NAME=mongodb database user name
    USER_PASSWORD=mongodb databse user password
    ACCESS_TOKEN_SECRET=for jwt your secret key [its up to you ]
    STRIPE_SECRET_KEY=sk_test_[add your own stripe key]
    ```

Make sure to keep these values secure and do not expose them in public repositories.

### Running the Project

To start the development server using `nodemon`, run:

    ```bash
    nodemon index.js
    ```

`nodemon` will automatically restart the server whenever you make changes to your code, making development more efficient.

### Code Explanation

Below is a brief explanation of the provided code and what additional setup is needed:

1. **Dependencies**: The project uses `express`, `cors`, `jsonwebtoken`, and `stripe`. These should already be installed as part of your dependencies.

2. **Environment Configuration**: The project uses environment variables for sensitive information. Make sure you have a `.env` file with the necessary keys.

3. **CORS Setup**: The project allows requests from specific origins defined in `corsOptions`. This is useful for controlling which domains can access your API.

4. **Middleware**: The project uses CORS and JSON middleware to handle cross-origin requests and JSON payloads respectively.

Here's the provided code snippet with additional setup instructions:

const corsOptions = {
    origin: [
        'set your origin',
        'example:http://localhost:5174',
    ]
};

