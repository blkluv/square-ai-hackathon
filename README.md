# [square-ai-hackathon](https://www.youtube.com/watch?v=9OfL9H6AmhQ)
# What it does
**Storeguide** is a cutting-edge AI-powered solution designed to revolutionize your shopping experience and empower business owners in the retail industry. It offers a range of features for both customers and store owners, making shopping fun, efficient, and insightful.

## For Customers

- **Smart Navigation**: With Storeguide, you can simply tell the AI what you need, and it will pinpoint your current location within the store, providing precise directions to your desired products in your vicinity. Say goodbye to getting lost in the grocery store or spending hours searching for specific items.

- **Product Lists and Locations**: If you're unsure about what to buy for a specific recipe or task, our AI can provide you with comprehensive lists of items and their exact locations in the store. This simplifies your shopping process and ensures you don't forget any essential ingredients.

## For Business Owners

- **Effortless Store Layout Design**: Store owners can create or modify store layouts with ease, using a simple image click or drag-and-drop interface. The AI utilizes data from Square API, including invoices and inventory, to make suggestions on the optimal arrangement of products in the store.

![Adding New Items to Layout](https://github.com/M-sasank/square-ai-hackathon/blob/main/website/src/assets/addnew.gif?raw=true)

                                       Adding New Items to Layout

![Changing items](https://github.com/M-sasank/square-ai-hackathon/blob/main/website/src/assets/dnd.gif?raw=true)

                                       Changing Layout

- **Data-Driven Insights**: Storeguide's AI analyzes invoices and creates user graphs, enabling business owners to recognize patterns and gain valuable insights into customer behavior. These insights help in making informed decisions to enhance store performance.

- **Custom Gift Cards**: Leveraging the invoice data, business owners can create custom gift cards tailored to specific user groups. When similar invoices are generated in the future, these custom gift cards can be gifted to customers, enhancing loyalty and driving sales.

In summary, Storeguide offers a unique combination of convenience, data-driven decision-making, and personalization for both customers and business owners, making the shopping experience enjoyable and insightful for all.

## How we built it
- **Square APIs used**:
    - Auth: To let any seller to connect with our app to gain insights, send gift cards and add/modify layouts.
    - Orders: To generate orders for a customer
    - Invoice: To generate an invoice for a customer's order
    - Gift Cards: To send gift cards to customer groups
    - Customers: To create/retrieve customers when placing orders
    - Catalog: To add/retrieve store items
    - Inventory: To check store items and display them in the layout

- **Google Cloud Tools used**:
    - PaLM: For interaction with user, generating user graphs, calculating optimal path
    - Google Cloud Run: For deploying containerized backends, Machine Learning and AI models used for this project
    - Google Text-to-Speech: For generating voiceovers and voice replies to user.

**Technologies**: React, JavaScript, FastAPI, Docker, Google Cloud
## Challenges we ran into
- Working our way through the documentations of Sqaure APIs and SDKs was difficult initially
- Accurately generating user graphs based on invoice data was quite difficult
- Validation of PaLM responses. PaLM occasionally gives unexpected responses

## Accomplishments that we're proud of
- We are proud to have developed an innovative and cutting-edge AI-powered solution that has the potential to revolutionize the retail industry. 
- Our uniquely themed, interactive front-end layout design of the store, that allows shop keepers to change layout anytime.
- Our team's ability to overcome various challenges during the development process.

## What we learned
-  We aimed to create a unique solution in a competitive market, and this required a ton of research, thinking creatively, and understanding the market needs.
- We learned how to effectively integrate third-party APIs into our application, enabling us to access and manipulate data from these services.
-  We learned how to analyze data to recognize patterns and derive valuable insights for business owners
- We learnt how to use PaLM AI and are now confident enough to use it in our future projects.

## What's next for Storeguide
Storeguide has so much space it can expand its reach into thereby, enhancing its capabilities, and adapting to the evolving needs of the retail market. Few of these points are:

- Storeguide can continue to evolve by improving its AI capabilities. For example, a continuously improving AI and NLP models can give better customer interactions, smarter recommendations, and an even more accurate understanding of customer behavior day by day.
- Storeguide can get integrate other Square endpoints such as, Loyalty Program, Payments, etc.
- The application can be expanded beyond grocery stores to clothing stores, electronics stores, or even larger department stores.
-  Implementing a feedback system where customers can rate their shopping experiences and provide suggestions
