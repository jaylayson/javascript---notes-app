//read existing notes from localStorage
const getSavedNotes = function() {

    const notesJSON = localStorage.getItem('notes')
    if(notesJSON !== null){
        return JSON.parse(notesJSON)
    }else{
        return []
    }
}

//save the notes to local storage
const saveNotes = function(notes){
    localStorage.setItem('notes', JSON.stringify(notes))
}

//remove a note
const removeNote = function(id){
    const noteIndex = notes.findIndex(function(note){
        return note.id === id
    })
    if(noteIndex > -1){
        notes.splice(noteIndex, 1)
    }
}

//generate the DOM structure for a note
const generateNoteDom = function(note){
    const noteElement = document.createElement('div')
    const textElement = document.createElement('a')
    const button = document.createElement('button')

    //setup remove note button
    button.textContent = 'x'
    noteElement.appendChild(button)
    button.addEventListener('click', function(){
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes, filters)
    })

    //setup note title
    if(note.title.length > 0){
        textElement.textContent = note.title
    }else{
        textElement.textContent = 'No notes'
    }
    textElement.setAttribute('href', `/edit.html#${note.id}`)
    noteElement.appendChild(textElement)
    

    return noteElement
}


const sortNotes = function(notes, sortBy){
    if(sortBy === 'byEdited'){
        return notes.sort(function(a,b){
            if(a.updatedAt > b .updatedAt){
                return -1
            }else if(a.updatedAt < b.updatedAt){
                return 1
            }else{
                return 0
            }
        })
    }else if(sortBy === 'byCreated' ){
        return notes.sort(function(a,b){
            if(a.createdAt > b.createdAt){
                return -1
            }else if(a.createdAt < b.createdAt){
                return 1
            }else{
                return 0
            }
        })
    } else if(sortBy === 'alphabetical'){
        return notes.sort(function(a,b){
            if(a.title.toLowerCase() < b.title.toLowerCase()){
                return -1
            }else if(a.title.toLowerCase > b.title.toLowerCase()){
                return 1
            }else{
                return 0
            }
        })
    } else{
        return notes
    }
}



//render application notes
const renderNotes = function(notes, filters){

    notes = sortNotes(notes, filters.sortBy)
    //render(filtered)
    const filteredNotes = notes.filter(function(note){
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    //clear
    document.querySelector('#notes').innerHTML = ''

    //load all the notes into the div & update the filtered notes
    filteredNotes.forEach(function(note){
        const noteElement = generateNoteDom(note)
        document.querySelector('#notes').appendChild(noteElement)
    })  
}

const generateLastEdited = function(timestamp){
    return `Last edited: ${moment(timestamp).fromNow()}`
}