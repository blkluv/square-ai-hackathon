const dummyUsers = [];

const generateRandomItems = () => {
    const items = [];
    for (let i = 0; i < 100; i++) {
      const userItems = [];
      for (let j = 0; j < 10; j++) {
        const itemName = `Item_${i}_${j}`;
        const quantity = (Math.floor(Math.random() * 10) + 1)+"";
        const price = (Math.random() * 100).toFixed(2); // Generate a random price with 2 decimal places
        userItems.push({
          name: itemName,
          quantity: quantity,
          base_price_money: {
            amount: price,
            currency: 'USD',
          },
        });
      }
      items.push(userItems);
    }
    return items;
  };
  
  // Call the generateRandomItems function to get your array
const arrayOfItems = generateRandomItems();


for (let i = 0; i < 1; i++) {
  const user = {
    given_name: `User${i}`,
    family_name: `Lastname${i}`,
    email_address: `user${i}@example.com`,
  };
  dummyUsers.push(user);
}
let customerId = "";

async function cashier(){
for (let i = 0; i < dummyUsers.length; i++) {
  const payload = {
    at: "EAAAEIylKKpcD2QYDjqLRUCuc8sZaXzoS31f30G0Xpoe0papCkX0cxGpsQaHOjHP",
    customer_details: {
      given_name: dummyUsers[i].given_name,
      family_name: dummyUsers[i].family_name,
      email_address: dummyUsers[i].email_address,
    },
  };

  // Perform the API call with POST method and request body
  await fetch("https://google-square-4zxc4m7upa-el.a.run.app/customer/create", {
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
        customerId = data.customer_id
      }
    });

  const requestData = {
    at: "EAAAEIylKKpcD2QYDjqLRUCuc8sZaXzoS31f30G0Xpoe0papCkX0cxGpsQaHOjHP",
    order_list: {
      items: arrayOfItems[i],
    },
  };
  console.log(requestData);
  await fetch("https://google-square-4zxc4m7upa-el.a.run.app/order/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.json();
    })
    .then(async (data) => {
      // Handle the response data here
    //   setOrderID(data.order_id);
    //   console.log(data.order_id);
      const Reqdata = {
        at: "EAAAEIylKKpcD2QYDjqLRUCuc8sZaXzoS31f30G0Xpoe0papCkX0cxGpsQaHOjHP",
        order_id: data.order_id,
        customer_id: customerId,
      };
      console.log(Reqdata);
      await fetch("https://google-square-4zxc4m7upa-el.a.run.app/invoice/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Reqdata),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Request failed");
          }
          return response.json();
        })
        .then((data) => {
        //   setInvoiceID(data.invoice_id);
        //   setLoading(false);

          console.log("recieved", data);
        });
    })
    .catch((error) => {
      // Handle errors here
      console.error(error);
    });
//   setinputFields([{ name: "", quantity: "", Price: "" }]);
}
}

cashier()
