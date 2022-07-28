
import RadioButton from './components/radio-button';
import './App.css';

const options = [
  {name: 'Option 1', color: 'red'}, 
  {name: 'Option 2', color: 'blue'}, 
  {name: 'Option 3', color: 'pink'}, 
  {name: 'Option 4', color: 'purple'}, 

]
const App = () => {

  const submitHandler = (e) => {
    alert("hi!")
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
