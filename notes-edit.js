const noteId = location.hash.substring(1)
let notes = getSavedNotes()

const noteTitle = document.querySelector('#note-title')
const noteBody = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')

const dateElement = document.querySelector('#last-edited')
let note = notes.find(function(note){
    return note.id===noteId
})

if(note === undefined){
    location.assign('/index.html')
}

noteTitle.value = note.title
noteBody.value = note.body
dateElement.textContent = generateLastEdited(note.updatedAt)


noteTitle.addEventListener('input', function(e){
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)

    saveNotes(notes)
})


noteBody.addEventListener('input', function(e){
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)

    saveNotes(notes)
})

removeElement.addEventListener('click', function(e){
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.html')
})

window.addEventListener('storage',function(e){
    if(e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        let note = notes.find(function(note){
            return note.id === noteId
        })
        
        if(note === undefined){
            location.assign('/index.html')
        }
        noteTitle.value = note.title
        noteBody.value = note.body
        dateElement.textContent = generateLastEdited(note.updatedAt)

    }
})