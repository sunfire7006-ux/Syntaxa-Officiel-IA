@echo off
title Syntaxa IA - Serveur Local
color 0A

echo ========================================
echo    SYNTAXA IA - LANCEMENT DU SERVEUR
echo ========================================
echo.
echo Demarrage du serveur local...
echo.

python lancer_syntaxa.py

if errorlevel 1 (
    echo.
    echo ERREUR: Python n'est pas installe ou n'est pas dans le PATH
    echo.
    echo Telechargez Python sur: https://www.python.org/downloads/
    echo Assurez-vous de cocher "Add Python to PATH" lors de l'installation
    echo.
    pause
)
