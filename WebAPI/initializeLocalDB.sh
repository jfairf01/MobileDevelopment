# Command to start the postgreSQL server and psql shell in your terminal:

pg_ctl -D /usr/local/var/postgres start
psql -d template1 

# Then use the command below to create your database:
# create database mobile_dev_api;
# To connect to it, use \connect mobile_dev_api
# \? and \h commands are your friends :)