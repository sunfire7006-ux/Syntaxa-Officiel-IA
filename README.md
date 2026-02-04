# 🚀 SYNTAXA IA - GUIDE D'INSTALLATION

## ❌ PROBLÈME IDENTIFIÉ
Vous avez une erreur "NetworkError" parce que vous ouvrez les fichiers HTML directement depuis votre ordinateur (file://). Les navigateurs bloquent les requêtes API dans ce cas.

## ✅ SOLUTION - LANCER UN SERVEUR LOCAL

### 📋 CE DONT VOUS AVEZ BESOIN :
1. Python installé sur votre ordinateur
2. Une clé API Groq gratuite

---

## 🔧 ÉTAPE 1 : INSTALLER PYTHON (si pas déjà installé)

### Windows :
1. Allez sur https://www.python.org/downloads/
2. Téléchargez la dernière version
3. **IMPORTANT** : Cochez "Add Python to PATH" pendant l'installation
4. Installez Python

### Mac :
Python est déjà installé sur Mac ! Passez à l'étape 2.

### Linux :
Python est déjà installé ! Passez à l'étape 2.

---

## 🎯 ÉTAPE 2 : LANCER SYNTAXA IA

### Windows :
1. Placez tous les fichiers dans un même dossier :
   - index.html
   - chat.html
   - documentation.html
   - lancer_syntaxa.py
   - LANCER_ICI.bat

2. **Double-cliquez sur `LANCER_ICI.bat`**

3. Le serveur va démarrer et votre navigateur va s'ouvrir automatiquement !

### Mac / Linux :
1. Ouvrez un Terminal
2. Naviguez vers le dossier contenant les fichiers :
   ```bash
   cd /chemin/vers/le/dossier
   ```

3. Lancez le serveur :
   ```bash
   python3 lancer_syntaxa.py
   ```

4. Ouvrez votre navigateur et allez sur : http://localhost:8000/chat.html

---

## 🔑 ÉTAPE 3 : OBTENIR UNE CLÉ API GROQ GRATUITE

1. Allez sur https://console.groq.com
2. Créez un compte (gratuit)
3. Cliquez sur "API Keys" dans le menu
4. Cliquez sur "Create API Key"
5. Copiez la clé (elle commence par `gsk_`)
6. Collez-la dans le champ "Clé API Groq" dans la barre latérale de Syntaxa IA

---

## ✨ C'EST FAIT !

Maintenant vous pouvez :
- 💬 Discuter avec l'IA
- 💻 Générer du code
- 🐛 Débugger vos programmes
- 📚 Apprendre de nouveaux concepts
- ⚡ Optimiser votre code

---

## 🆘 PROBLÈMES COURANTS

### "Python n'est pas reconnu..."
➡️ Python n'est pas installé ou pas dans le PATH. Réinstallez Python en cochant "Add Python to PATH"

### "Module 'http.server' not found"
➡️ Votre version de Python est trop ancienne. Installez Python 3.7 ou plus récent

### L'API répond "Unauthorized"
➡️ Votre clé API n'est pas valide. Vérifiez que vous avez copié TOUTE la clé depuis console.groq.com

### Ça marche toujours pas !
➡️ Essayez de redémarrer votre ordinateur et relancez le serveur

---

## 📞 BESOIN D'AIDE ?

Si rien ne fonctionne, essayez cette alternative ultra-simple :

**MÉTHODE ALTERNATIVE (sans Python) :**
1. Installez l'extension "Live Server" dans VS Code
2. Faites clic droit sur chat.html
3. Sélectionnez "Open with Live Server"

---

🎉 **Bon codage avec Syntaxa IA !**
