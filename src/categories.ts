console.log("Executing categories.ts!");
// import { tagBox } from './tagBox/tagBox.js'

const delay = (t:number) => new Promise(resolve => setTimeout(resolve, t));


function songPanesLoaded() {
    console.log("Song Panes Loaded!", Date.now());
    
    // Traversing the Actual Song Panes
    const songPanes: NodeList = document.querySelectorAll("div ytd-playlist-video-renderer"); 
    const songPaneOne: Element = songPanes[0] as Element;
    console.log(songPaneOne.children);
    const contentNode : Element = songPaneOne.children[1];
    const menuNode : Element = songPaneOne.children[2]; 
    const anchorEl = contentNode.children[0].children[0].children[0] as HTMLAnchorElement;
    console.log(anchorEl);
    const tagBoxEl = new tagBox(anchorEl.href)
    menuNode.insertAdjacentElement('beforebegin', tagBoxEl.divEl);
}

window.onload = () => {
    console.log("Window Loaded!", Date.now());
    delay(500).then(() => songPanesLoaded());
    return;

    // Tried to obeserve the playlist items loading in but.. its a 50/50 on whether our code loads first or theirs!
    const playListElementsHolder = document.querySelector('div ytd-item-section-renderer');
    const observerOptions = {
        childList: true
    }
    const observer = new MutationObserver((mutations, observer) => {
        for (let mutation of mutations) {
            observer.disconnect();
            delay(500).then(() => { songPanesLoaded(); })
        }
    }) 
    observer.observe(playListElementsHolder as Element, observerOptions);
    // // Pop up menu - need mutation observer
    // const popUpElement = document.querySelector('ytd-popup-container');
    // const observerOptions = {
    //     childList: true
    // }
    // const observer = new MutationObserver((mutations, observer) => {
    //     for (let mutation of mutations) {
    //         let addedNode = mutation.addedNodes[0];
    //         if(addedNode.localName !== "tp-yt-iron-dropdown") {
    //             continue;
    //         }
    //         delay(500).then(() => { popUpInitialized(addedNode); })
    //     }
    // }) 
    // observer.observe(popUpElement, observerOptions);
}


function popUpInitialized(dropDownNode: Node) {
    console.log("Popup initialized!");

    // console.log(dropDownNode);
    // console.log(dropDownNode.childNodes[1]);
    // console.log(dropDownNode.childNodes[1].firstElementChild)
    // console.log(dropDownNode.childNodes[1].firstChild); // coming up as #text WHAT THE !?
    // console.log(dropDownNode.childNodes[1].firstElementChild.firstElementChild);

    let someEl = dropDownNode.childNodes[1] as Element

    let dropDownMenu = ((someEl.firstElementChild as Element).firstElementChild as Element);
    console.log(dropDownMenu);
    let dropDownMenuItems = dropDownMenu.children;
    console.log(dropDownMenuItems);

    // const saveToPlaylist = dropDownMenuItems.childNodes[4]; # undefined....
    let saveToPlaylist = dropDownMenuItems[2];
    console.log(saveToPlaylist);
    let cloned = saveToPlaylist.cloneNode();
    console.log(saveToPlaylist.insertAdjacentElement('afterend', cloned as Element));
    // console.log(saveToPlaylist);
}

// // Checks script injection status by clicking on button 
// let btn = document.getElementById('checkExtensionPerms');
// btn.addEventListener('click', (event) => {
//     console.log('Clicked button in categories.js!');
//     chrome.tabs.getCurrent((tab) => {
//         console.log(tab);
//         console.log("Injected script into: " + tab.url + "!");
//     })
//     // .then((res) => {
//     //     console.log(res);
//     // });
// })