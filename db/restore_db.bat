@echo off
setlocal

set "DB_NAME=postgres"
set "USER=postgres"
set "PASSWORD=matheus123"
set "HOST=localhost"
set "PORT=5432"
set "INPUT_FILE=D:\Code\Projetos\Reactb7web\ts-form\db\backup.sql"

set "PGPASSWORD=%PASSWORD%"
createdb -h %HOST% -U %USER% -p %PORT %DB_NAME%
pg_restore -h %HOST% -U %USER% -d %DB_NAME% -p %PORT% -v %INPUT_FILE%

endlocal
pause
