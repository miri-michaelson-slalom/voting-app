
import RadioButton from './components/radio-button';
import './App.css';

async function  loadSayhello() {
  console.log("say hello")
  const response = await fetch('http://localhost:9000/graphql', {
     method:'POST',
     headers:{'content-type':'application/json'},
     body:JSON.stringify({query: 'test'})
  })
  const rsponseBody =  await response.json();
  console.log("rsponseBody", rsponseBody)
  return rsponseBody.data;
  console.log("end of function")

}


const options = [
  {name: 'Option 1', color: 'red'}, 
  {name: 'Option 2', color: 'blue'}, 
  {name: 'Option 3', color: 'pink'}, 
  {name: 'Option 4', color: 'purple'}, 

]
const App = () => {

  const submitHandler = (e) => {
    console.log("hello")
    loadSayhello().then(res => console.log(res))
    // alert("hi!")
    e.preventDefault()
  };

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        {options.map( (option) => {  
            return (   
              <RadioButton group='radioOptions' name={option.name} key={option.name}/>
            )
        })}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
