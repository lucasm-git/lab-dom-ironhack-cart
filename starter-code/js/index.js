


  ///////////////////////////////////
  // CALCULATE PRICES
  ///////////////////////////////////
  
  // Defining the function, will be called upon clicking on a button
  calculatePrice = function() {

    // Saving all the elements we're going to use inside variables, to make them 'accessible' inside Javascript
    var totalPrices = document.querySelectorAll(".total-price");
    var quantities = document.querySelectorAll(".unit-quantity");
    var unitPrices = document.querySelectorAll(".unit-price");
    var globalPrice = document.querySelector(".global-price");

    // Creating a counter that we'll use to callculate the big, global price
    var counter = 0;
    
    // Making a loop, so I can calculate each line's price individually
    for(var i=0; i<unitPrices.length; i++) {
      totalPrices[i].innerHTML = Number(quantities[i].value) * Number(unitPrices[i].innerHTML);
      counter += Number(totalPrices[i].innerHTML);
    }

    // Setting the value of the global price DOM element to the counter's value.
    // As a reminder, the counter is the place we stored the sum of all the item's total prices, during the loop
    globalPrice.innerHTML = counter;
    
  };
  
  // Saving the calculate button inside a variable so I can put an 'onclick' on it
  var calculateBtn = document.querySelector(".btn-success");

  // Setting the calculate button's onclick function
  calculateBtn.onclick = calculatePrice;
  
  




  ///////////////////////////////////
  // DELETE BUTTONS
  ///////////////////////////////////
  
  // Defining the function, will be called upon clicking on a button
  deleteItem = function( event ) {

    // event here symbolizes the click
    // event.target selects the element the click happened on, allowing us to find exactly which butotn was clicked
    // parentNode selects the current node's direct parent
    // remove() actually removes the DOM node from the DOM, deleting the line on the page
    event.target.parentNode.parentNode.remove();
  }

  // Saving the delete buttons inside a collection of buttons, so I can apply my onlick on all of them
  var deleteButtons = document.querySelectorAll(".btn-delete");

  // Looping over all the buttons of my collection
  deleteButtons.forEach( each => {

    // Applying the same onclick function on all of them, so any of them would trigger the deleteItem function when clicked
    each.onclick = deleteItem;
  });
  
  
  



  ///////////////////////////////////
  // CREATE LINE
  ///////////////////////////////////
  
  // Defining the function, will be called upon clicking on a button
  function createItem() {
    
    // I created a wrapper in the HTML, so I can appendChild the divs I'm going to create to it
    var itemsList = document.querySelector( ".items-wrapper" );

    // I create a new "div" DOM element, and save it inside my newDiv variable
    var newDiv = document.createElement( "div" );

    // I want my div to have the "wrapper" class, so I use setAttribute
    newDiv.setAttribute( "class", "wrapper" );

    // I created two inputs in the HTML, so the user can choose a name and a price for the new product
    // I gave those inputs IDs, and now I save them inside those variable to be able to retrieve their values
    var itemName = document.querySelector( "#name" );
    var itemPrice = document.querySelector( "#price" );
    
    // I want my newDiv to have the same HTML structure than the already existing items, so I create a content variable with it
    // Here I didn't use regular "" or '', but `` (backticks, or accent grave).
    // Those allow two cool things:
    //    I can break lines, and thus have a proper HTML structure with indentation: easy to write and to read
    //    I can easily use javascript variables inside it, with the ${ myVariable } syntax
    // having those variable that hold my inputs, I can easily inject them inside my content's HTML structure
    var content = `
      <div><span>${ itemName.value }</span></div>
      
      <div>$<span class="unit-price" id="unit-price">${ itemPrice.value }</span></div>
      
      <div>
        <label for="units" class="quantity">QTY</label>
        <input class="unit-quantity" id="units" placeholder="Buy ALL the things!">
      </div>
      
      <div>$<span class="total-price" id="total-price">0.00</span></div>
      
      <div>
        <button class="btn btn-delete">Delete</button>
      </div>
    `;

    // Now that I have have my content, I can simply add it inside my newDiv, using innerHTML
    newDiv.innerHTML = content;

    // My newDiv is ready, I can add it to the actual DOM using appendChild
    itemsList.appendChild( newDiv );


    // Once I'm done with creating the new item line, I clear the inputs by redefining their values to empty string ""
    itemName.value = "";
    itemPrice.value = "";
  
    // I created my new item line along with the delete button.
    // But since the delete buttons collection is created earlier, before I create my new line, my new delete button doesn't have the onclick function
    // Thus, I need to make sure it's inside the delete buttons collection by updating the deleteButtons value, like so:
    deleteButtons = document.querySelectorAll(".btn-delete");

    // And then, I need to apply the onclick function again on all the buttons of the collection,
    // so I'm sure the newly created button has the onclick function too
    deleteButtons.forEach( each => {
      each.onclick = deleteItem;
    })
  }
    
    // Here I assign my HTML button to a Javascript variable
    var createButton = document.querySelector( ".create-button" );

    // And I assign the createItem I just defined to it
    createButton.onclick = createItem;