@echo off

REM Open a new terminal window for CLIENT and run npm start
start cmd /k "cd CLIENT && npm start"

REM Open a new terminal window for SERVER and run npm start
start cmd /k "cd SERVER && npm start"

pause
