use mysql;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;

create database users;
use users;

DROP TABLE IF EXISTS students;

CREATE TABLE students (
  ID int(11),
  Name varchar(255),
  Age  int(2),
  Department varchar(50),
  Subject set('cs401', 'cs402', 'cs403', 'cs404', 'cs405'),
  PRIMARY KEY (ID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


INSERT INTO `students` VALUES (18223,'Rohit Nale', 23, 'MCS', 'cs401,cs404,cs402,cs403,cs405');

