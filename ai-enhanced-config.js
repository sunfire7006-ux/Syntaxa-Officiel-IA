// 🧠 CONFIGURATION IA AMÉLIORÉE - À ajouter dans syntaxa-ai-pro.html
// Remplace la fonction sendMessage() existante

// Historique des réponses pour éviter les répétitions
let recentResponses = [];
const MAX_RESPONSE_HISTORY = 5;

// Personnalités disponibles
const AI_PERSONALITIES = {
    creative: {
        name: "Créatif",
        systemPrompt: "Tu es un assistant IA créatif et imaginatif. Tu adores proposer des idées originales, des solutions innovantes et penser en dehors des sentiers battus. Tu utilises des métaphores et des exemples concrets. Tu es enthousiaste mais professionnel.",
        temperature: 0.9,
        top_p: 0.95
    },
    technical: {
        name: "Technique",
        systemPrompt: "Tu es un expert technique précis et méthodique. Tu donnes des explications détaillées avec des exemples de code, des schémas et des best practices. Tu es rigoureux et aimes les détails techniques.",
        temperature: 0.6,
        top_p: 0.9
    },
    conversational: {
        name: "Conversationnel",
        systemPrompt: "Tu es un assistant amical et conversationnel. Tu parles naturellement, poses des questions de clarification, et adaptes ton niveau de détail selon le contexte. Tu es patient et pédagogue.",
        temperature: 0.8,
        top_p: 0.92
    },
    analytical: {
        name: "Analytique",
        systemPrompt: "Tu es un analyste stratégique. Tu décomposes les problèmes, identifies les patterns, proposes plusieurs solutions avec leurs avantages/inconvénients. Tu structures tes réponses de manière logique.",
        temperature: 0.7,
        top_p: 0.9
    },
    adaptive: {
        name: "Adaptatif",
        systemPrompt: "Tu es un assistant polyvalent qui adapte son style selon le contexte. Pour du code, tu es technique. Pour de la créativité, tu es imaginatif. Pour de l'analyse, tu es structuré. Tu détectes le besoin et ajustes ton approche.",
        temperature: 0.85,
        top_p: 0.93
    }
};

// Personnalité actuelle (défaut: adaptative)
let currentPersonality = 'adaptive';

// Fonction pour détecter le type de question
function detectQueryType(message) {
    const codingKeywords = ['code', 'script', 'fonction', 'programme', 'bug', 'erreur', 'debug', 'api', 'class', 'variable'];
    const creativeKeywords = ['idée', 'créatif', 'imagine', 'invente', 'design', 'créer', 'innover', 'brainstorm'];
    const analyticalKeywords = ['analyse', 'compare', 'avantages', 'inconvénients', 'pourquoi', 'comment', 'différence'];
    const conversationalKeywords = ['explique', 'aide', 'comprends', 'apprendre', 'montre'];

    const lowerMessage = message.toLowerCase();

    if (codingKeywords.some(k => lowerMessage.includes(k))) return 'technical';
    if (creativeKeywords.some(k => lowerMessage.includes(k))) return 'creative';
    if (analyticalKeywords.some(k => lowerMessage.includes(k))) return 'analytical';
    if (conversationalKeywords.some(k => lowerMessage.includes(k))) return 'conversational';
    
    return 'adaptive';
}

// Fonction pour vérifier la similarité avec les réponses précédentes
function isTooSimilar(newResponse) {
    if (recentResponses.length === 0) return false;

    // Normaliser la réponse
    const normalize = (text) => text.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
    const normalizedNew = normalize(newResponse);

    // Vérifier la similarité avec les réponses récentes
    for (const recent of recentResponses) {
        const normalizedRecent = normalize(recent);
        
        // Calculer la similarité (simple: pourcentage de mots en commun)
        const wordsNew = new Set(normalizedNew.split(/\s+/));
        const wordsRecent = new Set(normalizedRecent.split(/\s+/));
        
        const intersection = new Set([...wordsNew].filter(x => wordsRecent.has(x)));
        const similarity = intersection.size / Math.max(wordsNew.size, wordsRecent.size);
        
        // Si plus de 70% de similarité, c'est trop similaire
        if (similarity > 0.7) return true;
    }

    return false;
}

// Fonction améliorée pour générer le system prompt
function generateSystemPrompt() {
    const personality = AI_PERSONALITIES[currentPersonality];
    const contextualInfo = [];

    // Ajouter des informations contextuelles
    if (currentMessages.length > 0) {
        contextualInfo.push("Rappelle-toi de nos échanges précédents et construis sur ce contexte.");
    }

    // Ajouter des instructions anti-répétition
    if (recentResponses.length > 0) {
        contextualInfo.push("Évite de répéter les mêmes formulations ou structures que tes réponses précédentes. Sois varié et original.");
    }

    // Instructions générales pour plus de variabilité
    const variabilityInstructions = [
        "Varie ton style d'écriture et tes formulations.",
        "Utilise des exemples concrets et différents à chaque fois.",
        "Adapte ton niveau de détail selon la question.",
        "N'hésite pas à poser des questions de clarification si nécessaire.",
        "Sois naturel et conversationnel, pas robotique."
    ];

    return `${personality.systemPrompt}

${contextualInfo.join(' ')}

Instructions importantes :
${variabilityInstructions.map((i, idx) => `${idx + 1}. ${i}`).join('\n')}

Important : Chaque réponse doit être unique et adaptée au contexte spécifique de la question.`;
}

// Fonction sendMessage améliorée
async function sendMessage() {
    const input = document.getElementById('message-input');
    const text = input.value.trim();

    if (!text && uploadedFiles.length === 0) return;

    if (!apiKey || !apiKey.startsWith('sk-')) {
        showError('🔑 Veuillez configurer votre clé API OpenAI dans la barre latérale.');
        return;
    }

    // Détecter le type de question et ajuster la personnalité
    const detectedType = detectQueryType(text);
    if (detectedType !== 'adaptive') {
        currentPersonality = detectedType;
    }

    // Remove welcome
    const welcome = document.querySelector('.welcome');
    if (welcome) welcome.remove();

    // Add user message
    addMessage('user', text, uploadedFiles);

    // Prepare message content
    const messageContent = [];
    
    if (text) {
        messageContent.push({ type: 'text', text: text });
    }

    // Add images and files
    for (const file of uploadedFiles) {
        if (file.type === 'image') {
            messageContent.push({
                type: 'image_url',
                image_url: { url: file.data }
            });
        } else {
            messageContent.push({
                type: 'text',
                text: `\n\n[Contenu du fichier ${file.name}]:\n${file.data}`
            });
        }
    }

    currentMessages.push({
        role: 'user',
        content: messageContent
    });

    // Clear input
    input.value = '';
    input.style.height = 'auto';
    uploadedFiles = [];
    updateFilePreview();

    // Show thinking
    const thinkingId = addThinking();
    document.getElementById('send-btn').disabled = true;

    try {
        const model = document.getElementById('model-select').value;
        const personality = AI_PERSONALITIES[currentPersonality];
        
        // Préparer les paramètres avec variabilité
        const apiParams = {
            model: model,
            messages: [
                {
                    role: 'system',
                    content: generateSystemPrompt()
                },
                ...currentMessages
            ],
            temperature: personality.temperature,
            top_p: personality.top_p,
            max_tokens: 4000,
            // Paramètres pour plus de variabilité
            frequency_penalty: 0.6,  // Pénalise la répétition de tokens
            presence_penalty: 0.6,   // Encourage de nouveaux sujets
        };

        // Si on a un historique de réponses, on peut même varier le seed
        if (recentResponses.length > 0) {
            // Note: seed n'est pas toujours supporté, mais on peut essayer
            apiParams.seed = Math.floor(Math.random() * 1000000);
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(apiParams)
        });

        removeThinking(thinkingId);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            handleApiError(response.status, errorData);
            return;
        }

        const data = await response.json();
        let aiResponse = data.choices[0].message.content;

        // Vérifier si la réponse est trop similaire aux précédentes
        let retryCount = 0;
        while (isTooSimilar(aiResponse) && retryCount < 2) {
            console.log('Réponse trop similaire, régénération avec plus de variabilité...');
            
            // Augmenter la température pour plus de variabilité
            apiParams.temperature = Math.min(1.0, apiParams.temperature + 0.1);
            apiParams.presence_penalty = Math.min(2.0, apiParams.presence_penalty + 0.2);
            
            const retryResponse = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify(apiParams)
            });

            if (retryResponse.ok) {
                const retryData = await retryResponse.json();
                aiResponse = retryData.choices[0].message.content;
            }
            
            retryCount++;
        }

        // Sauvegarder la réponse dans l'historique
        recentResponses.push(aiResponse);
        if (recentResponses.length > MAX_RESPONSE_HISTORY) {
            recentResponses.shift(); // Garder seulement les N dernières
        }

        currentMessages.push({
            role: 'assistant',
            content: aiResponse
        });

        addMessage('ai', aiResponse);
        saveConversation();

    } catch (error) {
        removeThinking(thinkingId);
        showError(`❌ Erreur: ${error.message}`);
    } finally {
        document.getElementById('send-btn').disabled = false;
    }
}

// Fonction pour changer manuellement la personnalité
function changePersonality(personalityKey) {
    if (AI_PERSONALITIES[personalityKey]) {
        currentPersonality = personalityKey;
        
        // Afficher un message de confirmation
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-primary);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = `🎭 Personnalité changée : ${AI_PERSONALITIES[personalityKey].name}`;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Ajouter un sélecteur de personnalité dans l'interface
function addPersonalitySelector() {
    const header = document.querySelector('.chat-header');
    if (!header) return;

    const selector = document.createElement('div');
    selector.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;

    selector.innerHTML = `
        <label style="font-size: 0.875rem; color: var(--text-secondary);">🎭 Mode:</label>
        <select id="personality-select" onchange="changePersonality(this.value)" style="
            padding: 0.5rem 1rem;
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            border-radius: 6px;
            color: var(--text-primary);
            cursor: pointer;
            font-size: 0.875rem;
        ">
            ${Object.entries(AI_PERSONALITIES).map(([key, p]) => 
                `<option value="${key}" ${key === currentPersonality ? 'selected' : ''}>${p.name}</option>`
            ).join('')}
        </select>
    `;

    // Insérer après le model-selector
    const modelSelector = header.querySelector('.model-selector');
    if (modelSelector) {
        modelSelector.after(selector);
    }
}

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', () => {
    addPersonalitySelector();
});

// Fonction pour réinitialiser l'historique de répétition
function resetResponseHistory() {
    recentResponses = [];
}

// Console commands pour debug
console.log('🧠 Configuration IA Améliorée chargée !');
console.log('Commandes disponibles :');
console.log('- changePersonality("creative/technical/conversational/analytical/adaptive")');
console.log('- resetResponseHistory() - Réinitialiser l\'historique anti-répétition');
console.log('- AI_PERSONALITIES - Voir toutes les personnalités');
