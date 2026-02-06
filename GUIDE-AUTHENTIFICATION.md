# 🔐 GUIDE DU SYSTÈME D'AUTHENTIFICATION - Syntaxa AI

## ✨ Vue d'ensemble

Votre IA dispose maintenant d'un **système complet de gestion de comptes** :

- 🔑 **Inscription** - Création de compte
- 🚪 **Connexion** - Authentification sécurisée  
- 👤 **Profil utilisateur** - Gestion de compte
- 💾 **Sauvegarde** - Conversations et paramètres personnels
- 🔒 **Sécurité** - Sessions et protection des données

---

## 📋 Fichiers du Système

### Fichiers Créés

1. **`auth-login.html`** - Page de connexion/inscription
2. **`auth-integration.js`** - Script d'intégration avec l'IA
3. **`syntaxa-ai-pro.html`** - IA (à mettre à jour)

---

## 🚀 Installation

### Étape 1 : Organisation des Fichiers

Placez tous les fichiers dans le même dossier :

```
📁 syntaxa-ai/
  ├── 📄 auth-login.html          ← Page de connexion/inscription
  ├── 📄 syntaxa-ai-pro.html      ← L'application IA
  ├── 📄 auth-integration.js      ← Script d'authentification
  ├── 📄 index.html               ← Page d'accueil (optionnel)
  ├── 🐍 lancer-serveur.py        ← Serveur local
  └── 💻 DEMARRER.bat             ← Lanceur Windows
```

### Étape 2 : Intégration dans syntaxa-ai-pro.html

Ouvrez `syntaxa-ai-pro.html` et ajoutez JUSTE AVANT la balise `</body>` :

```html
<!-- Système d'authentification -->
<script src="auth-integration.js"></script>
</body>
</html>
```

### Étape 3 : Modification du Point d'Entrée

Changez la page de démarrage :

**Avant :**
```
http://localhost:8000/syntaxa-ai-pro.html
```

**Maintenant :**
```
http://localhost:8000/auth-login.html
```

---

## 🎯 Fonctionnalités

### 1. 📝 Inscription

**Processus :**
1. Cliquez sur l'onglet "Inscription"
2. Remplissez le formulaire :
   - Nom complet
   - Email
   - Mot de passe (minimum 8 caractères)
   - Confirmation du mot de passe
3. Acceptez les conditions
4. Cliquez "Créer mon compte"

**Sécurité du mot de passe :**
- ✅ Indicateur de force en temps réel
- ✅ Minimum 8 caractères
- ✅ Vérification de correspondance

### 2. 🔑 Connexion

**Processus :**
1. Entrez votre email
2. Entrez votre mot de passe
3. (Optionnel) Cochez "Se souvenir de moi"
4. Cliquez "Se connecter"

**Option "Se souvenir de moi" :**
- ✅ Activé : Session valide 24h
- ❌ Désactivé : Session valide jusqu'à fermeture du navigateur

### 3. 👤 Gestion du Profil

**Accès aux paramètres :**
- Dans la sidebar de l'IA
- Cliquez sur "⚙️ Paramètres"

**Modifications possibles :**
- Nom d'affichage
- Clé API OpenAI (sauvegardée)
- Visualisation des statistiques

### 4. 💾 Sauvegarde Automatique

**Données sauvegardées par utilisateur :**
- ✅ Clé API OpenAI
- ✅ Conversations
- ✅ Préférences
- ✅ Historique

### 5. 🚪 Déconnexion

**Comment se déconnecter :**
- Cliquez sur "🚪 Déconnexion" dans la sidebar
- Ou fermez le navigateur (si "Se souvenir" non coché)

---

## 🔒 Sécurité

### Protection des Données

**Stockage local :**
- Les données sont stockées dans le navigateur (localStorage)
- Aucune donnée n'est envoyée à un serveur externe
- Chaque utilisateur a ses propres données isolées

### Sessions

**Durée de vie :**
- **Avec "Se souvenir"** : 24 heures
- **Sans "Se souvenir"** : Jusqu'à fermeture du navigateur

**Validation :**
- Vérification automatique à chaque chargement
- Redirection vers login si session expirée

### Mot de Passe

**⚠️ IMPORTANT :**
Les mots de passe sont stockés **en clair** dans localStorage.

**Pour la production, il faudrait :**
1. Backend avec base de données
2. Hashage des mots de passe (bcrypt)
3. Tokens JWT pour les sessions
4. HTTPS obligatoire

---

## 💡 Utilisation

### Premier Lancement

1. **Lancez le serveur**
   ```bash
   # Windows
   DEMARRER.bat
   
   # Mac/Linux
   python3 lancer-serveur.py
   ```

2. **Ouvrez** : `http://localhost:8000/auth-login.html`

3. **Créez votre compte**
   - Onglet "Inscription"
   - Remplissez le formulaire
   - Validez

4. **Connectez-vous**
   - Basculez sur "Connexion"
   - Entrez vos identifiants
   - Accédez à l'IA !

### Utilisation Quotidienne

1. **Ouvrez** : `http://localhost:8000/auth-login.html`

2. **Connexion automatique** (si "Se souvenir" activé)
   - Redirection automatique vers l'IA

3. **Ou connectez-vous** manuellement
   - Vos conversations sont sauvegardées
   - Votre clé API est chargée automatiquement

---

## 🎨 Personnalisation

### Changer les Couleurs

Dans `auth-login.html`, modifiez les variables CSS :

```css
:root {
    --accent-primary: #3b82f6;  /* Bleu principal */
    --accent-hover: #2563eb;    /* Bleu hover */
    --success: #10b981;         /* Vert succès */
    --error: #ef4444;           /* Rouge erreur */
}
```

### Ajouter des Champs

Dans `auth-login.html`, section inscription :

```html
<div class="form-group">
    <label for="register-company">Entreprise</label>
    <input 
        type="text" 
        id="register-company" 
        class="form-input" 
        placeholder="Nom de votre entreprise"
    >
</div>
```

Puis dans le JavaScript :

```javascript
const company = document.getElementById('register-company').value;
newUser.company = company;
```

---

## 🔧 Fonctionnalités Avancées

### Connexion Sociale (Google, GitHub)

**Actuellement :**
- Boutons présents mais non fonctionnels
- Affichent un message "Bientôt disponible"

**Pour activer :**
Nécessite :
1. Backend avec OAuth2
2. Clés API Google/GitHub
3. Gestion des tokens

### Récupération de Mot de Passe

**Actuellement :**
- Fonction basique avec prompt()
- Pas d'envoi d'email réel

**Pour activer :**
Nécessite :
1. Backend avec serveur email
2. Génération de tokens de réinitialisation
3. Page de réinitialisation

### Multi-sessions

**Actuellement :**
- Une session par navigateur
- Déconnexion automatique des anciennes sessions

**Pour améliorer :**
- Gestion de sessions multiples
- Liste des appareils connectés
- Déconnexion à distance

---

## 📊 Structure des Données

### Format Utilisateur

```javascript
{
    id: 1234567890,                    // Timestamp de création
    name: "Jean Dupont",               // Nom complet
    email: "jean@example.com",         // Email (unique)
    password: "motdepasse123",         // Mot de passe (en clair - à hasher en prod)
    createdAt: "2026-02-06T10:30:00Z", // Date de création
    apiKey: "sk-...",                  // Clé OpenAI (optionnel)
    conversations: [...],              // Historique des conversations
    preferences: {...}                 // Préférences utilisateur
}
```

### Format Session

```javascript
{
    email: "jean@example.com",    // Email de l'utilisateur
    name: "Jean Dupont",          // Nom pour affichage
    loginTime: 1234567890000,     // Timestamp de connexion
    rememberMe: true              // Si "Se souvenir" activé
}
```

---

## 🐛 Résolution de Problèmes

### "Aucun compte trouvé"

**Solutions :**
1. Vérifiez l'orthographe de l'email
2. Créez un compte si nouveau
3. Vérifiez dans la console : `localStorage.getItem('syntaxa_users')`

### "Mot de passe incorrect"

**Solutions :**
1. Vérifiez les majuscules/minuscules
2. Réinitialisez via "Mot de passe oublié"
3. Créez un nouveau compte si nécessaire

### Session expirée constamment

**Solutions :**
1. Activez "Se souvenir de moi"
2. Vérifiez l'horloge de votre système
3. Vérifiez la console pour erreurs

### Données perdues

**Solutions :**
1. Vérifiez que vous êtes sur le même navigateur
2. Ne pas utiliser le mode navigation privée
3. Exportez vos conversations régulièrement

### Redirection infinie

**Solutions :**
1. Vérifiez la console JavaScript
2. Supprimez le localStorage : `localStorage.clear()`
3. Reconnectez-vous

---

## 🚀 Améliorations Futures

### Version Production

Pour déployer en production, il faudrait :

**Backend :**
- ✅ Serveur Node.js/Python/PHP
- ✅ Base de données (PostgreSQL/MySQL)
- ✅ Hashage des mots de passe (bcrypt)
- ✅ JWT pour authentification
- ✅ Rate limiting
- ✅ HTTPS obligatoire

**Fonctionnalités :**
- ✅ Email de vérification
- ✅ Réinitialisation de mot de passe par email
- ✅ OAuth2 (Google, GitHub, etc.)
- ✅ 2FA (authentification à deux facteurs)
- ✅ Gestion des sessions multiples
- ✅ Logs d'activité
- ✅ Export/import de données

**Sécurité :**
- ✅ Protection CSRF
- ✅ Protection XSS
- ✅ Limitation de tentatives de connexion
- ✅ Détection d'activité suspecte
- ✅ Chiffrement des données sensibles

---

## 📞 Support

### Problèmes Courants

**Q: Mes conversations disparaissent**
R: Vérifiez que vous utilisez le même navigateur et pas le mode privé

**Q: Je ne peux pas me connecter**
R: Créez un nouveau compte ou vérifiez vos identifiants

**Q: La clé API ne se sauvegarde pas**
R: Vérifiez que vous êtes connecté et cliquez sur "Sauvegarder" dans les paramètres

**Q: Comment changer mon mot de passe ?**
R: Actuellement via "Mot de passe oublié" puis recréation de compte

---

## ✅ Checklist de Mise en Place

- [ ] Fichiers copiés dans le même dossier
- [ ] `auth-integration.js` ajouté à `syntaxa-ai-pro.html`
- [ ] Serveur local lancé
- [ ] Compte créé et testé
- [ ] Connexion fonctionnelle
- [ ] Clé API sauvegardée
- [ ] Conversations sauvegardées
- [ ] Déconnexion testée

---

## 🎉 Conclusion

Vous avez maintenant un **système d'authentification complet** pour votre IA !

**Avantages :**
- 🔐 Sécurité des données
- 👤 Profils personnalisés
- 💾 Sauvegarde automatique
- 🎨 Interface professionnelle
- 🚀 Prêt à l'emploi

**Profitez de Syntaxa AI avec votre compte personnel ! 🤖✨**
