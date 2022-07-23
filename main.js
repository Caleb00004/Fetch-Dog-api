// CSS NOTE
// Another way to get or find a specific element in html
// You can use document.querySelector('ele id')
// This will only get the first instance of an element with the id (i.e if working with a list with same id elements and you wan to delete only the first list element)
console.log("Here")

let dogArray = []

async function fetchData() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all")
    const data = await response.json()

//    console.log(data.message)
    createBreedList(data.message) 
}

fetchData()


function createBreedList (breedList) {
    // convert the breedList objects to array
    // NOtE the data returned from the api does not return array, it returns multiple
    // objects so we need to turn does objects in an array so it can be mapped through and displayed in the DOM

    let val = Object.entries(breedList)
    // returns array of the object keys | Object.keys(breedList)
    for (let i = 0; i <= 95; i++) {
        dogArray.push(val[i][0]) // to get indiviual keys from
    }

    // used 'this' keyword to identify element being clicked
    document.getElementById("dogBreeds").innerHTML = `
    <select onchange="handleFunc(this.value)"}>
        <option>Choose a category</option> 
        ${dogArray.map(item => `<option >${item}</option>`)}
    </select>
    `
}

async function handleFunc(value) {
    console.log("A change occured")
    let post = 0

    if (value != "Choose a category") {
        const response = await fetch(`https://dog.ceo/api/breed/${value}/images`)
        const data = await response.json()

        createSlideShow(data.message, post)
    }
}

function createSlideShow(image, position){
    console.log(position)
    console.log(image)
    function imageDisplay() {
        console.log("image display FUnc")
        return (
            document.getElementById("slideShow").innerHTML = `
            <div class="slide" ><img src="${image[position]}" alt="no image"></div>`
            
        )
    }

//    const imageList = image.map(imgItem => `<div class="slide" ><img src="${imgItem}" alt="no image">`)
    imageDisplay()
    setInterval(() => {
        if (position < image.length-1) {
            console.log("setInterval func")
            position ++
        } else {
            position = 0
        }
        imageDisplay()
    }, 5000);


/*    document.getElementById("slideShow").innerHTML = `

    <div class="slide" ><img src="${image[1]}" alt="no image"></div>
    <div class="slide" ><img src="${image[2]}" alt="no image"></div>
    `
*/
//    document.getElementById("slideShow").innerHTML = "<p>image tag</p>"
}
