const cmdInput = document.getElementById('cmd-input');
const history = document.getElementById('history');
const dirPath = document.getElementById('dir-path');
const terminalContainer = document.getElementById('terminal-container');

terminalContainer.addEventListener('click', () => {
    cmdInput.focus();
});

cmdInput.addEventListener('keydown', function(e) {
    const activePath = dirPath.textContent;

    // 1. TAB AUTOCOMPLETE
    if (e.key === 'Tab') {
        e.preventDefault();
        const inputVal = this.value.trim();
        if (!inputVal) return;

        let searchStr = inputVal.toLowerCase();
        let prefix = '';

        const commandsWithArgs = ['cat ', 'cd ', 'ls ', 'sudo ', 'open ']; // Added open hook
        for (const cmd of commandsWithArgs) {
            if (searchStr.startsWith(cmd)) {
                prefix = cmd;
                searchStr = searchStr.substring(cmd.length).trim();
                break;
            }
        }

        let currentPool = [];
        if (currentDirectory === 'root') {
            currentPool = [...Object.keys(rootFiles), 'projects'];
        } else if (currentDirectory === 'projects') {
            currentPool = ['highlighted', 'other'];
        } else if (currentDirectory === 'highlighted') {
            currentPool = Object.keys(highlightedProjectFiles);
        } else if (currentDirectory === 'other') {
            currentPool = Object.keys(otherProjectFiles);
        }

        const matches = currentPool.filter(item => item.startsWith(searchStr));
        if (matches.length === 1) {
            this.value = prefix + matches[0];
        }
        return;
    }

    // 2. ENTER COMMMAND EXECUTION
    if (e.key === 'Enter') {
        const rawInput = this.value;
        
        const line = document.createElement('div');
        line.innerHTML = `
            <span class="prompt-accent">┌──(</span><span class="prompt-user-loc">kali㉿kali</span><span class="prompt-accent">)-[</span><span class="prompt-user-loc">${activePath}</span><span class="prompt-accent">]</span><br>
            <span class="prompt-accent">└─$</span> <span class="command-text">${rawInput}</span>
        `;
        history.appendChild(line);

        const outputMessage = executeCommand(rawInput);
        
        if (outputMessage === 'CLEAR_HISTORY') {
            history.innerHTML = '';
        } else if (outputMessage !== '') {
            const outputDiv = document.createElement('div');
            outputDiv.className = 'output';
            outputDiv.innerHTML = outputMessage;
            history.appendChild(outputDiv);
        }

        this.value = '';
        window.scrollTo(0, document.body.scrollHeight);
    }
});