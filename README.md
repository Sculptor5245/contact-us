# Contact Us Application

This project is a full-stack web application that includes a React frontend and an Express API backend. The application is containerized using Docker and can be easily set up and run locally.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### Running the Application

1. **Build and start the containers**:
   
   Use Docker Compose to build and run the project. This command will build both the React frontend and the Express API containers.
   ```bash
    docker-compose up --build
    ```
2. **Access the application**
   
   Once the containers are up and running, open your web browser and navigate to:
   ```prolog
   http://localhost:3000
   ```
You should see the Contact Us web application running.

# Project Structure
* **contact-form-app**: This directory contains the React frontend.
* **contact-us-api**: This directory contains the Express API backend.


# Environment Variables
The project uses environment variables to manage the API URL for different environments. These are configured in the .env files located in the contact-form-app directory:

* **.env.development**: Used for local development.
* **.env.production**: Used for the production environment within Docker.

# Stopping the Application
To stop the application, press `Ctrl + C` in the terminal where the `docker-compose up` command was run. This will stop the containers and the application will no longer be accessible.
 or ```bash
    docker-compose down
    ```

#  Troubleshooting
If you encounter any issues while running the application, please check the following:
```bash
docker-compose logs
```

### Note
I decided to use sqlite for the database because it is a lightweight database that is easy to set up and use. It is also a good choice for small applications like this one. However, it is not recommended for production applications. I will use a more robust database like PostgreSQL or MySQL.