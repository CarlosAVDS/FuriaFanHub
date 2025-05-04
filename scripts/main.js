
let userXP = parseInt(localStorage.getItem('userXP')) || 0;
let xp = localStorage.getItem("furiaXP") || 0;

function saveMessages() {
    localStorage.setItem("chatMessages", document.getElementById("chatbotMessages").innerHTML);
}

function openChatWindow() {
    document.getElementById('chat-form-container').style.display = 'block'
}
function closeChatWindow() {
    document.getElementById('chat-form-container').style.display = 'none'
}

function sendMessage(customMessage) {
    const input = document.getElementById('chatInput');
    const messages = document.getElementById('chatbotMessages');
    const text = customMessage || input.value.trim();

    if (!text) return;

    const userBubble = document.createElement('div');
    userBubble.className = 'user-bubble';
    userBubble.innerText = text;
    messages.appendChild(userBubble);

    xp = parseInt(xp) + 10;
    userXP += 10;
    localStorage.setItem('userXP', userXP);
    localStorage.setItem("furiaXP", xp);

    const reply = getBotReply(text);
    const botBubble = document.createElement('div');
    botBubble.className = 'bot-bubble';
    botBubble.innerText = reply + `\n(Fã XP: ${userXP})`;
    messages.appendChild(botBubble);

    setTimeout(() => {
        botBubble.innerText = getBotReply(text);
        messages.scrollTop = messages.scrollHeight;
        saveMessages();
    }, 500);


    if (!customMessage) input.value = '';
    messages.scrollTop = messages.scrollHeight;
    saveMessages();
    updateRanking();
}

function quickMessage(text) {
    sendMessage(text);
}

function clearChat() {
    const messages = document.getElementById("chatbotMessages");
    messages.innerHTML = '<div class="bot-bubble">Olá, FURIOSO! Como posso te ajudar hoje?</div>';
    localStorage.removeItem("chatMessages");
}

function logout() {
    localStorage.removeItem("userLogged");
    location.reload();
}

function getBotReply(message) {
    const msg = message.toLowerCase();

    if (msg.includes("jogo") || msg.includes("partida") || msg.includes("resultado")) {
        return "FURIA perdeu sua última partida contra The MongolZ por 2x0 em Mirage e Nuke!";
    }
    if (msg.includes("line") || msg.includes("time") || msg.includes("jogadores")) {
        return "A lineup atual da FURIA conta com: KSCERATO, Yuurih, FalleN, Yekindar e Molodoy!";
    }
    if (msg.includes("agenda") || msg.includes("próximo") || msg.includes("quando joga")) {
        return "A FURIA volta aos servidores na sabado dia 10/05 às 18h contra a The MongolZ!";
    }
    if (msg.includes("fã") || msg.includes("torcida") || msg.includes("fanático")) {
        return "Isso aí, FURIOSO! Você pode se cadastrar no programa Know Your Fan 👊";
    }
    if (msg.includes("camisa") || msg.includes("loja") || msg.includes("comprar")) {
        return "Você pode conferir os produtos oficiais na loja.furia.gg 🛒";
    }
    if (msg.includes("curiosidade") || msg.includes("/curiosidade")) {
        return "Curiosidade: FURIA foi o primeiro time brasileiro a investir em bootcamp nos EUA em 2019!";
    }
    if (msg.includes("/ranking") || msg.includes("ranking")) {
        return "Ranking atual da FURIA: Top 10 mundial pelo HLTV.";
    }
    return "Hmm... não entendi bem isso, mas posso te contar curiosidades ou te mostrar nossa lineup!";
}

window.onload = () => {
    const saved = localStorage.getItem("chatMessages");
    if (saved) document.getElementById("chatbotMessages").innerHTML = saved;

    const user = JSON.parse(localStorage.getItem("userLogged"));
    if (user) {
        const loginLink = document.getElementById("loginLink");
        loginLink.innerText = user.nome;
        loginLink.href = "#";

        const logoutLink = document.getElementById("logoutLink");
        logoutLink.style.display = "inline";
    }
};