FROM ubuntu:16.04
USER root
WORKDIR /home/app
COPY ./package.json /home/app/package.json
COPY . .
RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_11.x  | bash -
RUN apt-get -y install nodejs
RUN npm install
RUN npm install nodemon -g

ENV MYSQL_PWD password
RUN echo "mysql-server mysql-server/root_password password $MYSQL_PWD" | debconf-set-selections
RUN echo "mysql-server mysql-server/root_password_again password $MYSQL_PWD" | debconf-set-selections
RUN apt-get -qy install mysql-server
RUN /bin/sh -c 'service mysql start;mysql -u root -ppassword<"new.sql"'
COPY ./test-dump.sql /docker-entrypoint-initdb.d/
COPY script.sh .
RUN chmod +x script.sh
CMD ["./script.sh"]

