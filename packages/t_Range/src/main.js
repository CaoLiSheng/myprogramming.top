import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app');

document.addEventListener('keyup', (evt) => {
    console.log(evt.key);
});

function debugSelection(selection, info) {
    for (let i=0; i<selection.rangeCount; i++) {
        console.log(info, selection.getRangeAt(i));
    }
}

document.addEventListener('selectionchange', () => {
    const selection = document.getSelection();
    debugSelection(selection, 'selectionchange');
});

const mutationObserver = new window.MutationObserver((domMutations) => {
    console.log(domMutations);
    if (domMutations.length > 0) 
        debugSelection(domMutations[0].target.ownerDocument.getSelection(), 'MutationObserver');
});
mutationObserver.observe(document.body, {
    childList: true,
    characterData: true,
    characterDataOldValue: true,
    subtree: true
});
