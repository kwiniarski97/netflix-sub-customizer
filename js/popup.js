// controls
let onOffSwitchLabel = document.getElementById('onOffSwitchLabel');
let saveButton = document.getElementById('saveButton');
let enableYes = document.getElementById('enableYes');
let enableNo = document.getElementById('enableNo');
let refreshPageNotice = document.getElementById('refreshPageNotice');

// i18n
let title = chrome.i18n.getMessage("bracesCheckboxLabel");
onOffSwitchLabel.innerText = title;
saveButton.innerText = chrome.i18n.getMessage("save");

// events
saveButton.addEventListener('click', save);

function save() {
    function setEnableOption() {
        const radios = document.getElementsByName('toggler');
        for (let i = 0; i < radios.length; i++) {
            console.log(radios)
            if (radios[i].checked) {
                chrome.storage.sync.set({enabled: radios[i].value})
            }
        }
    }

    setEnableOption();

    refreshPageNotice.innerText = chrome.i18n.getMessage("refreshPageNotice")
}

function bindValues() {
    function getEnableOption() {
        const radios = document.getElementsByName('toggler');
        return chrome.storage.sync.get('enabled', (val) => {
            for (let i = 0; i < radios.length; i++) {
                if (radios[i].value == val.enabled) {
                    radios[i].checked = true;
                }
            }
        });
    }

    getEnableOption();
}

bindValues();
