# Add the following code to your bash script to clear your PostgreSQL and localhost ports
# You may need to do this upon starting the app, so if it says that your ports are in use
# then run this command by going to your terminal and typing 
# source ~/.bashrc 
# ^ or whatever bash script you add this to...
# clrPorts

clearPorts() {
  lsof -ti:5000 | xargs kill -9 && lsof -ti:6379 | xargs kill -9
}

alias clearPorts=clearPorts