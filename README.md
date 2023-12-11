# How to build our project
## Prerequisite
- Your system should have docker installed.
- Your system should have MySQL installed and operating then import "SEHP_proj_db_with_mock_data.sql" to MySQL.

## Building
1. Create dedicated folder for our project
```console
$ mkdir SEHP_proj
```
2. Move working directory to created folder
```console
$ cd SEHP_proj
```
3. Clone repository
```console
$ git clone https://github.com/mynameisO/SE_hotel_project.git
```
4. Create .env for frontend
```console
$ touch ./Frontend/.env
```
5. Edit .env. for frontend. In .env file should contain a variable called REACT_APP_BACKEND_IP which is the IP of the backend and its port(default 5000)

Example
```console
REACT_APP_BACKEND_IP= localhost:5000
```
6. Create .env for frontend 
```console
$ touch ./GNOGBackend/.env
```
7. Edit .env for backend. In .env should contain these variables
- DB_HOST: IP of your database
- DB_PORT: Port of your database
- DB_USER: Username of the account for accessing the database
- DB_PASSWORD: Password of the account for accessing the database 
- DB_DATABASE: Name of database(database that you you import "SEHP_proj_db_with_mock_data.sql")
- secretKeyJWT: You can type anything in this since this will act as a key for JWT.
  
Example
```console
DB_HOST=localhost
DB_PORT=3306
DB_USER=testuser
DB_PASSWORD=testuserpassword
DB_DATABASE=SEHP_proj
secretKeyJWT=MyNotSoSecretKey
```
8. Build the application
```console
$ docker compose up
```
ps. This guide is for testing on localhost only.
