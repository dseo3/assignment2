function range(int) {
    const arr = [];
    for (let i = 0; i < int; i += 1) {
      arr.push(i);
    }
    return arr;
  }
  
  function sortFunction(a, b, key) {
    if (a[key] < b[key]) {
      return -1;
    } if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  }
  
  const orderedList = document.createElement('ol');
  orderedList.className = "flex-inner";
  $("form").prepend(orderedList);
  
  
  document.body.addEventListener('submit', async (e) => {
    e.preventDefault(); // this stops whatever the browser wanted to do itself.
    const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then((fromServer) => fromServer.json())
      .then((fromServer) => {
      
    
      const countryNames = fromServer.map(fName => fName.name);
      const countryCode = fromServer.map(fCode=> fCode.code);
      
      const randomCountries = [];
      const randomCountriesCode = [];
  
      for(i = 0; i < 10; i++){
        const random = Math.floor(Math.random() * countryNames.length); 
        randomCountries.push(countryNames[random]);
        randomCountriesCode.push(countryCode[random]);
      }
  
  
      randomCountries.sort().reverse();
      randomCountriesCode.sort().reverse();
  
      console.log(randomCountries);
  
      //Resetting the ordered list so that I can generate a new list every time 
      $(orderedList).empty();
    
  
      for(i=randomCountries.length-1; i>=0; i--){
        const list = document.createElement('li');
      
        $("ol").prepend(list);
  
        let cBox = document.createElement("INPUT");
        cBox.type = 'checkbox';
        cBox.name = 'myCheckbox';
        cBox.value = randomCountriesCode[i];
        
        list.prepend(cBox);
     
        label = document.createElement('label');
        list.append(label);
        
        label.prepend(randomCountries[i]);
    
      }
        
    })
      .catch((err) => console.log(err));
  });