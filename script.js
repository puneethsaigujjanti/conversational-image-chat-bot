const name = prompt("enter your name");

const sendbutton = document.querySelector("button");
const inputfield = document.querySelector('input[type="text"]');
const chatspace = document.getElementById("space");

const botwelcome = document.createElement("p");
botwelcome.innerHTML = `<b>Bot:</b> Hello ${name}, how can I help you today?`;
chatspace.append(botwelcome);

sendbutton.addEventListener("click", () => {
    const userMessage = inputfield.value.trim();

    if (userMessage !== "") {
        const userPara = document.createElement("p");
        userPara.innerHTML = `<b>You:</b> ${userMessage}`;
        chatspace.append(userPara);

        fetch("/chat",
            {method:"POST",
             headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ question: userMessage })
        })
        .then(res => res.json())
        .then(data => {
            const botPara = document.createElement("p");
            botPara.innerHTML = `<b>Bot:</b> ${data.reply}`;
            chatspace.append(botPara);
            chatspace.scrollTop = chatspace.scrollHeight;
        });

        inputfield.value = "";
            }
});
inputfield.addEventListener("keydown",(e)=>{
    if(e.key==="Enter")
    {
        sendbutton.click();
    }
}
);
const imgpreview = document.getElementById("imgpre");
const imginput = document.getElementById("imginput");

imginput.addEventListener("change", () => {
    const file = imginput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
    

            const imagePara = document.createElement("p");
            imagePara.innerHTML = `<b>You:</b> <br><img src="${e.target.result}" style="max-width: 200px; border: 1px solid #ccc; border-radius: 5px;" />`;
            chatspace.appendChild(imagePara);

            
            chatspace.scrollTop = chatspace.scrollHeight;
        };
       
    
    reader.readAsDataURL(file);
        const formData = new FormData();
        formData.append("image", file);

        fetch("/upload", {
            method: "POST",
            body: formData,
        }).then(res => res.json())
          .then(data => {
            console.log("Server says:", data);
            const botImageResponse = document.createElement("p");
            botImageResponse.innerHTML = `<b>Bot:</b> ${data.reply}`;
            chatspace.appendChild(botImageResponse);
            chatspace.scrollTop = chatspace.scrollHeight;

          });
         }

});

