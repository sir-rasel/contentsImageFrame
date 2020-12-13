function createImageTag(selector, imgNumber, currentCount, position){
    let img = new Image();
    img.src = `images/grid/${imgNumber}.jpg`;
    img.style.position = 'absolute';

    if(position === 'left' || position === 'right') {
        img.style.top = `${currentCount * 100}px`;
        if(position === 'left') img.id = `l${currentCount}`;
        else img.id = `r${currentCount}`;
        
    }
    else if(position === 'up' || position === 'down') {
        img.style.left = `${currentCount * 100}px`;
        if(position === 'up') img.id = `u${currentCount}`;
        else img.id = `d${currentCount}`;
    }

    document.querySelector(`.${selector}`).appendChild(img);
}

function deleteImageTags(){
    let images = document.querySelectorAll('img');
    images.forEach(element => {
        element.parentNode.removeChild(element);
    });
}

function dynamicImageInserting(up, down, left, right){
    deleteImageTags();

    let imgNumber = 1;
    for(let i = 0; i < (up / 100); i++){
        createImageTag('upperImageLine', imgNumber, i, 'up');
        imgNumber++;
    }

    for(let i = 0; i < (down / 100); i++){
        createImageTag('bottomImageLine', imgNumber, i, 'down');
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

function swapImageAnimation(){
    let waySelector = ['.upperImageLine img', '.bottomImageLine img', '.leftImageLine img', '.rightImageLine img'];
    let wayIndex = Math.floor(Math.random() * 4);

    let imgArray = document.querySelectorAll(`${waySelector[wayIndex]}`);
    let arrayIndex = Math.floor(Math.random() * imgArray.length);

    if(arrayIndex == (imgArray.length-1)) arrayIndex--;

    let animationId = setInterval(swap, 10);

    let pos = 0;
    function swap(){
        if(pos === 100) clearInterval(animationId);
        else{
            if(wayIndex <= 1){
                let value1 = imgArray[arrayIndex].style.left;
                let value2 = imgArray[arrayIndex+1].style.left;
                imgArray[arrayIndex].style.left = (parseInt(value1.slice(0,value1.length-2))+1) + 'px';
                imgArray[arrayIndex+1].style.left = (parseInt(value2.slice(0,value2.length-2))-1) + 'px';
            }
            else{
                let value1 = imgArray[arrayIndex].style.top;
                let value2 = imgArray[arrayIndex+1].style.top;
                imgArray[arrayIndex].style.top = (parseInt(value1.slice(0,value1.length-2))+1) + 'px';
                imgArray[arrayIndex+1].style.top = (parseInt(value2.slice(0,value2.length-2))-1) + 'px';
            }
        }
        pos++;
    }
}

window.onload = () => {
    resizingContent();
    swapImageAnimation();

    window.addEventListener('resize', () => {
        resizingContent();
        swapImageAnimation();
    });
};
