  // ----- ArtNews --------
  function renderArtNews(artnews) {
    let items = artnews.querySelectorAll("item");
    const favI = artnews.querySelector("url").textContent;
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
      console.log(artnews);
      console.log(items);
      const main = document.querySelector("#content-an")
      main.insertAdjacentHTML("beforeend", html);
    }

  // ---- Hi Fructose ---------------
  function renderHiFruct(hiFruct) {
    const items = hiFruct.querySelectorAll("item");
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
      const main = document.querySelector("#content-hf")
      main.insertAdjacentHTML("beforeend", html);
  }

  // ----- Artforum --------
  function renderArtForum(artforum) {
    const items = artforum.querySelectorAll("item");

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
      const main = document.querySelector("#content-af")
      main.insertAdjacentHTML("beforeend", html);    
  }   

  function getData() {
    //------- URL to Proxy Server app I created on Heroku to prevent CORRS issues --------- 
    let proxyUrl = "https://peaceful-mountain-44560.herokuapp.com/";
    // -------------- Feed URL's -------------------
    let artnewsUrl  = fetch(`${proxyUrl}https://www.artnews.com/c/art-news/news/feed/`);
    let artforumUrl = fetch(`${proxyUrl}https://www.artforum.com/rss.xml`);
    let hiFructUrl = fetch(`${proxyUrl}https://hifructose.com/feed/`);
  
    Promise.all([artnewsUrl, hiFructUrl, artforumUrl])
      .then(values => Promise.all(values.map(response => response.text())))
      .then(values => Promise.all(values.map(str => new window.DOMParser().parseFromString(str, "text/xml"))))
      .then(data => {
        let artnewsData = data[0];
        let hiFructData = data[1];
        let artforumData= data[2];
        // renderHTML(artnewsData, artforumData, hiFructData);
        renderArtNews(artnewsData);
        renderHiFruct(hiFructData);
        renderArtForum(artforumData);
      });
  }
  getData();