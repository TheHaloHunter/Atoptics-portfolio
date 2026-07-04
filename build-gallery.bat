@echo off
REM This batch file automates the gallery build process.
REM It must be run from the root of the project directory.

echo ==================================
echo      Building Atoptics Gallery
echo ==================================

REM Run the gallery build script defined in package.json
call npm run gallery:build

echo.
echo Build process finished. Press any key to exit.
pause >nul