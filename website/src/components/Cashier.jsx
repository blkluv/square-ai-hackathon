import {useState} from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import itemPrices from '../constants/itemCost';

const Cashier = () => {
    const [inputFields, setinputFields] = useState([{name: '', quantity: '',Price: '',Value: ''}]);
    const itemsCosts = itemPrices;
    const [registered, setregistered] = useState(false);
    const [userLogin, setuserLogin] = useState([{
        given_name: "",
        family_name: "",
        email_address: "",
      }])
    const addField =()=>{
        const input = {name: '', quantity: '',Price: ''};
        setinputFields([...inputFields,input]);
    }
    const deleteField=()=>{
        setinputFields([...inputFields.slice(0, inputFields.length-1)]);
    }
    const handleFormChange=(index, event)=>{
        let data = [...inputFields];
        data[index].quantity = event.target.value;
        data[index].Price = event.target.value * data[index].Value;
        setinputFields(data);
    }
    const handleSubmit=()=>{
        var inputObject = [];
        inputFields.map((inputField,key)=>{
            const _field = {name: inputField.name,quantity: inputField.quantity ,base_price_money:{amount: inputField.Value ,currency : 'USD'}};
            inputObject.push(_field);
        })
        setinputFields([{name: '', quantity: '',Price: ''}])
    }
    const handleInputChange=(event)=>{
        let data = userLogin;
        data[0][event.target.name] = event.target.value;
        setuserLogin(data);
    }
    const login=(event)=>{
        event.preventDefault();
        const loginArgs = userLogin[0];
        console.log("Data",userLogin[0]);
        //login using loginArgs
        setTimeout(()=>{setregistered(true)},1500)
    }
  return (
    <div>
        <p className='text-4xl'>Cashier</p>
        { registered ? 
            <div>
                <form>
                    {inputFields.map((field,i)=>{
                        return(
                            <div className='flex  my-2' key={i}>
                                <Autocomplete
                                    className='flex text-white rounded-2xl w-64' 
                                    disablePortal
                                    options={itemsCosts}
                                    onChange={(event,newValue)=>{
                                        let data = [...inputFields];
                                        data[i].name = newValue.label;
                                        data[i].Value = newValue.price;
                                        setinputFields(data);
                                    }}
                                    renderInput={(params) => <TextField {...params}  label="Item" />}
                                />
                                <input className='flex rounded-xl px-5 mx-2 py-2' type='number' onChange={(event) => handleFormChange(i, event)} name='Quantity' placeholder="Quantity" value={field.quantity}/>
                                <input className='flex rounded-xl px-5 mx-2 py-2' name='Price' placeholder="Price" disabled value={field.Price}/>
                            </div>
                        )
                    })}
                </form>
                <div className='flex-row'>
                <button className=' px-5 py-2 m-2 ' onClick={addField}>Add Item</button>
                <button className=' px-5 py-2 m-2 ' onClick={deleteField}>Delete Item</button>
                </div>
                <button className=' px-5 py-2 m-2 ' onClick={handleSubmit}>Submit</button>
            </div>
        :
        <div>
            <form>
                <div  className='flex  my-2'>
            <input className='flex rounded-xl px-5 mx-2 py-2' name='given_name' placeholder="Given Name" onChange={(event)=>{handleInputChange(event)}} required value={userLogin.given_name}/>
            <input className='flex rounded-xl px-5 mx-2 py-2' name='family_name' placeholder="Family Name" onChange={(event)=>{handleInputChange(event)}} required value={userLogin.family_name}/>
            <input className='flex rounded-xl px-5 mx-2 py-2' name='email_address' type='email' placeholder="Email" onChange={(event)=>{handleInputChange(event)}} required value={userLogin.email_address}/>
                </div>
            <button onClick={login}>Submit</button>
            </form>
        </div>
        }
        
    </div>
  )
}

export default Cashier