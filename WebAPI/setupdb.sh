#!/bin/bash
source ~/.bashrc
clearPorts
source env/bin/activate
pg_ctl -D /usr/local/var/postgres start
python manage.py recreate_db
python manage.py add_test_data
