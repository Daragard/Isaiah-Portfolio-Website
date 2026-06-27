// Global State Tracker monitored by the command interface
let currentDirectory = 'root';

function executeCommand(inputString) {
    const cleaned = inputString.toLowerCase().trim();
    const parts = cleaned.split(' ');
    const command = parts[0];
    const argument = parts.slice(1).join(' ').trim().replace(/\/$/, '');

    if (cleaned === 'clear') {
        return 'CLEAR_HISTORY';
    }

    if (command === 'sudo') {
        return `<span style="color: #ef4444; font-weight: bold;">[ACCESS DENIED] This incident will be reported.</span>`;
    }

    if (command === 'help') {
        return `Available commands:
  <span style="color: #ffffff; font-weight: bold;">ls [dir]</span>             - List directory contents (e.g., ls, ls projects)
  <span style="color: #ffffff; font-weight: bold;">cd [dir]</span>             - Change directory (e.g., cd projects, cd ..)
  <span style="color: #ffffff; font-weight: bold;">cat [file]</span>            - Display content of a file (e.g., cat skills.txt)
  <span style="color: #ffffff; font-weight: bold;">open [shortcut]</span>       - Launch URL configuration anchors (e.g., open linkedin.desktop)
  <span style="color: #ffffff; font-weight: bold;">clear</span>              - Clear terminal history screen`;
    }

    if (command === 'ls') {
        if (!argument) return directoryContents[currentDirectory];

        if (currentDirectory === 'root') {
            if (argument === 'projects') return directoryContents['projects'];
            if (argument === 'projects/highlighted') return directoryContents['highlighted'];
            if (argument === 'projects/other') return directoryContents['other'];
        } else if (currentDirectory === 'projects') {
            if (argument === 'highlighted') return directoryContents['highlighted'];
            if (argument === 'other') return directoryContents['other'];
            if (argument === '..') return directoryContents['root'];
        } else if (currentDirectory === 'highlighted' || currentDirectory === 'other') {
            if (argument === '..') return directoryContents['projects'];
        }

        if (argument === 'projects' || argument === '~/projects') return directoryContents['projects'];
        if (argument === 'projects/highlighted' || argument === '~/projects/highlighted') return directoryContents['highlighted'];
        if (argument === 'projects/other' || argument === '~/projects/other') return directoryContents['other'];
        if (argument === '~') return directoryContents['root'];

        return `ls: cannot access '${argument}': No such file or directory`;
    }

    if (command === 'cd') {
        const dirLabel = document.getElementById('dir-path');
        
        if (!argument || argument === '~') {
            currentDirectory = 'root';
            dirLabel.textContent = `~`;
            return '';
        }
        
        if (argument === '..') {
            if (currentDirectory === 'projects') {
                currentDirectory = 'root';
                dirLabel.textContent = `~`;
            } else if (currentDirectory === 'highlighted' || currentDirectory === 'other') {
                currentDirectory = 'projects';
                dirLabel.textContent = `~/projects`;
            }
            return '';
        }

        if (currentDirectory === 'root' && argument === 'projects') {
            currentDirectory = 'projects';
            dirLabel.textContent = `~/projects`;
            return '';
        } else if (currentDirectory === 'projects') {
            if (argument === 'highlighted') {
                currentDirectory = 'highlighted';
                dirLabel.textContent = `~/projects/highlighted`;
                return '';
            }
            if (argument === 'other') {
                currentDirectory = 'other';
                dirLabel.textContent = `~/projects/other`;
                return '';
            }
        }
        return `cd: no such file or directory: ${argument}`;
    }

    if (command === 'cat') {
        if (!argument) return `cat: missing filename option`;
        
        if (currentDirectory === 'root') {
            if (argument.endsWith('.desktop') && rootFiles[argument]) {
                return `[Desktop Entry]\nVersion=1.0\nType=Link\nName=${argument.split('.')[0]}\nURL=${rootFiles[argument]}`;
            }
            if (rootFiles[argument]) return rootFiles[argument];
            if (argument === 'projects') return `cat: projects: Is a directory`;
        } else if (currentDirectory === 'projects') {
            if (argument === 'highlighted' || argument === 'other') return `cat: ${argument}: Is a directory`;
        } else if (currentDirectory === 'highlighted') {
            if (highlightedProjectFiles[argument]) return highlightedProjectFiles[argument];
        }
        return `cat: ${argument}: No such file or directory`;
    }

    // NEW OPEN COMMAND LAUNCH LOGIC
    if (command === 'open') {
        if (!argument) return `open: specify a shortcut target link`;

        if (currentDirectory === 'root') {
            if (argument.endsWith('.desktop') && rootFiles[argument]) {
                window.open(rootFiles[argument], '_blank');
                return `Launching connection redirect hook to: ${rootFiles[argument]} ...`;
            }
        }
        return `open: ${argument}: No such target shortcut or link available here`;
    }

    if (inputString !== '') {
        return `command not found: ${inputString}. Type <span style="color: #ffffff; font-weight: bold;">help</span> for options.`;
    }
    return '';
}