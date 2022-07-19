const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=2';
const reload = document.getElementById('reload');

const API_URL_FAVOURITES = 'https://api.thedogapi.com/v1/favourites';
const API_URL_FAVOURITES_DELETE = (id)=> `https://api.thedogapi.com/v1/favourites/${id}`;
const API_URL_UPLOAD = 'https://api.thedogapi.com/v1/images/upload';
// const favourites = document.getElementById('favourites');

const spanError = document.getElementById("dog-error");





//Promesas
//  fetch(API)
//      .then(res => res.json())
//      .then(data => {
//          const img = document.querySelector('img');
//          img.src = data[0].url;
//     });


//async await
async function loadRandomDogs(){
    const response = await fetch(API_URL_RANDOM)
    const data = await response.json();
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');

    if(response.status !==200){
        spanError.innerHTML = "Hubo un Error" + response.status;
    } else{
        img1.src = data[0].url;
        img2.src = data[1].url;
        btn1 = document.getElementById("btn1");
        btn2 = document.getElementById("btn2");
        btn1.onclick = () => saveFavoriteDogs(data[0].id);
        btn2.onclick = () => saveFavoriteDogs(data[1].id);
        console.log(data);

    }
    
    }

async function saveFavoriteDogs(id){
    const response = await fetch(API_URL_FAVOURITES, {
        method: 'POST',
        headers:
        {
            'Content-type':'application/json',
            'X-API-KEY': '9e07f474-02ee-4618-9b44-f13d0b83dc35',
        
        },
        body: JSON.stringify ({
            image_id: id
        }),

    });

    const data = await response.json();
    console.log("Save")
    console.log(response);

    if(response.status !==200){
        spanError.innerHTML = "Hubo un Error" + response.status + data.message;
    }else{
        console.log("perro guardado");
        loadFavoriteDogs();
    }
}



async function loadFavoriteDogs(){
    const response = await fetch(API_URL_FAVOURITES, {
        method: 'GET',
         headers: {
            'X-API-KEY': '9e07f474-02ee-4618-9b44-f13d0b83dc35',
        },
    });
    

    const data = await response.json();
    console.log(data);

    if(response.status !==200){
        spanError.innerHTML = "Hubo un Error" + response.status + data.message;
    }else{
        const section = document.getElementById('favoties-dogs');
        section.innerHTML = ""
        const h2 = document.createElement("h2");
        const h2Text = document.createTextNode("Perros Favoritos");
        h2.appendChild(h2Text);
        section.append(h2);

        data.forEach(dog => {
            
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const text = document.createTextNode('Quitar perro');
            
            img.src = dog.image.url;
            img.width = 250
            btn.appendChild(text);
            btn.onclick = ()=> deleteDog(dog.id);
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        }); 

        
            
    
    }
}

async function deleteDog(id){
    const response = await fetch(API_URL_FAVOURITES_DELETE(id), {
        method: 'DELETE',
         headers: {
            'X-API-KEY': '9e07f474-02ee-4618-9b44-f13d0b83dc35',
        },
        

    });

    const data = await response.json();
    console.log("Save")
    console.log(response);

    if(response.status !==200){
        spanError.innerHTML = "Hubo un Error" + response.status + data.message;
    }else{
        console.log("perro eliminado");
        loadFavoriteDogs();
    }

}


async function uploadDog(){
    const form = document.getElementById('uplad-form');
    const formData = new FormData(form);

    console.log(formData.get('file'));

    const response = await fetch(API_URL_UPLOAD,{
        method:'POST',
        headers: {
            'X-API-KEY': '9e07f474-02ee-4618-9b44-f13d0b83dc35',
        },
        body: formData,
    });

}


loadFavoriteDogs();
loadRandomDogs();
reload.addEventListener('click', loadRandomDogs);

