import services from "../Services/API"

const Display = ({ persons, setPersons }) => {
  const remove = (id) => {
      const person = persons.find(p => p.id = id)
      console.log(person)
      const removedPerson = { ...person }
      services.remove(removedPerson.id).then(response => {
        console.log({response})
        setPersons( persons.filter((person => person.id !== removedPerson.id)))
      })
  }


  return (

    persons.map((person, key) => {
      return <li key={key}>{person.name} {person.phone}
        <button onClick={() => {remove(person.id)}} > delete </button></li>
    })
  )
}
export default Display

