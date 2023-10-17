import {useState} from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import itemPrices from '../constants/itemCost';
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
const Cashier = () => {
    const { width, height } = useWindowSize()
    const [inputFields, setinputFields] = useState([{name: '', quantity: '',Price: '',Value: ''}]);
    const itemsCosts = itemPrices;
    const [registered, setregistered] = useState(false);
    const [OrderID,setOrderID]=useState(null)
    const [InvoiceID,setInvoiceID]=useState(null)
    const [loading, setLoading] = useState(false); // Add loading state

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
        setLoading(true); 

        var inputObject = [];
        inputFields.map((inputField,key)=>{
            const _field = {name: inputField.name,quantity: inputField.quantity ,base_price_money:{amount: inputField.Value ,currency : 'USD'}};
            inputObject.push(_field);
        })
        inputObject = inputFields.map((inputField) => ({
            name: inputField.name,
            quantity: inputField.quantity,
            base_price_money: {
              amount: parseInt(inputField.Price), // Assuming 'Price' is the correct field name
              currency: 'USD',
            },
          }));
        
          // Create the request payload
          const requestData = {
            at: "EAAAEIylKKpcD2QYDjqLRUCuc8sZaXzoS31f30G0Xpoe0papCkX0cxGpsQaHOjHP",
            order_list: {
              items: inputObject,
            },
          };
        console.log(requestData)
        fetch("https://google-square-4zxc4m7upa-el.a.run.app/order/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify( requestData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.json();
    })
    .then((data) => {
      // Handle the response data here
      setOrderID(data.order_id)
      console.log(data.order_id);
      const Reqdata={
            at: "EAAAEIylKKpcD2QYDjqLRUCuc8sZaXzoS31f30G0Xpoe0papCkX0cxGpsQaHOjHP",
            order_id: data.order_id,
            customer_id: localStorage.getItem("customer_id")
          }
          console.log(Reqdata)
      fetch("https://google-square-4zxc4m7upa-el.a.run.app/invoice/create",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( Reqdata),
      }) .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        return response.json();
      })
      .then((data) => {
        setInvoiceID(data.invoice_id)
        setLoading(false); 

        console.log("recieved",data)
      })
    })
    .catch((error) => {
      // Handle errors here
      console.error(error);
    });
        setinputFields([{name: '', quantity: '',Price: ''}])
    }
    const handleInputChange=(event)=>{
        let data = userLogin;
        data[0][event.target.name] = event.target.value;
        setuserLogin(data);
    }
    const login = (event) => {
        setLoading(true); 
        event.preventDefault();
      
        // Extract customer details from userLogin[0]
        const user = userLogin[0];
      
        // Create the request payload with all customer details
        const payload = {
          at: "EAAAEIylKKpcD2QYDjqLRUCuc8sZaXzoS31f30G0Xpoe0papCkX0cxGpsQaHOjHP",
          customer_details: {
            given_name: user.given_name,
            family_name: user.family_name,
            email_address: user.email_address,
          },
        };
      
        // Perform the API call with POST method and request body
        fetch("https://google-square-4zxc4m7upa-el.a.run.app/customer/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("API Response", data);
      
            // Store the customer_id in local storage
            if (data.customer_id) {
              localStorage.setItem("customer_id", data.customer_id);
            }
      
            // You can update your state or perform other actions based on the API response here
            // For example, you might want to call setregistered(true) if the API call was successful.
            setregistered(true);
            setLoading(false); 

          })
          .catch((error) => {
            console.error("API Error", error);
            // Handle any error that occurred during the API call
          });
      };
      
      
      return (
        <div>
          {loading ? (
              <div class="text-center">
              <div role="status">
              <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span class="sr-only">Loading...</span>
              </div>
          </div>
          ) : (
        
            !InvoiceID ?
            <div>
        { registered ? 
            <div>
                <p className='text-xl'>Enter Invoice Data</p>

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
            <p className='text-xl'>Enter Customer Data</p>

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
            :<div>
                <Confetti
      width={width}
      height={height}
      recycle={false} 
    />
                <h1>Transaction successful</h1>
                <p>{InvoiceID}</p>
                <button onClick={()=>{setInvoiceID(null);setregistered(false)}}>Next customer</button>
            </div>
        )}
    </div>
  )
}

export default Cashier