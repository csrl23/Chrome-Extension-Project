document.addEventListener('DOMContentLoaded', () => {
//   const storedColors = localStorage.getItem('colors');
  // if (storedColors) {
  //   //if the colors are already stored, apply it the same way getColor() worked
  //   const colors = JSON.parse(storedColors)
  //   let swatch = "swatch"; 
  //   let hex = "hex"; 
  //   let swatchNum = 1;
  //  for (const elem of colors) {
  //     let concatSwatch = swatch + swatchNum; 
  //       const colorSwatch = document.querySelector(`.${concatSwatch}`);
  //       colorSwatch.style.backgroundColor = `${elem}`;
  //       let concatHex = hex + swatchNum; 
  //       const hexNum = document.querySelector(`.${concatSwatch}`);
  //       hexNum.textContent = `${elem}`;
  //       swatchNum++; 
  //   }
  // } 
//   chrome.storage.local.get(["colors"]).then((result) => {
//     if(result.colors) {

//     } else {
//         getColor()
//     }

//   });
  getColor(); //otherwise randomize a new set of colors
});

// function getColor() {
//     fetch(`https://www.thecolorapi.com/id?hex=${randomColor()}`,
//         {headers: {
//             "Accept": "application/json"
//         }}
//       )
//         .then((response) => {
//             if(!response.ok) throw new Error(`${response.status}`);
//             return response.json();
//         })
//         .then((data) => {
//             console.log(data);
//             // const genDiv = document.getElementById('genDiv');
//             // const hexData = document.createElement('h4');
//             // hexData.innerHTML = data.hex.value;
//             const hexNum = document.getElementById('hex');
//             hexNum.textContent = data.hex.value;
//             // hexNum.appendChild(hexNum);
//             const colorDisplay = document.getElementById('color-display');
//             colorDisplay.style.backgroundColor = `${data.hex.value}`
//         })
//         .catch((error) => console.error('Fetch Error:', error));
// }

function getColor() {
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${randomColor()}&mode=analogic&count=6`,
    {
      headers: {
        Accept: 'application/json',
      },
    }
  )
    .then((response) => {
      if (!response.ok) throw new Error(`${response.status}`);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const colors = data.colors;
      let swatch = "swatch"; 
      let hex = "hex"; 
      let swatchNum = 1; 
      const array = [];
      for (const color of colors) {
        let concatSwatch = swatch + swatchNum; 
        console.log(concatSwatch); 
        const colorSwatch = document.querySelector(`.${concatSwatch}`);
        colorSwatch.style.backgroundColor = `${color.hex.value}`;
        // const hexVal = document.createElement('p');
        // hexVal.setAttribute('id','hexvalue');
        let concatHex = hex + swatchNum; 
        const hexNum = document.querySelector(`.${concatHex}`);
        hexNum.textContent = `${color.hex.value}`;
        swatchNum++; 
        // colorSwatches.appendChild(colorDisplay);
        // const breakElem = document.createElement('br');
        // colorSwatches.appendChild(breakElem);
        array.push(`${color.hex.value}`); 
        console.log(array);
      }
      // const hexNum = document.getElementById('hex');
      // hexNum.textContent = data.hex.value;
      // const colorDisplay = document.getElementById('color-display');
      // colorDisplay.style.backgroundColor = `${data.hex.value}`
    //   localStorage.setItem('colors',JSON.stringify(array))
    })
    .catch((error) => console.error('Fetch Error:', error));
}

// function displayPalette(color) {
//   // const hexNum = document.getElementById('hex');
//   // hexNum.textContent = data.hex.value;
//   // const colorDisplay = document.getElementById('color-display');
//   // colorDisplay.style.backgroundColor = `${data.hex.value}`

//   const colorSwatches = document.getElementById('color-swatches');
//   const colorDisplay = document.createElement('div');
//   colorDisplay.id = 'color-display';
//   colorDisplay.style.backgroundColor = `${color.hex.value}`;
//   colorSwatches.appendChild(colorDisplay);
//   const breakElem = document.createElement('br');
//   colorSwatches.appendChild(breakElem);
// }

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
      newColors.push((element = '0' + element));
    } else {
      newColors.push(element);
    }
  }
  return newColors.join('');
};

const colorButton = document.getElementById('button');
colorButton.addEventListener('click', () => {
//   const colorSwatches = document.getElementById('color-swatches');
//   const hexVal = document.querySelector('hexvalue');

//   const hexVal = document.getElementById('hexvalue');
//   if(hexVal) {
//     hexVal.textContent = ''; 
//   }
//   const colorSwatch = document.querySelector(`.${concatSwatch}`);
//   colorSwatch.removeChild(hexVal);
//   colorSwatches.removeChild(hexVal)
  getColor();
});

/** COPY TO CLIPBOARD FUNCTION */
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
    const hexes = document.querySelectorAll(".hex1, .hex2, .hex3, .hex4, .hex5, .hex6");
    const hexCodes = Array.from(hexes).map((elem) => elem.textContent).join("\n"); 

    navigator.clipboard.writeText(hexCodes);
    const buttonDiv = document.getElementById("message");
    buttonDiv.innerHTML = "Copied!";
}

function hoverMessage() {
    const messageDisplay = document.getElementById("message");
    messageDisplay.innerHTML = "Copy to clipboard";
}


