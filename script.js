const name=prompt("enter ur name");

window.onload = function () {
    const sendButton = document.querySelector("button");
    const inputField = document.querySelector('input[type="text"]');
    const chatSpace = document.getElementById("space");
    const botWelcome = document.createElement("p");
    botWelcome.innerHTML = `<b>Bot:</b> Hello ${name}, how can I help you today?`;
    chatSpace.appendChild(botWelcome);
    sendButton.addEventListener("click", () => {
        const userMessage = inputField.value.trim();

        if (userMessage !== "") {
            // Show user message
            const userPara = document.createElement("p");
            userPara.innerHTML = `<b>You:</b> ${userMessage}`;
            chatSpace.appendChild(userPara);

            // Simulate bot reply
            const botPara = document.createElement("p");
            botPara.innerHTML = `<b>Bot:</b> I'm still learning. You said "${userMessage}"`;
            chatSpace.appendChild(botPara);

            // Clear input
            inputField.value = "";

            // Scroll to bottom
            chatSpace.scrollTop = chatSpace.scrollHeight;
        }
    });
};
