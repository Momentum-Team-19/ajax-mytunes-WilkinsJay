const searchResults = document.querySelector('#searchResults')

fetch('https://itunes.apple.com/search?term=jack+johnson.', {
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
        let songDiv = document.createElement('div')
        songDiv.innerText = song.trackName
        resultBox.append(songDiv)

        let imageDiv = document.createElement('img')
        imageDiv.src = song.artworkUrl100
        resultBox.append(imageDiv)

        searchResults.append(resultBox)
    }
})