const search = document.querySelector('.search')
const unorderedList = document.createElement('ul');
let results = [];

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
      const ul = document.createElement("ul");
      
      console.log(fromServer)

      this.results = [];
      var div = document.getElementById('myitemlist');
      while(div.firstChild){
         div.removeChild(div.firstChild);
      }
     
      for(var i = 0; i < fromServer.length; i++){
        if(search != "" && ( fromServer[i].category.toLowerCase().startsWith(search.toLowerCase()))) {
          this.results.push(fromServer[i]);
        }
      };
      
      document.getElementById('myitemlist').appendChild(ul);
      
      this.results.forEach(function (item) {
          let name = document.createElement('li');
          ul.appendChild(name);
          name.innerHTML += item.name + "<br />" + item.category + "<br />" + item.address_line_1 + "<br />" + item.city + "<br />" + item.zip;
      });
})
.catch((err) => console.log(err));
});