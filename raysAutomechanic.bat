@echo off
echo Starting Web server...
cd /d C:\Users\traco\OneDrive\Desktop\Git\Beetle
cmd /c npm run startP

@REM cscript //nologo invisible.vbs "cmd /c npm run startP"

TIMEOUT /T 2 /NOBREAK
echo Starting Database...
cd /d C:\xampp\mysql\bin
cscript //nologo invisible.vbs "mysqld.exe"


TIMEOUT /T 2 /NOBREAK
echo Opening browser...
start "" chrome http://localhost:3000/Customers/Agenda