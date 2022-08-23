@echo off

for /F "tokens=2" %%i in ('date /t') do set mydate=%%i
set mytime=%time%

echo "git push made on %mydate%:%mytime%"

git add * 
git commit -m "%mydate%:%mytime%"
git push -U origin main