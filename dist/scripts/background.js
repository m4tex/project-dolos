chrome.runtime.onInstalled.addListener(async () => {
    if (Object.keys(await chrome.storage.local.get('apiKey')).length > 0) {
        chrome.contextMenus.create({
            id: "selection_prompt",
            title: "Use selection as prompt",
            contexts: ["selection"],
        });
    }
});

function selectionPrompt(text) {

}

// function checkAuth() {
//     if(!!chrome.storage.local.get(["apiKey"])){
//         return true;
//     }
//
//     return false;
// }