function createGrid(gridContainer, size) {
    gridContainer.innerHTML = '';
 
    for(let i = 0; i < size; i++) {
        let column = document.createElement('div');
        column.setAttribute('class', 'column')
    
        for(let j = 0; j < size; j++) {
            let square = document.createElement('div');
            square.classList.add('square');
            column.appendChild(square);
        }
        gridContainer.appendChild(column)
    }
}


/* Code to add a background to the square depending of the button activated */
function addBackgroundColor(targetElement){
    let activatedButton = 'colorBtn';

    for(let i = 0; i < settingsButtons.length; i++){
        if(settingsButtons[i].classList.contains('active')) {
            activatedButton = settingsButtons[i].id;
        }
    }

    switch(activatedButton) {
        case 'colorBtn':
            const colorPickerValue = document.querySelector('#colorPicker').value;
            targetElement.style.backgroundColor = colorPickerValue;
            break;

        case 'rainbowBtn': 
            const r = Math.floor(Math.random() * (250 - 1 + 1) + 1);
            const g = Math.floor(Math.random() * (250 - 1 + 1) + 1);
            const b = Math.floor(Math.random() * (250 - 1 + 1) + 1);
            const rgb = `rgb(${[r,g,b].join(',')})`
            targetElement.style.backgroundColor = rgb;
            break;

        case 'eraseBtn': 
            targetElement.style.backgroundColor = 'white';
            break;

        default:
            console.log('Something went wrong, there is no button with "active" class');
    
    }
}


function squareListener(square){
    
    let isDown = false; 

    window.addEventListener('mousedown', () => { 
        isDown = true; 
    });


    window.addEventListener('mouseup', () => {
        isDown = false;
    }); 

    square.addEventListener('mouseover', (e) => {
        if(isDown) {
            addBackgroundColor(e.target);
            e.preventDefault();

        }
    });

    square.addEventListener('mousedown', (e) => { 
        addBackgroundColor(e.target);
        e.preventDefault();
    });

}


function clearSquares(){
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => { 
        square.style.backgroundColor = "white"; 
    });
}


function addActiveClass(targetElement, elements){
    for(let element of elements) { 
        if(element.classList.contains('active')) {
            element.classList.remove('active');
            break;
        }
    }
    targetElement.classList.add('active');
}


function newGrid(size=16){
    const grid = document.querySelector('#grid');
    createGrid(grid, size);
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => squareListener(square));
}


const settingsButtons = document.querySelectorAll('.settings button');

const sizeSlider = document.querySelector('#sizeSlider');
const sizePara = document.querySelector('#sizePara');

sizeSlider.addEventListener('change', () => {
    const sizeValue = sizeSlider.value;
    newGrid(sizeValue)
    sizePara.textContent = `${sizeValue} x ${sizeValue}`;
});

settingsButtons.forEach((buttonListener) => {
    switch(buttonListener.id) {
        case "clearBtn":
            buttonListener.addEventListener('click', clearSquares);
            break;

        default:
            buttonListener.addEventListener('click', e =>  !e.target.classList.contains('active') ? addActiveClass(e.target, settingsButtons):console.log("fail") );
            
    }
});

newGrid();
