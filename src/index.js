// write your code here
/*
## Core Deliverables

As a user, I can:

- See all ramen images in the `div` with the id of `ramen-menu`. When the page
  loads, request the data from the server to get all the ramen objects. Then,
  display the image for each of the ramen using an `img` tag inside the
  `#ramen-menu` div.
- Click on an image from the `#ramen-menu` div and see all the info about that
  ramen displayed inside the `#ramen-detail` div and where it says
  `insert comment here` and `insert rating here`.
- Create a new ramen after submitting the `new-ramen` form. The new ramen should
  be added to the`#ramen-menu` div. The new ramen does not need to persist; in
  other words, if you refresh the page, it's okay that the new ramen is no
  longer on the page.

*/

//1.DOMContentLoaded -check script location
//2. add images to header 
//   => display header fn, fetch, convert to json, invoke fn to renderRamen forEach, 
//3. event listener for form to click header image to bring up the ramen in the menu div
//   => keep within renderRamen 
//add functionality to create new ramen form.  can access each value using form.inputName. value
// for advance: add fetch post request  
//document.addEventListener(Dom)

const form = document.getElementById("new-ramen")
const menu = document.getElementById("ramen-menu")
const editForm = document.getElementById("edit-ramen")

const displayHeader = () => {
    return fetch("http://localhost:3000/ramens")
    .then((resp) => resp.json())
    .then((data)=>{
        
        document.querySelector(".detail-image").src = data[0].image;
        document.querySelector(".name").textContent = data[0].name;
        document.querySelector(".restaurant").textContent = data[0].restaurant;
        document.getElementById("rating-display").textContent = data[0].rating;
        document.getElementById("comment-display").textContent = data[0].comment;
        data.forEach((ramen)=> 
        renderRamen(ramen));
    })
}

const renderRamen = (ramen) =>{
    console.log(ramen);
    const ramenImg = document.createElement("img");
   
    ramenImg.src = ramen.image;
    menu.appendChild(ramenImg)
    const deleteBtn = document.createElement("button");
    deleteBtn.id = "delete"
    deleteBtn.innerText = "X"
    menu.appendChild(deleteBtn)

    
    deleteBtn.addEventListener('click', (e)=>{
        fetch(`http://localhost:3000/ramens/${ramen.id}`,{
        method: 'DELETE',
        
    })
    .then(resp => resp.json())
    .then(()=>{ramenImg.remove(); deleteBtn.remove()})
    })


    ramenImg.addEventListener("click", (e)=>{
        document.querySelector(".detail-image").src = ramen.image;
        document.querySelector(".name").textContent = ramen.name;
        document.querySelector(".restaurant").textContent = ramen.restaurant;
        document.getElementById("rating-display").textContent = ramen.rating;
        document.getElementById("comment-display").textContent = ramen.comment;        
    })

    editForm.addEventListener("submit",(e)=>{
        e.preventDefault();
        ramen.rating = editForm.rating.value;
            ramen.comment = editForm["new-comment"].value;
        return fetch(`http://localhost:3000/ramens/${ramen.id}`,{
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
                'Accept': 'application/json',
                    },
            body: JSON.stringify({rating:ramen.rating, comment:ramen.comment}),
        })
        .then(resp => resp.json())
        .then(()=>{
            document.getElementById("rating-display").textContent = ramen.rating;
            document.getElementById("comment-display").textContent = ramen.comment;  
            editForm.reset(); })
        
    
    
      
    })
    

        
}



form.addEventListener("submit", (e)=>{
    e.preventDefault();
    console.log('clicked')
    const ramenObject=
    {
        "name": form.name.value,
        "restaurant": form.restaurant.value,
        "image": form.image.value,
        "rating": form.rating.value,
        "comment": form['new-comment'].value 
    }
    console.log(ramenObject);
    renderRamen(ramenObject);
    return fetch("http://localhost:3000/ramens",{
    method: 'POST',
    headers: {
        "Content-Type": 'application/json'
    },
    body: JSON.stringify(ramenObject)
    })
    .then((resp) => resp.json())
    .then(data => console.log(data))
    .then(()=>form.reset())
    

})



displayHeader();