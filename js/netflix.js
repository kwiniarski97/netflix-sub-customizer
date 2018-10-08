let subtitleStage = null;
let observerObject = null;
const bootstrapInterval = setInterval(getContainer, 1000);

function getContainer() {
    const collection = document.getElementsByClassName('player-timedtext');
    console.log(collection);
    // found container
    if (collection.length > 0) {
        subtitleStage = collection[0];
        observerObject = new MutationObserver(handleSubtitles);
        clearInterval(bootstrapInterval);
        startObserving();

    }

}


function startObserving() {
    // TODO: fix later subtitleStage not type of node
    try {
        observerObject.observe(subtitleStage, {
            attributes: true,
            attributeFilter: ["id", "dir"],
            attributeOldValue: true,
            childList: true
        });
    } catch {
    }
}

function handleSubtitles() {
    const subtitleScenes = subtitleStage.getElementsByClassName("player-timedtext-text-container");
    for (let i = 0; i < subtitleScenes.length; i++) {
        const scene = subtitleScenes[i];
        const paragraphs = scene.getElementsByTagName("span");
        for (let k = 0; k < paragraphs.length; k++) {
            const paragraph = paragraphs[k];
            console.log(paragraph.innerText);
            paragraph.innerText = paragraph.innerText.replace(/ *[-]?[\s]?\[[^)]*]/g, "");
        }
    }
}
