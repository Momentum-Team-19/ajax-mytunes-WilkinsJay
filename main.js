const searchResults = document.querySelector('#searchResults')
const musicPlayer = document.getElementById('musicPlayer')

let form = document.querySelector('#searchBox')

function clear(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    clear(searchResults)

    let barDiv = document.querySelector('#bar')
    let word = barDiv.value 


    fetch('https://itunes.apple.com/search?term=' + word, {
        method: 'GET',
        headers: {"Content-Type": "application/json"}
    })
    
    .then((response) => {
        return response.json()
    })
    
    .then ((data) => {
        console.log(data.results)
    
        
        for (let song of data.results) {
            let resultBox = document.createElement('div')
            resultBox.id = "resultBox"
            
            let imageDiv = document.createElement('img')
            imageDiv.src = song.artworkUrl100
            resultBox.append(imageDiv)
            
            let songDiv = document.createElement('div')
            songDiv.innerText = song.trackName
            resultBox.append(songDiv)
    
            searchResults.append(resultBox)
            resultBox.addEventListener("click",() => {
                musicPlayer.src = song.previewUrl;
                musicPlayer.controls = true;
                musicPlayer.preload = "auto";
                
            })
        }
    })
})
