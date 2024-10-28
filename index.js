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
            return response.text(); 
        })
        .then((data) => {
            console.log(data); 
            const genDiv = document.getElementById('genDiv');
            const hexNum = document.getElementById('hex')
            hexNum.textContent = data.hex
            genDiv.appendChild(hexNum); 
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


// console.log(randomColor()); 
// console.log(randomColor()); 
// console.log(randomColor()); 
// console.log(randomColor()); 