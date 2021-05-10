- University Name - SJSU

- Course: Enterprise Software - CMPE172/ Fall2020

- Team Members
    Yongen Chen
    David Danialy
    Athena Nguyen

- Project Introduction:
    Full-stack web application that lets users browse games, post reviews for games, and view other users' reviews.

- Sample Demo Screenshots
    https://cdn.discordapp.com/attachments/805994143641370689/840837652889731072/Screenshot_413.png

- Folder Structure
    frontend
        src
    backend
        src
    scripts
        build_backend.sh
        build_frontend.sh
        start_backend.sh
        start_frontend.sh
        stop_backend.sh
        stop_frontend.sh
    README.md

- How to run project locally:

    Backend: cd to Backend folder on a linux machine and run "docker-compose up --build". It will create a docker container with images 
    for the MySQL Database, Redis, and the server. Start and stop the container or images through docker. You can go to http://localhost:9090 
    to view the GraphQL Playground.

    Frontend: cd to Frontend folder on a linux machine and run "npm start". It will run the app in development mode, and you can go to 
    http://localhost:3000 to view the frontend.

    Alternatively, you could use the scripts.

-Project Diagrams:
    Sequence Diagram
    https://cdn.discordapp.com/attachments/840842108419964979/840842113935343646/unknown.png

    Database Schema Diagram
    https://cdn.discordapp.com/attachments/840842108419964979/840842232063328276/unknown.png

    System Diagram
    https://cdn.discordapp.com/attachments/840842108419964979/840842326574366741/unknown.png
