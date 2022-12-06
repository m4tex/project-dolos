"use strict";

let apiKeyExists = Object.keys(await chrome.storage.local.get('apiKey')).length > 0;

if(!apiKeyExists){
    const keyWarningEl = document.getElementById('key-warning')
    keyWarningEl.style.display = 'flex';
    keyWarningEl.children[1].addEventListener('click', () => changeSection(sections.length-1));
}

const header = document.getElementsByTagName('header')[0];
const keyWarning = document.getElementById('key-warning');
const miniPlaygroundSection = document.getElementById('mini-playground');
const usageSection = document.getElementById('usage');
const settingsSection = document.getElementById('settings');
const templatesSection = document.getElementById('templates')
const sections = [ keyWarning, miniPlaygroundSection, usageSection, templatesSection, settingsSection ];
const headerIndicators = [...header.children[0].children, header.children[1]];

// for (let i = 0; i < header.children[0].children.length; i++) {
//     header.children[0].children[i].addEventListener('click', () => changeSection(i));
// }
//
// headerIndicators[headerIndicators.length-1].addEventListener('click', () => changeSection(sections.length-1));

headerIndicators.forEach((indicator, index) => indicator.addEventListener('click', () => changeSection(index)));

function changeSection(sectionId) {
    headerIndicators.forEach(indicator => {
        indicator.className = '';
    });

    headerIndicators[headerIndicators.length-1].className = 'material-symbols-outlined';

    sections.forEach(section => {
        section.style.display = 'none';
    })

    if (apiKeyExists || sectionId === sections.length-1) {
        sections[sectionId+1].style.display = 'block';
    } else {
        keyWarning.style.display = 'flex';
    }

    headerIndicators[sectionId+1].className += ' header-selected';
}

async function reevalKeyRouting() {
    apiKeyExists = Object.keys(await chrome.storage.local.get('apiKey')).length > 0;
}

changeSection(1);