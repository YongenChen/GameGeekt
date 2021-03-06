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
    https://cdn.discordapp.com/attachments/550544717763313667/841436959549423626/unknown.png
    https://cdn.discordapp.com/attachments/550544717763313667/841437102709407744/unknown.png
    https://cdn.discordapp.com/attachments/550544717763313667/841437201098604574/unknown.png
    https://cdn.discordapp.com/attachments/550544717763313667/841437311807651870/unknown.png
    https://cdn.discordapp.com/attachments/550544717763313667/841437511758905364/unknown.png
    https://cdn.discordapp.com/attachments/550544717763313667/841437672588574750/unknown.png

- Folder Structure
    frontend
        src
    backend
        src
    scripts
        build_backend.sh
        start_backend.sh
        start_frontend.sh
        stop_backend.sh
    README.md

- How to run project locally:

    Backend: cd to Backend folder on a linux machine and run "npm i", then "docker-compose up --build". It will create a docker container with images 
    for the MySQL Database, Redis, and the server. Start and stop the container or images through docker commands, or using the scripts. You can go to http://localhost:9090 
    to view the GraphQL Playground.

    Frontend: cd to Frontend folder on a linux machine and run "npm i", then "npm start". It will run the app in development mode, and you can go to 
    http://localhost:3000 to view the frontend.

    Alternatively, you could use the scripts after running "npm i" on the frontend and backend.
    If you are running WSL, then line endings might be changed from LF to CRLF.

-Project Diagrams:
    Sequence Diagram
    https://cdn.discordapp.com/attachments/840842108419964979/840842113935343646/unknown.png

    Database Schema Diagram
    https://cdn.discordapp.com/attachments/840842108419964979/840842232063328276/unknown.png

    System Diagram
    https://cdn.discordapp.com/attachments/840842108419964979/840842326574366741/unknown.png
