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
  
  const search = document.querySelector('.search')
  const unorderedList = document.createElement('ul');
  const results = [];

  search.addEventListener('input', async (e) => {
    e.preventDefault();
    const form = $(e.target).serializeArray();
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then((fromServer) => fromServer.json())
      .then((fromServer) => {
      
        const search = document.querySelector(".search").value;
        const inputBox = document.querySelector(".box");
        const ul = document.createElement("ul");
        const li = document.createElement("li");
        
        //console.log(fromServer);
        
        this.results = [];

        //Getting Corresponding Restaurant Name 
        for(var i = 0; i < fromServer.length; i++){
          if(( fromServer[i].category.toLowerCase() ) == (search.toLowerCase())) {
            results.push(fromServer[i].name)
          }
        };
        
        inputBox.prepend(results)
        console.log(results);

  })
  .catch((err) => console.log(err));
  });


