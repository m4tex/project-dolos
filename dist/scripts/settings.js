"use strict";

const apiKeyExists = Object.keys(await chrome.storage.local.get('apiKey')).length > 0;

const apiSettingsRow = document.getElementsByClassName('settings-row')[0];
const errorParagraph = apiSettingsRow.getElementsByTagName('p')[0];
const keyInput = apiSettingsRow.getElementsByTagName('input')[0];
apiSettingsRow.getElementsByTagName('button')[0].addEventListener('click', saveApiButtonHandler);

async function saveApiButtonHandler() {
    try {
        await saveApiKey();
    } catch (err) {
        errorParagraph.innerText = 'Internal error, contact the developer if this issue persists.'
        console.log(err);
    }
}

async function saveApiKey() {
    errorParagraph.innerText = '';
    const key = keyInput.value.trim();
    if (key.length === 0) {
        errorParagraph.innerText = 'This field cannot be empty.';
        return;
    }

    let response;

    try {
        response = await fetch('https://api.openai.com/v1/models', {
            headers: {
                'Authorization' : 'Bearer ' + key,
            }
        });
    } catch (err) {
        errorParagraph.innerText = 'Failed to communicate with the server, make sure you are connected to the internet.';
        return;
    }

    let data = await response.json();

    if (data.hasOwnProperty("error")) {
        if (data.error.code === "invalid_api_key") {
            errorParagraph.innerText = 'The provided api key is incorrect';
        } else {
            errorParagraph.innerText = `Error: ${data.error.message}. Code: ${data.error.code}. Contact the developer if this issue persists and needs fixing.`;
        }
        return;
    }

    if (!data.hasOwnProperty("data")) {
        console.log('Some error data below for the developer');
        console.log(data);
        errorParagraph.innerText = 'Unexpected error, contact the developer if this issue persists.';
    }

    await chrome.storage.local.set({apiKey: key});

    keyInput.value = '';
    keyInput.placeholder = 'Saved and Authorized successfully!';
    await reevalKeyRouting();
}

if (apiKeyExists) keyInput.placeholder = 'Saved and Authorized successfully!';