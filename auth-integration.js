// Script d'authentification à ajouter au début de syntaxa-ai-pro.html

// Vérifier l'authentification
function checkAuth() {
    const session = localStorage.getItem('syntaxa_session') || sessionStorage.getItem('syntaxa_session');
    
    if (!session) {
        window.location.href = 'auth-login.html';
        return null;
    }

    const data = JSON.parse(session);
    
    // Vérifier si la session est encore valide
    const maxAge = data.rememberMe ? 24 * 60 * 60 * 1000 : 8 * 60 * 60 * 1000; // 24h ou 8h
    if (Date.now() - data.loginTime > maxAge) {
        logout();
        return null;
    }

    return data;
}

// Fonction de déconnexion
function logout() {
    localStorage.removeItem('syntaxa_session');
    sessionStorage.removeItem('syntaxa_session');
    window.location.href = 'auth-login.html';
}

// Charger les données utilisateur
function loadUserData() {
    const session = checkAuth();
    if (!session) return;

    // Récupérer les données utilisateur complètes
    const users = JSON.parse(localStorage.getItem('syntaxa_users') || '[]');
    const user = users.find(u => u.email === session.email);

    if (user) {
        // Charger la clé API si sauvegardée
        if (user.apiKey) {
            document.getElementById('api-key').value = user.apiKey;
            apiKey = user.apiKey;
        }

        // Charger les conversations de l'utilisateur
        if (user.conversations) {
            conversations = user.conversations;
            loadConversations();
        }

        // Afficher le nom de l'utilisateur dans la sidebar
        updateUserProfile(user);
    }
}

// Mettre à jour le profil utilisateur dans l'interface
function updateUserProfile(user) {
    const footerDiv = document.querySelector('.sidebar-footer');
    if (footerDiv) {
        footerDiv.innerHTML = `
            <div style="padding: 1rem; background: rgba(59, 130, 246, 0.1); border-radius: 8px; margin-bottom: 1rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
                    <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #3b82f6, #10b981); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; font-weight: bold;">
                        ${user.name.charAt(0).toUpperCase()}
                    </div>
                    <div style="flex: 1;">
                        <div style="font-weight: 600; color: var(--text-primary);">${user.name}</div>
                        <div style="font-size: 0.75rem; color: var(--text-secondary);">${user.email}</div>
                    </div>
                </div>
                <button onclick="showUserSettings()" style="width: 100%; padding: 0.5rem; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 6px; color: var(--text-secondary); cursor: pointer; font-size: 0.875rem; margin-bottom: 0.5rem;">
                    ⚙️ Paramètres
                </button>
                <button onclick="logout()" style="width: 100%; padding: 0.5rem; background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; border-radius: 6px; color: #ef4444; cursor: pointer; font-size: 0.875rem;">
                    🚪 Déconnexion
                </button>
            </div>
            <div class="api-config" style="font-size: 0.75rem; color: var(--text-tertiary);">
                🔑 Clé API OpenAI
                <input 
                    type="password" 
                    class="api-input" 
                    id="api-key"
                    placeholder="sk-..."
                    onchange="saveApiKey()"
                    style="width: 100%; padding: 0.5rem; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 4px; color: var(--text-primary); font-size: 0.875rem; margin-top: 0.5rem;"
                >
            </div>
        `;
    }
}

// Sauvegarder la clé API dans le profil utilisateur
function saveApiKeyToProfile() {
    const session = checkAuth();
    if (!session) return;

    const users = JSON.parse(localStorage.getItem('syntaxa_users') || '[]');
    const userIndex = users.findIndex(u => u.email === session.email);

    if (userIndex !== -1) {
        users[userIndex].apiKey = apiKey;
        localStorage.setItem('syntaxa_users', JSON.stringify(users));
    }
}

// Sauvegarder les conversations dans le profil
function saveConversationsToProfile() {
    const session = checkAuth();
    if (!session) return;

    const users = JSON.parse(localStorage.getItem('syntaxa_users') || '[]');
    const userIndex = users.findIndex(u => u.email === session.email);

    if (userIndex !== -1) {
        users[userIndex].conversations = conversations;
        localStorage.setItem('syntaxa_users', JSON.stringify(users));
    }
}

// Afficher les paramètres utilisateur
function showUserSettings() {
    const session = checkAuth();
    if (!session) return;

    const users = JSON.parse(localStorage.getItem('syntaxa_users') || '[]');
    const user = users.find(u => u.email === session.email);

    if (!user) return;

    // Créer une modal pour les paramètres
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;

    modal.innerHTML = `
        <div style="background: var(--bg-secondary); border-radius: 16px; padding: 2rem; max-width: 500px; width: 90%; border: 1px solid var(--border-color);">
            <h2 style="margin-bottom: 1.5rem; color: var(--accent-primary);">⚙️ Paramètres du compte</h2>
            
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary); font-size: 0.875rem;">Nom complet</label>
                <input type="text" id="settings-name" value="${user.name}" style="width: 100%; padding: 0.75rem; background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-primary);">
            </div>

            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary); font-size: 0.875rem;">Email</label>
                <input type="email" value="${user.email}" disabled style="width: 100%; padding: 0.75rem; background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-secondary); opacity: 0.5;">
            </div>

            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary); font-size: 0.875rem;">Clé API OpenAI</label>
                <input type="password" id="settings-apikey" value="${user.apiKey || ''}" placeholder="sk-..." style="width: 100%; padding: 0.75rem; background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-primary);">
            </div>

            <div style="margin-bottom: 1.5rem; padding: 1rem; background: rgba(59, 130, 246, 0.1); border-radius: 8px;">
                <div style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
                    📊 Statistiques
                </div>
                <div style="font-size: 0.75rem; color: var(--text-tertiary);">
                    Compte créé le: ${new Date(user.createdAt).toLocaleDateString()}<br>
                    Conversations: ${user.conversations?.length || 0}
                </div>
            </div>

            <div style="display: flex; gap: 1rem;">
                <button onclick="saveUserSettings()" style="flex: 1; padding: 0.75rem; background: var(--accent-primary); border: none; border-radius: 8px; color: white; font-weight: 600; cursor: pointer;">
                    💾 Sauvegarder
                </button>
                <button onclick="closeSettings()" style="flex: 1; padding: 0.75rem; background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-secondary); cursor: pointer;">
                    Annuler
                </button>
            </div>

            <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
                <button onclick="deleteAccount()" style="width: 100%; padding: 0.75rem; background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; border-radius: 8px; color: #ef4444; cursor: pointer;">
                    🗑️ Supprimer mon compte
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    window.currentModal = modal;
}

// Sauvegarder les paramètres utilisateur
function saveUserSettings() {
    const session = checkAuth();
    if (!session) return;

    const name = document.getElementById('settings-name').value;
    const apiKeyInput = document.getElementById('settings-apikey').value;

    const users = JSON.parse(localStorage.getItem('syntaxa_users') || '[]');
    const userIndex = users.findIndex(u => u.email === session.email);

    if (userIndex !== -1) {
        users[userIndex].name = name;
        users[userIndex].apiKey = apiKeyInput;
        localStorage.setItem('syntaxa_users', JSON.stringify(users));

        // Mettre à jour la session
        session.name = name;
        if (session.rememberMe) {
            localStorage.setItem('syntaxa_session', JSON.stringify(session));
        } else {
            sessionStorage.setItem('syntaxa_session', JSON.stringify(session));
        }

        // Recharger le profil
        loadUserData();

        alert('✅ Paramètres sauvegardés !');
        closeSettings();
    }
}

// Fermer les paramètres
function closeSettings() {
    if (window.currentModal) {
        window.currentModal.remove();
        window.currentModal = null;
    }
}

// Supprimer le compte
function deleteAccount() {
    if (!confirm('⚠️ Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
        return;
    }

    if (!confirm('🚨 DERNIÈRE CONFIRMATION : Toutes vos données seront perdues. Continuer ?')) {
        return;
    }

    const session = checkAuth();
    if (!session) return;

    const users = JSON.parse(localStorage.getItem('syntaxa_users') || '[]');
    const filteredUsers = users.filter(u => u.email !== session.email);
    localStorage.setItem('syntaxa_users', JSON.stringify(filteredUsers));

    alert('Votre compte a été supprimé.');
    logout();
}

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
});

// Modifier la fonction saveApiKey existante
const originalSaveApiKey = saveApiKey;
saveApiKey = function() {
    originalSaveApiKey();
    saveApiKeyToProfile();
};

// Modifier la fonction saveConversation existante
const originalSaveConversation = saveConversation;
saveConversation = function() {
    originalSaveConversation();
    saveConversationsToProfile();
};
