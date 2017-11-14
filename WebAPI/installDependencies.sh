#!/bin/bash
# Install HomeBrew on your mac
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
# Install python on your mac
brew install python3
# Install pip (python package installer)
sudo easy_install pip3
# Install/Upgrade pip
pip3 install -U pip setuptools
# Install PostgreSQL
brew install postgresql
# Sass is a styling sheet language that helps your python code look better
sudo gem install sass
# Redis is a cache memory storage unit to allow you to reload your server VERY quickly
brew install redis
# Honcho runs your procfile to optimize your server
pip install honcho
# Activate your virtual environment, then install the requirements locally
source env/bin/activate
# pip install -r requirements.txt will install all the Flask dependencies and other libraries
# pip3 install -r requirements.txt
# You may not need to run this above command - if it says 'module not found', run this command ^

