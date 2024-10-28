document.addEventListener('DOMContentLoaded', () => {
    getColor(); 
}); 


function getColor() {
    fetch(`https://www.thecolorapi.com/id?hex=${randomColor()}`, 
        {headers: {
            "Accept": "application/json"
        }}
      )
        .then((response) => {
            if(!response.ok) throw new Error(`${response.status}`); 
            return response.json(); 
        })
        .then((data) => {
            console.log(data); 
            // const genDiv = document.getElementById('genDiv');
            // const hexData = document.createElement('h4'); 
            // hexData.innerHTML = data.hex.value; 
            const hexNum = document.getElementById('hex'); 
            hexNum.textContent = data.hex.value; 
            // hexNum.appendChild(hexNum); 
            const colorDisplay = document.getElementById('color-display'); 
            colorDisplay.style.backgroundColor = `${data.hex.value}`
        })
        .catch((error) => console.error('Fetch Error:', error)); 
}

const randomColor = () => {
  const red = Math.floor(Math.random() * 255).toString(16); 
  const green = Math.floor(Math.random() * 255).toString(16); 
  const blue = Math.floor(Math.random() * 255).toString(16); 

// let red = '5'
// let green = '7'
// let blue = 'cb'

  let colors = [red, green, blue]; 
//   console.log(colors); 

  let newColors = []; 

  // to check if the red, green or blue values are single digits
  for (let element of colors) {
    if (element.length !== 2) {
        newColors.push(element = '0' + element); 
    } else {
        newColors.push(element); 
    }
  }
  return newColors.join(''); 
}

const colorButton = document.getElementById('button'); 
colorButton.addEventListener('click', () => getColor()); 


//copy button attributes
const copyButton = document.getElementById('copy-button');
copyButton.addEventListener('click', () => copyClip()); 
copyButton.addEventListener('mouseout', () => hoverMessage()); 

// changing the image button
copyButton.addEventListener('mouseover', () => {
    const darkImage = document.getElementById('img-button'); 
    darkImage.src = 'copy-black.png'; 
}); 
copyButton.addEventListener('mouseout', () => {
    const darkImage = document.getElementById('img-button'); 
    darkImage.src = 'copy.png'; 
}); 


function copyClip() {
    const copyText = document.getElementById("hex"); 
    navigator.clipboard.writeText(copyText.textContent);
    // alert("Copied the text: " + copyText.textContent);
    const buttonDiv = document.getElementById("message");
    buttonDiv.innerHTML = "Copied: " + copyText.textContent;
}

function hoverMessage() {
    const messageDisplay = document.getElementById("message"); 
    messageDisplay.innerHTML = "Copy to clipboard";
}
