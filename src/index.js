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
const menu = document.getElementById("ramen-menu");
const form = document.getElementById("new-ramen");

   const displayHeader = () =>{
            fetch('http://localhost:3000/ramens')
            .then(resp => resp.json())
            .then((data) => {
                data.forEach((ramen)=>{
                  return  renderRamen(ramen)}) // I need a function that puts the server data on the page
fetch
            })
        }
    const renderRamen = (ramen) => { // define that function here
        const ramenImg = document.createElement("img");
        ramenImg.src = ramen.image;
        ramenImg.alt = "picture of ramen";
        menu.appendChild(ramenImg);
        ramenImg.addEventListener('click', (e)=>{
        document.querySelector('img.detail-image').src = ramen.image;
        document.querySelector('h2.name').textContent = ramen.name;
        document.querySelector('h3.restaurant').textContent = ramen.restaurant;
        document.getElementById("rating-display").textContent = ramen.rating;
        document.getElementById("comment-display").textContent = ramen.comment;
        })     

    }

    form.addEventListener("submit",(e)=>{
        e.preventDefault();
       const newRamen={
            "name": form.querySelector("#new-name").value,
            "restaurant": form.querySelector("#new-restaurant").value,
            "image": form.querySelector("#new-image").value,
            "rating": form.querySelector("#new-rating").value,
            "comment": form.querySelector("#new-comment").value,
        }



        
       return renderRamen(newRamen)
    })




  

   displayHeader()