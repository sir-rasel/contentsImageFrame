function createImageTag(selector, imgNumber, currentCount, position){
    let img = new Image();
    img.src = `images/grid/${imgNumber}.jpg`;
    img.style.position = 'absolute';

    if(position === 'left' || position === 'right') {
        img.style.top = `${currentCount * 100}px`;
        if(position === 'left') img.id = `l${currentCount}`;
        else img.id = `r${currentCount}`;
        
    }
    else if(position === 'up' || position === 'bottom') {
        img.style.left = `${currentCount * 100}px`;
        if(position === 'up') img.id = `u${currentCount}`;
        else img.id = `b${currentCount}`;
    }

    document.querySelector(`.${selector}`).appendChild(img);
}

function deleteImageTags(){
    let images = document.querySelectorAll('img');
    images.forEach(element => {
        element.parentNode.removeChild(element);
    });
}

function dynamicImageInserting(up, bottom, left, right){
    deleteImageTags();

    let imgNumber = 1;
    for(let i = 0; i < (up / 100); i++){
        createImageTag('upperImageLine', imgNumber, i, 'up');
        imgNumber++;
    }

    for(let i = 0; i < (bottom / 100); i++){
        createImageTag('bottomImageLine', imgNumber, i, 'bottom');
        imgNumber++;
    }

    for(let i = 0; i < (left / 100); i++){
        createImageTag('leftImageLine', imgNumber, i, 'left');
        imgNumber++;
    }

    for(let i = 0; i < (right / 100); i++){
        createImageTag('rightImageLine', imgNumber, i, 'right');
        imgNumber++;
    }
}

function resizingContent() {
    let imageFrame = document.querySelector('.imageFrame');
    let leftImageLine = document.querySelector('.leftImageLine');
    let rightImageLine = document.querySelector('.rightImageLine');
    let mainContent = document.querySelector('.mainContent');
    let paragraphContent = document.querySelector('.paragraphWrapper');


    let frameWidth = imageFrame.offsetWidth;    
    let windowHeight = window.innerWidth;
    imageFrame.style.width = ((Math.max(Math.floor(windowHeight / 100.0), 3)) * 100) + 'px';

    frameWidth = imageFrame.offsetWidth;
    mainContent.style.width = frameWidth - 201 + 'px';
    
    let frameHeight = paragraphContent.offsetHeight;
    leftImageLine.style.height = (Math.max(Math.ceil(frameHeight / 100.0), 3) * 100) + 'px';
    rightImageLine.style.height = leftImageLine.style.height;
    mainContent.style.height = leftImageLine.style.height;

    dynamicImageInserting(imageFrame.offsetWidth, imageFrame.offsetWidth, leftImageLine.offsetHeight, leftImageLine.offsetHeight);
}

function getImgId(way, index){
    let direction = ['u', 'b', 'l', 'r'];
    return `${direction[way]}${index}`;
}

function swapImageAnimation(){
    let waySelector = ['.upperImageLine img', '.bottomImageLine img', '.leftImageLine img', '.rightImageLine img'];
    let wayIndex = Math.floor(Math.random() * 4);

    let numberOfImg = document.querySelectorAll(`${waySelector[wayIndex]}`).length;
    let index = Math.floor(Math.random() * numberOfImg);

    if(index === (numberOfImg-1)) index--;

    let leftElement = document.getElementById(getImgId(wayIndex, index));
    let rightElement = document.getElementById(getImgId(wayIndex, index+1));

    let animationId = setInterval(swap, 5);

    let pos = 0;
    function swap(){
        if(pos === 100) clearInterval(animationId);
        else{
            if(wayIndex <= 1){
                let value1 = leftElement.style.left;
                let value2 = rightElement.style.left;
                leftElement.style.left = (parseInt(value1.slice(0,value1.length-2))+1) + 'px';
                rightElement.style.left = (parseInt(value2.slice(0,value2.length-2))-1) + 'px';
            }
            else{
                let value1 = leftElement.style.top;
                let value2 = rightElement.style.top;
                leftElement.style.top = (parseInt(value1.slice(0,value1.length-2))+1) + 'px';
                rightElement.style.top = (parseInt(value2.slice(0,value2.length-2))-1) + 'px';
            }
        }
        pos++;
    }

    let leftId = leftElement.id;
    leftElement.id = rightElement.id;
    rightElement.id = leftId;
}

let id;
function periodicAnimationCaller() {
    id = setInterval(swapImageAnimation,1000);
}

window.onload = () => {
    resizingContent();
    periodicAnimationCaller();

    window.addEventListener('resize', () => {
        resizingContent();
        clearInterval(id);
        periodicAnimationCaller();
    });
};
