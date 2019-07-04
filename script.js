const xhr = new XMLHttpRequest();

const mainSpace = document.getElementById('mainSpace');
const commandSelect = document.getElementById('commandSelect');

async function sendCommandName(name, command, screenEl) {
    xhr.onreadystatechange = function () {
        console.log(this.readyState, this.status);
        if (this.readyState > 2 && this.status === 200) {

            console.log(this);
            screenEl.innerHTML = '';
            screenEl.innerHTML += this.responseText;
        }
    };
    xhr.open("POST", "http://127.0.0.1:3000/", true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
    xhr.send(`commandName=${name}&command=${command}`);

}

function createPromptShell(name) {
    const commandName = name.value;
    if (name) {
        const container = document.createElement('div');
        container.className = 'shell-container';
        const shellControl = document.createElement('div');
        shellControl.className = 'shell-control';
        container.appendChild(shellControl);
        const input = document.createElement('input');
        input.className = 'command-input';
        shellControl.appendChild(input);
        const button = document.createElement('button');
        button.className = 'launch-button';
        button.innerText = commandName;
        shellControl.appendChild(button);
        const screen = document.createElement('div');
        screen.className = 'terminal-screen';
        screen.id = 'terminalScreen';
        container.appendChild(screen);
        mainSpace.appendChild(container);

        button.addEventListener('click', () => {
            sendCommandName(commandName, input.value, screen);
        });
        commandSelect.selectedIndex = 0;
    }
}