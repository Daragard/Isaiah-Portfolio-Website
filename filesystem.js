// ==========================================
// VIRTUAL FILE SYSTEM STRUCTURE
// ==========================================

const rootFiles = {
    'whoami.txt': `<strong>Isaiah Baumgarte</strong>
Cybersecurity Analyst | Full Stack Developer
Location: Carmel, IN
Email: <a href="mailto:ibaumgarte125@gmail.com">ibaumgarte125@gmail.com</a>
Profiles: <a href="https://www.linkedin.com/in/isaiah-b-2902022ab/" target="_blank">LinkedIn</a> | <a href="https://github.com/Daragard" target="_blank">GitHub Portfolio</a>`,
    
    'skills.txt': `<div class="grid">
        <div>• Cybersecurity</div>
        <div>• Full Stack Development</div>
        <div>• Linux Servers</div>
        <div>• SQL Development</div>
        <div>• Server Management</div>
        <div>• Python</div>
        <div>• Docker</div>
        <div>• GitHub</div>
        <div>• Team Leadership</div>
        <div>• Employee Training</div>
    </div>`,
    
    'education.log': `<strong>Purdue Global</strong> - Bachelor's Degree in Cybersecurity
Status: Accelerated Schedule | Estimated Graduation: Winter 2026

<strong>Coursework Roadmap:</strong>
<ul>
    <li>IT273: Networking Concepts (Fall 2025)</li>
    <li>IT104: Introduction to Cybersecurity (Fall 2025)</li>
    <li>IN203: Networking with Microsoft Technologies / Azure (Winter 2026)</li>
    <li>IT286: Network Security Concepts (Jan 2026)</li>
    <li>IT262 & IT395: Certified Ethical Hacking I & II (Jan-June 2026)</li>
    <li>IT390: Intrusion Detection and Incident Response (Jan-Apr 2026)</li>
    <li>IT411: Digital Forensics (Apr-June 2026)</li>
    <li>IT277, IT279, IT410: CISSP I, II, III (Jan-Sept 2026)</li>
</ul>`,
    
    'experience.txt': `<strong>Arcadia Studios</strong>
Role: Game Developer (Self Employed)
Timeline: May 2024 - Present

<strong>Forever Above, Westfield</strong>
Role: On Site Trainer / Cremation Technician
Timeline: August 2023 - August 2024`,

    // New executable .desktop shortcut files mapping straight to your destination links
    'linkedin.desktop': 'https://www.linkedin.com/in/isaiah-b-2902022ab/',
    'github.desktop': 'https://github.com/Daragard'
};

const highlightedProjectFiles = {
    'home_lab.txt': `<strong>Linux Home Lab</strong>
Detail: Designed and deployed a custom home lab utilizing Docker and Linux servers to manage secure remote data storage and media hosting.`,
    
    'social_media.txt': `<strong>Full-Stack Social Media Application (Purdue)</strong>
Detail: Co-led a 4-person team to architect a full-stack social media replica featuring secure user authentication, dynamic feeds, and relational database management.`,
    
    'library_manager.txt': `<strong>Full-Stack Library Manager</strong>
Detail: Created online library system for my High School to streamline asset tracking.`,

    'tribute.txt': `<strong>N64-Style Action-Adventure Video Game</strong>
Started planning project back in early 2024.
Started developing in December 2025.
Created <a  href="https://www.youtube.com/@Daragard-Arcadia-Studios" target="_blank">@Daragard</a> YouTube Channel for progress updates in April 2026.`
};

const otherProjectFiles = {};

// Direct directory output formatting including the desktop links in root
const directoryContents = {
    'root': `<span class="ls-file">whoami.txt</span> <span class="ls-file">skills.txt</span> <span class="ls-file">education.log</span> <span class="ls-file">experience.txt</span> <span class="ls-file" style="color: #4ade80; font-weight: bold;">linkedin.desktop</span> <span class="ls-file" style="color: #4ade80; font-weight: bold;">github.desktop</span> <span class="ls-dir">projects/</span>`,
    'projects': `<span class="ls-dir">highlighted/</span> <span class="ls-dir">other/</span>`,
    'highlighted': `<span class="ls-file">home_lab.txt</span> <span class="ls-file">social_media.txt</span> <span class="ls-file">library_manager.txt</span> <span class="ls-file">tribute.txt</span>`,
    'other': `<span class="ls-file" style="color: #a5b4fc; font-style: italic;">total 0 (directory empty)</span>`
};