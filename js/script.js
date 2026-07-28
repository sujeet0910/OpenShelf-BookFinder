const searchInput =document.getElementById("search")
const searchBtn=document.getElementById("searchBtn");
const bookContainer=document.getElementById("bookContainer");
const bookModal=document.getElementById("bookModal");
const modalBody=document.getElementById("modalBody");
const closeModal=document.getElementById("closeModal");
const fictionBtn=document.getElementById("btn1");
const scienceBtn=document.getElementById("btn2");
const historyBtn=document.getElementById("btn3");
const loader=document.getElementById("loader");
closeModal.addEventListener("click",()=>{
    bookModal.style.display="none";
});

searchInput.addEventListener("keydown",function(event){
    if(event.key=="Enter"){
        getBooks(searchInput.value);
    }
})

searchBtn.addEventListener("click",()=>{
 const query=searchInput.value;
 getBooks(query);
})

fictionBtn.addEventListener("click", function(){
    searchInput.value = "Fiction";
    getBooks("Fiction");
});

scienceBtn.addEventListener("click", function(){
    searchInput.value = "Science";
    getBooks("Science");
});

historyBtn.addEventListener("click", function(){
    searchInput.value = "History";
    getBooks("History");

});

const API_KEY="AIzaSyBmFXMlkXrba9CxJzmWsDqxno2rh2JVywo";
async function getBooks(query) {
    const url=`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=18&key=${API_KEY}`;
    bookContainer.innerHTML="";
    loader.style.display="block";
    try{
    const response=await fetch(url);
    const data=await response.json();
   if (!data.items) {
    loader.style.display = "none";
    bookContainer.innerHTML = `
    <div class="no-results">
        <h2>No books found.</h2>
        <p>Try searching with another title or author</p>
        </div>
    `;
    return;
}
    bookContainer.innerHTML="";
    for(const book of data.items){

    const title=book.volumeInfo?.title||"No title";
    const author=book.volumeInfo.authors?.[0]||"Unknown Author";
    const image=book.volumeInfo.imageLinks?.thumbnail||"assets/images/nobg_img.png";
    const description=book.volumeInfo.description||"No description Available";
    const publisher=book.volumeInfo.publisher||"Unknown";
    const publishedDate=book.volumeInfo.publishedDate||"Unknown";
    const pageCount=book.volumeInfo.pageCount||"Unknown";

    const languageCode = book.volumeInfo.language || "Unknown";

const languageMap = {
    en: "English", hi: "Hindi", fr: "French", es: "Spanish", de: "German",it: "Italian",ja: "Japanese",ko: "Korean",zh: "Chinese",ru: "Russian", ar: "Arabic"};
const language = languageMap[languageCode] || languageCode;
    const category=book.volumeInfo.categories?.[0]||"Not Available";
    const previewLink=book.volumeInfo.previewLink||"#";
    const bookId=book.id;
    
    const card=document.createElement("div");
    card.className="book-card";
    card.innerHTML=`<img src="${image}"><h2>${title}</h2><p>${author}</p><button class="details-btn">View Details</button></div>`;
    bookContainer.appendChild(card);
    const detailBtn=card.querySelector(".details-btn");
    detailBtn.addEventListener("click",function(){
        bookModal.style.display="flex";
        modalBody.innerHTML=`<div class="modal-book">
            <div class="modal-left">
            <img src="${image}">
            </div> 
            <div class="modal-right">
        <h2>${title}</h2>
        <table class="book-info">
        <tr>
        <td><strong>Author:</strong> </td>
        <td>${author}</td>
        </tr>

        <tr>
         <td><strong>Publisher:</strong></td>
         <td>${publisher}</td>
         </tr>

          <tr>
          <td><strong>Published:</strong></td>
          <td>${publishedDate}</td>
            </tr>

          <tr>
           <td><strong>Pages:</strong></td>
           <td>${pageCount}</td>
            </tr>

           <tr>
            <td><strong>Language:</strong></td>
            <td>${language}</td>
            </tr>

           <tr>  <td><strong>Category:</strong></td>
             <td>${category}</td>
             
            </tr>
            </table>
            </div>
             <div class="description-box">
             <h3>Description</h3>
             <p>${description}</p>
             </div>
             <a href="${previewLink}" target="_blank" class="preview-btn"> Read Preview </a>
             </div>
             </div>
        `;
     })
   
    }
      loader.style.display="none";
}
catch(error){
    loader.style.display="none";
    alert("Something went wrong !");

}
}