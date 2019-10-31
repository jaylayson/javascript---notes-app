let notes = getSavedNotes()

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

renderNotes(notes, filters)

//query ID element
document.querySelector('#create').addEventListener('click', function(event){
    const id = uuidv4()
    const timestamp = moment().valueOf()
    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: timestamp,
        updatedAt:timestamp
    })
    saveNotes(notes)
    //renderNotes(notes, filters)
    location.assign(`/edit.html#${id}`)
})


document.querySelector('#search').addEventListener('input', function(e){
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', function(e){
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})

window.addEventListener('storage',function(e){
    if(e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
})

// const now = moment()
// console.log(now.valueOf())
// now.minute()
// console.log(now.toString())

// const birthday = moment()
// birthday.year(1997).month(1).date(3)
// console.log(birthday.format('MMM D, YYYY'))

//1. created at and updatedAt to new notes (store timestamps)
//2. update updatedAt when somene edits a title or body
//3. delete all old notes before testing