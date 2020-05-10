# docker_nodejs_mysql_restapi

How to RUN the nodejs_mysql REST API

1> Build dockerfile by using docker build then create the docker image nodejs_mysql

          docker build -t nodejs_mysql .

2> Run the docker image nodejs_mysql by follow command

        docker run -it -p 8080:8080 nodejs_mysql bash

3> Start the mySql and Nodejs server follow the command in

        ./script.sh

ex: root@dfc71a8624bf:/home/app# ./script.sh


4> Run the rest api in postman by using following URL:

        http://localhost:8080/user
