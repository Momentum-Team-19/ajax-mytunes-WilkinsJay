const searchResults = document.querySelector('#searchResults')
const musicPlayer = document.getElementById('musicPlayer')
const modeSwitch = document.getElementById('modeSwitch')
// Calling on the differnt attributes in HTML
modeSwitch.addEventListener("click", toggleDarkMode)
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

let form = document.querySelector('#searchBox')

function clear(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

form.addEventListener('submit', (event) => {
    //prevents the page from reloading and prevents the form being sent to the wrong place as well
    event.preventDefault();
    clear(searchResults)

    let barDiv = document.querySelector('#bar')
    let word = barDiv.value 
// allows you to input text inside the bar and search it

    fetch('https://itunes.apple.com/search?term=' + word, {
        method: 'GET',
        headers: {"Content-Type": "application/json"}
    })
    
    .then((response) => {
        return response.json()
    })
    
    .then ((data) => {
        console.log(data.results)
// an empty array is truthy. Acts as if its true
// if is a conditional
        if (data.results.length === 0) {
            // my search results will be 0 of whatever i tried to search
            console.log('no results')
            let messageDiv = document.createElement('div')
            messageDiv.innerText = "No search results found"
            searchResults.append(messageDiv)
        }
        else {
            
            for (let song of data.results) {
                let resultBox = document.createElement('div')
                resultBox.id = "resultBox"
                
                let imageDiv = document.createElement('img')
                imageDiv.src = song.artworkUrl100
                resultBox.append(imageDiv)
                
                let songDiv = document.createElement('div')
                songDiv.classList.add('songTitle')
                songDiv.innerText = song.trackName
                resultBox.append(songDiv)
                
                searchResults.append(resultBox)
                resultBox.addEventListener("click",() => {
                    musicPlayer.src = song.previewUrl;
                    musicPlayer.controls = true;
                    musicPlayer.preload = "auto";
                    
                })
            }
        }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            let errorMessage = document.createElement('div')
            errorMessage.innerText = "Page could not be loaded"
            searchResults.append(errorMessage)
        })
    })
