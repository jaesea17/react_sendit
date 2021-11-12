let body = document.getElementById("divTable");

export const generateTable = (data)=>{
   
  //creating table dynamically  
    let myList = document.createElement("table");
    let headers = ["ORDER NUMBER","PACKAGE","WEIGHT",
                    "COUNTRY FROM","ADDRESS FROM","CITY FROM",
                    "STATE FROM","COUNTRY TO","ADDRESS TO",
                    "CITY TO","STATE TO","STATUS","LOCATION","CUSTOMER ID","CUSTOMER EMAIL"];

    let heading = document.createElement('tr');
    headers.forEach((header)=>{
      let row = document.createElement("th");
      row.innerHTML = header;
      heading.appendChild(row);
      myList.appendChild(heading);
      //body.appendChild(myList);
    });
    
    let reply = [];
    for(var i = 0; i < data.length; i++){
      let unique = [];      
        unique.push(data[i].order_number); 
        unique.push(data[i].package);  
        unique.push(data[i].weight);
        unique.push(data[i].f_country);
        unique.push(data[i].f_address);
        unique.push(data[i].f_city);
        unique.push(data[i].f_state);
        unique.push(data[i].t_country);
        unique.push(data[i].t_address);
        unique.push(data[i].t_city);
        unique.push(data[i].t_state);
        unique.push(data[i].status);
        unique.push(data[i].location);
        unique.push(data[i].customer_id);
        unique.push(data[i].email);

        reply.push(unique);
      };
      reply.forEach((item)=>{
        let listItem = document.createElement('tr');
        item.forEach((single)=>{
          let product = document.createElement('td');
              product.innerHTML = single;
              listItem.appendChild(product);       
            });
            myList.appendChild(listItem);
            body.appendChild(myList);
      });

};
