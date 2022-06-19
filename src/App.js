import React, { useEffect, useState } from 'react'
import Display from './Components/Display'
import services from './Services/API'
import Messege from './Components/Message'


const App = () => {
  const [persons, setPersons] = useState([])
  const [filterdPersons, setFilterdPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [phone, setPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [messege, setMessege] = useState('')



  useEffect(() => {
    services.getAll()
      .then(response => {
        setPersons(response.data)  
      })
  }, [])




  const addName = (event) => {
    event.preventDefault()
    const personobj = {
      name: newName,
      phone: phone,
      id: persons.length + 1,
    }

    services.add(personobj)
      .then(response => {
        setPersons(persons.concat(response.data))
      })






      setPersons(persons.concat(personobj))

    setNewName('')

  }

  const Namehandler = (event) => {
    setNewName(event.target.value)
  }
  const Phonehandler = (event) => {
    setPhone(event.target.value)
  }
  const Filterhandler = (event) => {
    setFilter(event.target.value)
    setFilterdPersons(persons.filter((person) => { return person.name.startsWith(filter) }))
  }
  const messegeHandler = (event) => {
    setMessege(`added ${newName}`)
  }

  return (
    <div >
      <h2>phonebook</h2>
      {messege ? <Messege messege={messege} setMessege={setMessege} /> : null}
      filter show with:  <input
        value={filter}
        onChange={Filterhandler} />
      <h2>add new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
            value={newName}
            onChange={Namehandler} />
          Number: <input
            value={phone}
            onChange={Phonehandler} />
        </div>
        <div>
          <button onClick={messegeHandler} type="submit">add</button>
         </div>       
      </form>
      <h2>Numbers</h2>
      <Display setPersons={setPersons} persons={filter !== '' ? filterdPersons : persons} />

    </div>
  )
}

export default App