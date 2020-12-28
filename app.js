// -------------- Feed URL's -------------------
const artnewsUrl = `https://www.artnews.com/c/art-news/news/feed/`;//---------  Works
const artforumUrl = `https://www.artforum.com/rss.xml`; // ---------  Works
const hiFructUrl = `https://hifructose.com/feed/`; // ---------  Works

//------- URL to Proxy Server app I created on Heroku to prevent CORRS issues --------- 
const proxyUrl = `https://peaceful-mountain-44560.herokuapp.com/`;

// ----- ArtNews --------

  fetch(proxyUrl + artnewsUrl)
  .then(response => response.text()) //<----- response data as string text
  .then(str => new window.DOMParser().parseFromString(str, "text/xml")) //<--- converts response data to xml dom 
  .then(data => {
    let items = data.querySelectorAll("item");

    const favI = data.querySelector("url").textContent;
    const logo = document.querySelector('header .image-fav img');
     logo.setAttribute('src', favI);

    let html = ``;
      for (let i = 0; i < items.length; i++) {
        if(i >= 4) {
          break;
        }

        let strDate = items[i].querySelector("pubDate").textContent;//get date from xml parsed document
        let newDate = strDate.substring(0, strDate.length - 14);// take the above date and shorten it

          html += `
          <article class="feed-link">
          
            <h2 class="article-title">
              <a href="${items[i].querySelector("link").innerHTML}" target="_blank" rel="noopener" class="article-link">
                ${items[i].querySelector("title").textContent}
              </a>
            </h2>
            <p class="article-date">${newDate}</p>
            
            <p class="article-desc">${items[i].querySelectorAll("description")[0].childNodes[0].nodeValue}</p> 
            
          </article>
        `;
        
      };
      console.log(data);
      console.log(items);
    //-------- ForEach ---------------------------------
    
    // items.forEach(el => {
    //   var strDate = el.querySelector("pubDate").textContent;//get date from xml parsed document
    //   let newDate = strDate.substring(0, strDate.length - 14);// take the above date and shorten it
    //     html += `
    //     <article class="feed-link">
        
    //       <h2 class="article-title">
    //         <a href="${el.querySelector("link").innerHTML}" target="_blank" rel="noopener" class="article-link">
    //           ${el.querySelector("title").textContent}
    //         </a>
    //       </h2>
    //       <p class="article-date">${newDate}</p>
          
    //       <p class="article-desc">${el.querySelectorAll("description")[0].childNodes[0].nodeValue}</p> 
          
    //     </article>
    //   `;
    // });
    const main = document.querySelector("#content-an")
    main.insertAdjacentHTML("beforeend", html);
  });



// ---- Hi Fructose ---------------

  fetch(proxyUrl + hiFructUrl)
  .then(response => response.text()) //<----- response data as string text
  .then(str => new window.DOMParser().parseFromString(str, "text/xml")) //<--- converts response data to html dom 
  .then(data2 =>{
    
    const items = data2.querySelectorAll("item");

    // const favI2 = data2.querySelector("url").textContent;
    // const logo2 = document.querySelector('header #hfImg img');
    // logo2.setAttribute('src', favI2);

    let html = ``;

      for (let i = 0; i < items.length; i++) {
        if(i >= 4) {
          break;
        }
        
        let strDate = items[i].querySelector("pubDate").textContent;//get date from xml parsed document
        let newDate = strDate.substring(0, strDate.length - 14);// take the above date and shorten it

        //-- Variables to
        let parser = new DOMParser();
        let parseDec = items[i].querySelectorAll("description")[0].childNodes[0].nodeValue;
        let descript = parser.parseFromString(parseDec, "text/html");
        
        let itemTitle = items[i].querySelector("title").textContent;
        
        if (descript.contains(descript.querySelector('img'))) {
          image = descript.querySelector("img").getAttribute('src')
        }
        if (itemTitle.includes('Subscribe Today') == false) {
          html += `
          <article class="feed-link">
          <div class="feed-img"><img src="${image}" alt="" class="feeds_img"></div>
            <h2 class="article-title">
              <a href="${items[i].querySelector("link").innerHTML}" target="_blank" rel="noopener" class="article-link">
                ${items[i].querySelector("title").textContent}
              </a>
            </h2>
            <p class="article-date">${newDate}</p>
            <p class="article-desc short-desc">${descript.querySelector("body").textContent}</p>
            
            
          </article>
        `;
        }
      };

    //-------- ForEach ---------------------------------
    // items.forEach(el => {
    //   console.log(el);
    //   var strDate = el.querySelector("pubDate").textContent;//get date from xml parsed document
    //   let newDate = strDate.substring(0, strDate.length - 14);// take the above date and shorten it
    //   let parser = new DOMParser();
    //   let parseDec = el.querySelectorAll("description")[0].childNodes[0].nodeValue;
    //   console.log(parseDec);
    //   let descript = parser.parseFromString(parseDec, "text/html");
    //   console.log(descript);
    //   // descript.slice(0,120);
    //   let shrtDesc = descript.querySelector("body").textContent
    //   console.log(shrtDesc);
    //   // shrtDesc.slice(0,20);
    //   // console.log(shrtDesc);
    //   let itemTitle = el.querySelector("title").textContent;
    //   // console.log(parseDec);
    //   // console.log(descript);
    //   if (descript.contains(descript.querySelector('img'))) {
    //     image = descript.querySelector("img").getAttribute('src')
    //   }
    //   if (itemTitle.includes('Subscribe Today') == false) {

    //     html += `
    //     <article class="feed-link">
    //     <div class="feed-img"><img src="${image}" alt="" class="feeds_img"></div>
    //       <h2 class="article-title">
    //         <a href="${el.querySelector("link").textContent}" target="_blank" rel="noopener" class="article-link">
    //           ${itemTitle}
    //         </a>
    //       </h2>
    //       <p class="article-date">${newDate}</p>
    //       <p class="article-desc short-desc">${descript.querySelector("body").textContent}</p> 
    //     </article>
    //   `;
    //   }
    // });

    const main = document.querySelector("#content-hf")
    main.insertAdjacentHTML("beforeend", html);
    
  });


  // ----- Artforum --------

  fetch(proxyUrl + artforumUrl)
  .then(response => response.text()) //<----- response data as string text
  .then(str => new window.DOMParser().parseFromString(str, "text/xml")) //<--- converts response data to object html dom 
  .then(data =>{
    console.log(data);
    console.log(typeof data);

    const items = data.querySelectorAll("item");

    let html = ``;

      for (let i = 0; i < items.length; i++) {
        if(i >= 4) {
          break;
        }
        
        let strDate = items[i].querySelector("pubDate").textContent;//get date from xml parsed document
        let newDate = strDate.substring(0, strDate.length - 14);// take the above date and shorten it

          html += `
          <article class="feed-link">
          
            <h2 class="article-title">
              <a href="${items[i].querySelector("link").innerHTML}" target="_blank" rel="noopener" class="article-link">
                ${items[i].querySelector("title").textContent}
              </a>
            </h2>
            <p class="article-date">${newDate}</p>
            
            <p class="article-desc">${items[i].querySelectorAll("description")[0].childNodes[0].nodeValue}</p> 
            
          </article>
        `;
      };
    // items.forEach(el => {
    //   var strDate = el.querySelector("pubDate").textContent;//get date from xml parsed document
    //   let newDate = strDate.substring(0, strDate.length - 14);// take the above date and shorten it
    //     html += `
    //     <article class="feed-link">
        
    //       <h2 class="article-title">
    //         <a href="${el.querySelector("link").innerHTML}" target="_blank" rel="noopener" class="article-link">
    //           ${el.querySelector("title").textContent}
    //         </a>
    //       </h2>
    //       <p class="article-date">${newDate}</p>
          
    //       <p class="article-desc">${el.querySelectorAll("description")[0].childNodes[0].nodeValue}</p> 
          
    //     </article>
    //   `;
    // });
    const main = document.querySelector("#content-af")
    main.insertAdjacentHTML("beforeend", html);
  });