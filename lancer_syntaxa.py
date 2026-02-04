#!/usr/bin/env python3
"""
Serveur local pour Syntaxa IA
Double-cliquez sur ce fichier pour lancer le serveur
"""

import http.server
import socketserver
import webbrowser
import os
from pathlib import Path

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Ajouter les headers CORS
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

# Trouver le répertoire où se trouve ce script
script_dir = Path(__file__).parent
os.chdir(script_dir)

Handler = MyHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("=" * 60)
    print("🚀 SYNTAXA IA - SERVEUR LOCAL")
    print("=" * 60)
    print(f"\n✅ Serveur lancé sur : http://localhost:{PORT}")
    print(f"\n📂 Fichiers disponibles :")
    print(f"   - http://localhost:{PORT}/index.html")
    print(f"   - http://localhost:{PORT}/chat.html")
    print(f"   - http://localhost:{PORT}/documentation.html")
    print(f"\n💡 Le navigateur va s'ouvrir automatiquement...")
    print(f"\n⚠️  Pour arrêter le serveur : Fermez cette fenêtre ou appuyez sur Ctrl+C")
    print("=" * 60)
    
    # Ouvrir automatiquement le navigateur
    webbrowser.open(f'http://localhost:{PORT}/chat.html')
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n👋 Serveur arrêté. Au revoir !")
