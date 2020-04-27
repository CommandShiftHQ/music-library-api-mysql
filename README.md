# WIP: MySQL Music Library API


## Setting up the database

This project requires a running MySQL database. To set one up with Docker, run:

```
docker run -d -p 3306:3306 --name music_library_mysql -e MYSQL_ROOT_PASSWORD=<PASSWORD> mysql
```

Once this is running, you will need to create the `music_library` database:

```
docker exec -it music_library_mysql bash
```

From inside the container:

```
mysqy -uroot -p
```
You will then be prompted for your password. After you have authenticated, you can create the database with:

```
CREATE DATABASE music_library;
```