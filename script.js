/* =========================================================
   AURA — script.js
   Catalogue, panier, favoris, filtres, recherche, tri,
   fiche produit, commande WhatsApp, formulaire de contact.
   ========================================================= */

(function(){
  "use strict";

  /* ---------------------------------------------------------
     1. DONNÉES PRODUITS
  --------------------------------------------------------- */
  const CATEGORIES = [
    { id:"robes",       name:"Robes",       img:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&q=80&auto=format&fit=crop" },
    { id:"ensembles",   name:"Ensembles",   img:"https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=300&q=80&auto=format&fit=crop" },
    { id:"chemises",    name:"Chemises",    img:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80&auto=format&fit=crop" },
    { id:"pantalons",   name:"Pantalons",   img:"https://images.unsplash.com/photo-1584865288642-42078afe6942?w=300&q=80&auto=format&fit=crop" },
    { id:"jupes",       name:"Jupes",       img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&q=80&auto=format&fit=crop" },
    { id:"blazers",     name:"Blazers",     img:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&q=80&auto=format&fit=crop" },
    { id:"sacs",        name:"Sacs",        img:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&q=80&auto=format&fit=crop" },
    { id:"chaussures",  name:"Chaussures",  img:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&q=80&auto=format&fit=crop" },
    { id:"accessoires", name:"Accessoires", img:"https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&q=80&auto=format&fit=crop" }
  ];

  const PRODUCTS = [
    { id:1,  name:"Robe longue satinée",      cat:"robes",       price:45000, oldPrice:null,  img:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=700&q=80&auto=format&fit=crop", badge:"Nouveau", rating:5, reviews:12, isNew:true,
      desc:"Une robe longue en satin fluide, coupe cache-cœur et fentes discrètes. Idéale pour les soirées élégantes comme pour un dîner en ville.",
      sizes:["XS","S","M","L"], colors:["#d8c7a8","#1c1712","#7c3b3b"] },
    { id:2,  name:"Ensemble tailleur bordeaux", cat:"ensembles",   price:55000, oldPrice:null,  img:"https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=700&q=80&auto=format&fit=crop", badge:"", rating:5, reviews:8, isNew:false,
      desc:"Ensemble deux pièces veste cintrée et pantalon large, taillé dans une matière structurée. Un look bureau qui ne passe pas inaperçu.",
      sizes:["S","M","L","XL"], colors:["#7c3b3b","#1c1712","#3d2c22"] },
    { id:3,  name:"Chemise oversize ivoire",   cat:"chemises",    price:25000, oldPrice:null,  img:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=700&q=80&auto=format&fit=crop", badge:"", rating:4, reviews:15, isNew:false,
      desc:"Chemise ample en popeline de coton, col classique et manches à revers. Se porte ouverte sur un débardeur ou nouée à la taille.",
      sizes:["XS","S","M","L","XL"], colors:["#faf7f2","#1c1712"] },
    { id:4,  name:"Pantalon palazzo noir",     cat:"pantalons",   price:28000, oldPrice:null,  img:"https://images.unsplash.com/photo-1584865288642-42078afe6942?w=700&q=80&auto=format&fit=crop", badge:"", rating:5, reviews:10, isNew:false,
      desc:"Pantalon large taille haute à pinces, tombé fluide et confortable. Un basique indémodable à associer à un blazer ou un top ajusté.",
      sizes:["XS","S","M","L"], colors:["#1c1712","#3d2c22","#c9a98c"] },
    { id:5,  name:"Blazer classique",          cat:"blazers",     price:40000, oldPrice:null,  img:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=700&q=80&auto=format&fit=crop", badge:"", rating:5, reviews:7, isNew:false,
      desc:"Blazer structuré à simple boutonnage, épaules marquées et doublure satinée. La pièce signature d'un vestiaire professionnel élégant.",
      sizes:["S","M","L","XL"], colors:["#1c1712","#3d2c22"] },
    { id:6,  name:"Sac à main élégant",        cat:"sacs",        price:35000, oldPrice:null,  img:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700&q=80&auto=format&fit=crop", badge:"", rating:5, reviews:9, isNew:false,
      desc:"Sac à main en cuir végétal, fermoir doré et bandoulière amovible. Compartiment intérieur zippé et poche téléphone dédiée.",
      sizes:["Unique"], colors:["#1c1712","#3d2c22","#c9a98c"] },
    { id:7,  name:"Escarpins cuir nude",       cat:"chaussures",  price:32000, oldPrice:null,  img:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=700&q=80&auto=format&fit=crop", badge:"Promo", rating:4, reviews:14, isNew:false,
      desc:"Escarpins talon fin 8cm en cuir souple, bout pointu et semelle confort. Le compagnon parfait de toutes vos tenues du soir.",
      sizes:["36","37","38","39","40"], colors:["#c9a98c","#1c1712"] },
    { id:8,  name:"Lunettes de soleil dorées", cat:"accessoires", price:15000, oldPrice:18000, img:"https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=700&q=80&auto=format&fit=crop", badge:"Promo", rating:4, reviews:6, isNew:false,
      desc:"Lunettes de soleil monture dorée fine et verres dégradés. Protection UV400, écrin de rangement inclus.",
      sizes:["Unique"], colors:["#d8c7a8","#1c1712"] },
    { id:9,  name:"Robe cocktail noire",       cat:"robes",       price:48000, oldPrice:null,  img:"https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=700&q=80&auto=format&fit=crop", badge:"Nouveau", rating:5, reviews:11, isNew:true,
      desc:"Robe courte ajustée en crêpe stretch, découpe asymétrique à l'épaule. Une silhouette sculptée pour vos soirées.",
      sizes:["XS","S","M","L"], colors:["#1c1712","#7c3b3b"] },
    { id:10, name:"Chemisier en soie beige",   cat:"chemises",    price:27000, oldPrice:null,  img:"https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=700&q=80&auto=format&fit=crop", badge:"", rating:4, reviews:5, isNew:false,
      desc:"Chemisier fluide en soie mélangée, col lavallière amovible. Une pièce raffinée pour un bureau chic ou une tenue de soirée décontractée.",
      sizes:["XS","S","M","L"], colors:["#d8c7a8","#faf7f2"] },
    { id:11, name:"Trench beige intemporel",   cat:"blazers",     price:60000, oldPrice:null,  img:"https://images.unsplash.com/photo-1520975954732-35dd22299614?w=700&q=80&auto=format&fit=crop", badge:"Nouveau", rating:5, reviews:9, isNew:true,
      desc:"Trench-coat en gabardine imperméabilisée, ceinture à nouer et double boutonnage. Le manteau de saison qui traverse les années.",
      sizes:["S","M","L","XL"], colors:["#d8c7a8","#3d2c22"] },
    { id:12, name:"Sac bandoulière champagne", cat:"sacs",        price:30000, oldPrice:null,  img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=700&q=80&auto=format&fit=crop", badge:"", rating:4, reviews:6, isNew:false,
      desc:"Petit sac bandoulière en cuir texturé, idéal pour la journée. Chaîne dorée ajustable et fermeture aimantée.",
      sizes:["Unique"], colors:["#d8c7a8","#1c1712"] },
    { id:13, name:"Bottines cuir noires",      cat:"chaussures",  price:38000, oldPrice:null,  img:"https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=700&q=80&auto=format&fit=crop", badge:"", rating:5, reviews:13, isNew:false,
      desc:"Bottines en cuir souple, talon carré 5cm et fermeture zippée. Confortables et élégantes du matin jusqu'au soir.",
      sizes:["36","37","38","39","40"], colors:["#1c1712","#3d2c22"] },
    { id:14, name:"Jupe midi plissée",         cat:"jupes",       price:24000, oldPrice:null,  img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=700&q=80&auto=format&fit=crop", badge:"", rating:4, reviews:8, isNew:false,
      desc:"Jupe midi plissée taille haute, tombé aérien et doublure satinée. Se porte aussi bien avec des baskets qu'avec des talons.",
      sizes:["XS","S","M","L"], colors:["#3d2c22","#7c3b3b","#1c1712"] },
    { id:15, name:"Pantalon tailleur beige",   cat:"pantalons",   price:26000, oldPrice:null,  img:"https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=700&q=80&auto=format&fit=crop", badge:"", rating:4, reviews:4, isNew:true,
      desc:"Pantalon droit taille haute à pinces, matière légèrement stretch pour un confort optimal toute la journée.",
      sizes:["XS","S","M","L","XL"], colors:["#d8c7a8","#1c1712"] },
    { id:16, name:"Ensemble jupe &amp; top soie", cat:"ensembles", price:52000, oldPrice:58000, img:"https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=700&q=80&auto=format&fit=crop", badge:"Promo", rating:5, reviews:7, isNew:false,
      desc:"Ensemble coordonné jupe midi et top en soie, imprimé exclusif AURA. Deux pièces à porter ensemble ou séparément.",
      sizes:["XS","S","M","L"], colors:["#d8c7a8","#7c3b3b"] }
  ];

  const WHATSAPP_NUMBER = "221771234567";

  /* ---------------------------------------------------------
     2. ÉTAT & STOCKAGE LOCAL
  --------------------------------------------------------- */
  const Store = {
    getCart(){ return JSON.parse(localStorage.getItem("aura_cart") || "[]"); },
    setCart(cart){ localStorage.setItem("aura_cart", JSON.stringify(cart)); },
    getFavs(){ return JSON.parse(localStorage.getItem("aura_favs") || "[]"); },
    setFavs(favs){ localStorage.setItem("aura_favs", JSON.stringify(favs)); }
  };

  let cart = Store.getCart();
  let favorites = Store.getFavs();

  const filterState = { categories: new Set(), price: "all", search: "", sort: "featured" };
  let currentModalProduct = null;
  let modalSelection = { size:null, color:null, qty:1 };

  /* ---------------------------------------------------------
     3. UTILITAIRES
  --------------------------------------------------------- */
  function formatPrice(n){
    return n.toLocaleString("fr-FR").replace(/ |,/g," ") + " FCFA";
  }
  function starString(rating){
    return "★★★★★".slice(0,rating) + "☆☆☆☆☆".slice(0, 5-rating);
  }
  function findProduct(id){ return PRODUCTS.find(p => p.id === id); }
  function catName(id){ const c = CATEGORIES.find(c => c.id === id); return c ? c.name : id; }

  let toastTimer;
  function showToast(msg){
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=> toast.classList.remove("is-visible"), 2200);
  }

  /* ---------------------------------------------------------
     4. RENDU : CATÉGORIES
  --------------------------------------------------------- */
  function renderCategories(){
    const grid = document.getElementById("categoriesGrid");
    grid.innerHTML = CATEGORIES.map(c => `
      <div class="cat-card" data-cat="${c.id}">
        <div class="cat-photo" style="background-image:url('${c.img}')"></div>
        <div class="cat-name">${c.name}</div>
      </div>
    `).join("");
    grid.querySelectorAll(".cat-card").forEach(el=>{
      el.addEventListener("click", ()=>{
        filterState.categories = new Set([el.dataset.cat]);
        syncCategoryCheckboxes();
        renderShopGrid();
        document.getElementById("boutique").scrollIntoView({behavior:"smooth"});
      });
    });
  }

  function renderCategoryFilters(){
    const wrap = document.getElementById("categoryFilters");
    wrap.innerHTML = CATEGORIES.map(c => `
      <label class="filter-option">
        <input type="checkbox" value="${c.id}" class="cat-checkbox">
        <span>${c.name}</span>
      </label>
    `).join("");
    wrap.querySelectorAll(".cat-checkbox").forEach(cb=>{
      cb.addEventListener("change", ()=>{
        if(cb.checked) filterState.categories.add(cb.value);
        else filterState.categories.delete(cb.value);
        renderShopGrid();
      });
    });
  }
  function syncCategoryCheckboxes(){
    document.querySelectorAll(".cat-checkbox").forEach(cb=>{
      cb.checked = filterState.categories.has(cb.value);
    });
  }

  /* ---------------------------------------------------------
     5. CARTE PRODUIT (template commun)
  --------------------------------------------------------- */
  function productCardHTML(p){
    const isFav = favorites.includes(p.id);
    return `
    <div class="product-card" data-id="${p.id}">
      <div class="product-media" data-action="open-modal">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        ${p.badge ? `<span class="product-badge ${p.badge==='Promo'?'promo':''}">${p.badge}</span>` : ""}
        <button class="fav-toggle ${isFav?'is-active':''}" data-action="toggle-fav" aria-label="Ajouter aux favoris">
          <svg viewBox="0 0 24 24" fill="${isFav?'currentColor':'none'}"><path d="M12 21s-7.5-4.6-10-9.1C0.3 8.4 2 4.8 5.6 4.2c2-.3 3.9.6 5 2.2 1.1-1.6 3-2.5 5-2.2 3.6.6 5.3 4.2 3.6 7.7C19.5 16.4 12 21 12 21z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
        </button>
        <button class="quick-add" data-action="add-cart">Ajouter au panier</button>
      </div>
      <div class="product-info">
        <span class="product-cat">${catName(p.cat)}</span>
        <span class="product-name" data-action="open-modal">${p.name}</span>
        <span class="product-price">${p.oldPrice ? `<span class="old">${formatPrice(p.oldPrice)}</span>`:""}${formatPrice(p.price)}</span>
        <span class="product-rating"><span class="stars">${starString(p.rating)}</span> (${p.reviews})</span>
      </div>
    </div>`;
  }

  function bindProductCardEvents(container){
    container.querySelectorAll(".product-card").forEach(card=>{
      const id = Number(card.dataset.id);
      card.querySelectorAll('[data-action="open-modal"]').forEach(el=>{
        el.addEventListener("click", ()=> openProductModal(id));
      });
      card.querySelector('[data-action="toggle-fav"]').addEventListener("click", (e)=>{
        e.stopPropagation();
        toggleFavorite(id);
      });
      card.querySelector('[data-action="add-cart"]').addEventListener("click", (e)=>{
        e.stopPropagation();
        addToCart(id, null, null, 1);
      });
    });
  }

  /* ---------------------------------------------------------
     6. RENDU : COUPS DE CŒUR / NOUVELLE COLLECTION
  --------------------------------------------------------- */
  function renderFavoritesShowcase(){
    const grid = document.getElementById("favoritesGrid");
    const featured = PRODUCTS.slice(0,6);
    grid.innerHTML = featured.map(productCardHTML).join("");
    bindProductCardEvents(grid);
  }

  function renderNewGrid(){
    const grid = document.getElementById("newGrid");
    const items = PRODUCTS.filter(p=>p.isNew);
    grid.innerHTML = items.map(productCardHTML).join("");
    bindProductCardEvents(grid);
  }

  /* ---------------------------------------------------------
     7. RENDU : BOUTIQUE (filtres, recherche, tri)
  --------------------------------------------------------- */
  function getFilteredProducts(){
    let list = PRODUCTS.slice();

    if(filterState.categories.size > 0){
      list = list.filter(p => filterState.categories.has(p.cat));
    }
    if(filterState.price !== "all"){
      const [min,max] = filterState.price.split("-").map(Number);
      list = list.filter(p => p.price >= min && p.price <= max);
    }
    if(filterState.search.trim() !== ""){
      const q = filterState.search.trim().toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || catName(p.cat).toLowerCase().includes(q));
    }
    switch(filterState.sort){
      case "price-asc": list.sort((a,b)=>a.price-b.price); break;
      case "price-desc": list.sort((a,b)=>b.price-a.price); break;
      case "new": list = list.filter(p=>p.isNew).concat(list.filter(p=>!p.isNew)); break;
      case "rating": list.sort((a,b)=>b.rating-a.rating); break;
      default: break;
    }
    return list;
  }

  function renderActiveChips(){
    const wrap = document.getElementById("activeChips");
    const chips = [];
    filterState.categories.forEach(c=>{
      chips.push({label: catName(c), remove: ()=>{ filterState.categories.delete(c); syncCategoryCheckboxes(); renderShopGrid(); }});
    });
    if(filterState.price !== "all"){
      const labels = {"0-20000":"Moins de 20 000 FCFA","20000-40000":"20 000 - 40 000 FCFA","40000-999999":"Plus de 40 000 FCFA"};
      chips.push({label: labels[filterState.price], remove: ()=>{
        filterState.price = "all";
        document.querySelector('input[name="priceFilter"][value="all"]').checked = true;
        renderShopGrid();
      }});
    }
    if(filterState.search.trim() !== ""){
      chips.push({label: `"${filterState.search}"`, remove: ()=>{
        filterState.search = "";
        document.getElementById("searchInput").value = "";
        document.getElementById("searchInputMobile").value = "";
        renderShopGrid();
      }});
    }
    wrap.innerHTML = chips.map((c,i)=>`<span class="chip" data-i="${i}">${c.label} <button aria-label="Retirer">&times;</button></span>`).join("");
    wrap.querySelectorAll(".chip").forEach((el,i)=>{
      el.querySelector("button").addEventListener("click", ()=> chips[i].remove());
    });
  }

  function renderShopGrid(){
    const grid = document.getElementById("shopGrid");
    const list = getFilteredProducts();
    document.getElementById("resultsCount").textContent = list.length;
    document.getElementById("emptyState").hidden = list.length !== 0;
    grid.innerHTML = list.map(productCardHTML).join("");
    bindProductCardEvents(grid);
    renderActiveChips();
  }

  /* ---------------------------------------------------------
     8. PANIER
  --------------------------------------------------------- */
  function addToCart(productId, size, color, qty){
    const product = findProduct(productId);
    if(!product) return;
    const useSize = size || product.sizes[0];
    const useColor = color || product.colors[0];
    const existing = cart.find(i => i.id === productId && i.size === useSize && i.color === useColor);
    if(existing){ existing.qty += qty; }
    else{ cart.push({ id: productId, size: useSize, color: useColor, qty }); }
    Store.setCart(cart);
    updateCounts();
    renderCartDrawer();
    showToast(`✓ ${product.name} ajouté au panier`);
  }

  function updateCartItemQty(index, delta){
    cart[index].qty += delta;
    if(cart[index].qty <= 0){ cart.splice(index,1); }
    Store.setCart(cart);
    updateCounts();
    renderCartDrawer();
  }

  function removeCartItem(index){
    cart.splice(index,1);
    Store.setCart(cart);
    updateCounts();
    renderCartDrawer();
  }

  function cartTotal(){
    return cart.reduce((sum,i)=>{
      const p = findProduct(i.id);
      return sum + (p ? p.price * i.qty : 0);
    }, 0);
  }

  function renderCartDrawer(){
    const body = document.getElementById("cartItems");
    if(cart.length === 0){
      body.innerHTML = `<p class="drawer-empty">Votre panier est vide.<br>Découvrez notre collection et ajoutez vos coups de cœur.</p>`;
    } else {
      body.innerHTML = cart.map((item,index)=>{
        const p = findProduct(item.id);
        if(!p) return "";
        return `
        <div class="cart-item">
          <img src="${p.img}" alt="${p.name}">
          <div class="cart-item-info">
            <span class="cart-item-name">${p.name}</span>
            <span class="cart-item-meta">Taille : ${item.size} · Couleur : <span class="color-dot" style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${item.color};vertical-align:middle;"></span></span>
            <div class="cart-item-bottom">
              <div class="qty-control">
                <button data-action="dec" data-index="${index}">−</button>
                <span>${item.qty}</span>
                <button data-action="inc" data-index="${index}">+</button>
              </div>
              <span class="item-price">${formatPrice(p.price * item.qty)}</span>
            </div>
            <button class="remove-item" data-action="remove" data-index="${index}">Retirer</button>
          </div>
        </div>`;
      }).join("");
    }
    document.getElementById("cartSubtotal").textContent = formatPrice(cartTotal());

    body.querySelectorAll('[data-action="inc"]').forEach(b=> b.addEventListener("click", ()=> updateCartItemQty(Number(b.dataset.index), 1)));
    body.querySelectorAll('[data-action="dec"]').forEach(b=> b.addEventListener("click", ()=> updateCartItemQty(Number(b.dataset.index), -1)));
    body.querySelectorAll('[data-action="remove"]').forEach(b=> b.addEventListener("click", ()=> removeCartItem(Number(b.dataset.index))));
  }

  function buildWhatsappMessage(){
    if(cart.length === 0) return "Bonjour AURA, je souhaite passer une commande.";
    let msg = "Bonjour AURA 👋, je souhaite commander :%0A%0A";
    cart.forEach(item=>{
      const p = findProduct(item.id);
      if(!p) return;
      msg += `• ${p.name} — Taille ${item.size} — Qté ${item.qty} — ${formatPrice(p.price*item.qty)}%0A`;
    });
    msg += `%0ATotal : ${formatPrice(cartTotal())}%0A%0AMerci de me confirmer la disponibilité et les modalités de livraison.`;
    return msg;
  }

  /* ---------------------------------------------------------
     9. FAVORIS
  --------------------------------------------------------- */
  function toggleFavorite(productId){
    const idx = favorites.indexOf(productId);
    const product = findProduct(productId);
    if(idx > -1){
      favorites.splice(idx,1);
      showToast(`Retiré des favoris`);
    } else {
      favorites.push(productId);
      showToast(`✓ ${product.name} ajouté aux favoris`);
    }
    Store.setFavs(favorites);
    updateCounts();
    renderFavDrawer();
    refreshAllFavIcons();
  }

  function refreshAllFavIcons(){
    document.querySelectorAll(".product-card").forEach(card=>{
      const id = Number(card.dataset.id);
      const btn = card.querySelector(".fav-toggle");
      if(!btn) return;
      const isFav = favorites.includes(id);
      btn.classList.toggle("is-active", isFav);
      btn.querySelector("svg").setAttribute("fill", isFav ? "currentColor" : "none");
    });
    if(currentModalProduct){
      const btn = document.querySelector(".modal-fav-toggle");
      if(btn){
        const isFav = favorites.includes(currentModalProduct.id);
        btn.classList.toggle("is-active", isFav);
      }
    }
  }

  function renderFavDrawer(){
    const body = document.getElementById("favItems");
    if(favorites.length === 0){
      body.innerHTML = `<p class="drawer-empty">Aucun favori pour le moment.<br>Cliquez sur le cœur d'un produit pour l'ajouter ici.</p>`;
      return;
    }
    body.innerHTML = favorites.map(id=>{
      const p = findProduct(id);
      if(!p) return "";
      return `
      <div class="fav-item">
        <img src="${p.img}" alt="${p.name}">
        <div class="fav-item-info">
          <span class="fav-item-name">${p.name}</span>
          <span class="cart-item-meta">${formatPrice(p.price)}</span>
          <div class="fav-actions">
            <button data-action="add" data-id="${p.id}">Ajouter au panier</button>
            <button data-action="remove" data-id="${p.id}">Retirer</button>
          </div>
        </div>
      </div>`;
    }).join("");
    body.querySelectorAll('[data-action="add"]').forEach(b=> b.addEventListener("click", ()=> addToCart(Number(b.dataset.id), null, null, 1)));
    body.querySelectorAll('[data-action="remove"]').forEach(b=> b.addEventListener("click", ()=> toggleFavorite(Number(b.dataset.id))));
  }

  /* ---------------------------------------------------------
     10. COMPTEURS
  --------------------------------------------------------- */
  function updateCounts(){
    document.getElementById("cartCount").textContent = cart.reduce((s,i)=>s+i.qty,0);
    document.getElementById("favCount").textContent = favorites.length;
  }

  /* ---------------------------------------------------------
     11. FICHE PRODUIT (MODAL)
  --------------------------------------------------------- */
  function openProductModal(productId){
    const p = findProduct(productId);
    if(!p) return;
    currentModalProduct = p;
    modalSelection = { size: p.sizes[0], color: p.colors[0], qty: 1 };

    const isFav = favorites.includes(p.id);
    document.getElementById("modalBody").innerHTML = `
      <div class="modal-media"><img src="${p.img}" alt="${p.name}"></div>
      <div class="modal-info">
        <span class="modal-cat">${catName(p.cat)}</span>
        <h2>${p.name}</h2>
        <div class="modal-rating"><span class="stars">${starString(p.rating)}</span> ${p.rating}.0 (${p.reviews} avis)</div>
        <div class="modal-price">${p.oldPrice ? `<span class="old" style="color:#6b5f54;text-decoration:line-through;font-weight:500;font-size:1rem;margin-right:8px;">${formatPrice(p.oldPrice)}</span>`:""}${formatPrice(p.price)}</div>
        <p class="modal-desc">${p.desc}</p>

        <div class="option-block">
          <h5>Taille</h5>
          <div class="option-swatches" id="sizeSwatches">
            ${p.sizes.map(s=>`<button class="size-swatch ${s===modalSelection.size?'is-selected':''}" data-size="${s}">${s}</button>`).join("")}
          </div>
        </div>

        <div class="option-block">
          <h5>Couleur</h5>
          <div class="option-swatches" id="colorSwatches">
            ${p.colors.map(c=>`<button class="color-swatch ${c===modalSelection.color?'is-selected':''}" data-color="${c}" style="background:${c}" aria-label="Couleur"></button>`).join("")}
          </div>
        </div>

        <div class="modal-actions">
          <div class="modal-qty">
            <button id="modalQtyDec">−</button>
            <span id="modalQtyVal">1</span>
            <button id="modalQtyInc">+</button>
          </div>
          <button class="btn btn-dark" id="modalAddCart">Ajouter au panier</button>
          <button class="icon-btn fav-toggle modal-fav-toggle ${isFav?'is-active':''}" id="modalFavBtn" aria-label="Favoris" style="position:static;">
            <svg viewBox="0 0 24 24" fill="${isFav?'currentColor':'none'}"><path d="M12 21s-7.5-4.6-10-9.1C0.3 8.4 2 4.8 5.6 4.2c2-.3 3.9.6 5 2.2 1.1-1.6 3-2.5 5-2.2 3.6.6 5.3 4.2 3.6 7.7C19.5 16.4 12 21 12 21z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
          </button>
        </div>
      </div>
    `;

    document.querySelectorAll("#sizeSwatches .size-swatch").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        modalSelection.size = btn.dataset.size;
        document.querySelectorAll("#sizeSwatches .size-swatch").forEach(b=>b.classList.remove("is-selected"));
        btn.classList.add("is-selected");
      });
    });
    document.querySelectorAll("#colorSwatches .color-swatch").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        modalSelection.color = btn.dataset.color;
        document.querySelectorAll("#colorSwatches .color-swatch").forEach(b=>b.classList.remove("is-selected"));
        btn.classList.add("is-selected");
      });
    });
    document.getElementById("modalQtyInc").addEventListener("click", ()=>{
      modalSelection.qty++;
      document.getElementById("modalQtyVal").textContent = modalSelection.qty;
    });
    document.getElementById("modalQtyDec").addEventListener("click", ()=>{
      if(modalSelection.qty > 1) modalSelection.qty--;
      document.getElementById("modalQtyVal").textContent = modalSelection.qty;
    });
    document.getElementById("modalAddCart").addEventListener("click", ()=>{
      addToCart(p.id, modalSelection.size, modalSelection.color, modalSelection.qty);
    });
    document.getElementById("modalFavBtn").addEventListener("click", ()=> toggleFavorite(p.id));

    document.getElementById("modalOverlay").classList.add("is-open");
    document.getElementById("productModal").classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeProductModal(){
    document.getElementById("modalOverlay").classList.remove("is-open");
    document.getElementById("productModal").classList.remove("is-open");
    document.body.style.overflow = "";
    currentModalProduct = null;
  }

  /* ---------------------------------------------------------
     12. DRAWERS (panier / favoris) OUVERTURE-FERMETURE
  --------------------------------------------------------- */
  function openDrawer(drawer){
    document.getElementById("drawerOverlay").classList.add("is-open");
    drawer.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeDrawers(){
    document.getElementById("drawerOverlay").classList.remove("is-open");
    document.getElementById("cartDrawer").classList.remove("is-open");
    document.getElementById("favDrawer").classList.remove("is-open");
    document.body.style.overflow = "";
  }

  /* ---------------------------------------------------------
     13. HERO SLIDER
  --------------------------------------------------------- */
  function initHeroSlider(){
    const slides = document.querySelectorAll(".hero-slide");
    const dotsWrap = document.getElementById("heroDots");
    const indexEl = document.getElementById("heroIndex");
    let current = 0;
    let timer;

    dotsWrap.innerHTML = slides.length ? Array.from(slides).map((_,i)=>`<span data-i="${i}" class="${i===0?'is-active':''}"></span>`).join("") : "";
    const dots = dotsWrap.querySelectorAll("span");

    function goTo(i){
      slides[current].classList.remove("is-active");
      dots[current].classList.remove("is-active");
      current = (i + slides.length) % slides.length;
      slides[current].classList.add("is-active");
      dots[current].classList.add("is-active");
      indexEl.textContent = current + 1;
    }
    function next(){ goTo(current+1); }
    function prev(){ goTo(current-1); }
    function restartTimer(){ clearInterval(timer); timer = setInterval(next, 6000); }

    document.getElementById("heroNext").addEventListener("click", ()=>{ next(); restartTimer(); });
    document.getElementById("heroPrev").addEventListener("click", ()=>{ prev(); restartTimer(); });
    dots.forEach(d=> d.addEventListener("click", ()=>{ goTo(Number(d.dataset.i)); restartTimer(); }));

    restartTimer();
  }

  /* ---------------------------------------------------------
     14. RECHERCHE / FILTRES / TRI - BINDINGS
  --------------------------------------------------------- */
  function initSearch(){
    const inputs = [document.getElementById("searchInput"), document.getElementById("searchInputMobile")];
    inputs.forEach(input=>{
      input.addEventListener("input", ()=>{
        filterState.search = input.value;
        inputs.forEach(i=>{ if(i !== input) i.value = input.value; });
        renderShopGrid();
        if(input.value.trim() !== ""){
          document.getElementById("boutique").scrollIntoView({behavior:"smooth"});
        }
      });
    });
  }

  function initFilters(){
    document.querySelectorAll('input[name="priceFilter"]').forEach(radio=>{
      radio.addEventListener("change", ()=>{
        filterState.price = radio.value;
        renderShopGrid();
      });
    });
    document.getElementById("sortSelect").addEventListener("change", (e)=>{
      filterState.sort = e.target.value;
      renderShopGrid();
    });
    document.getElementById("resetFilters").addEventListener("click", ()=>{
      filterState.categories.clear();
      filterState.price = "all";
      filterState.search = "";
      document.getElementById("searchInput").value = "";
      document.getElementById("searchInputMobile").value = "";
      document.querySelector('input[name="priceFilter"][value="all"]').checked = true;
      syncCategoryCheckboxes();
      renderShopGrid();
    });
  }

  /* ---------------------------------------------------------
     15. MENU MOBILE
  --------------------------------------------------------- */
  function initMobileMenu(){
    const overlay = document.getElementById("mobileOverlay");
    const nav = document.getElementById("mobileNav");
    function open(){ overlay.classList.add("is-open"); nav.classList.add("is-open"); document.body.style.overflow="hidden"; }
    function close(){ overlay.classList.remove("is-open"); nav.classList.remove("is-open"); document.body.style.overflow=""; }
    document.getElementById("burgerBtn").addEventListener("click", open);
    document.getElementById("mobileCloseBtn").addEventListener("click", close);
    overlay.addEventListener("click", close);
    nav.querySelectorAll(".mobile-nav-link").forEach(link=> link.addEventListener("click", close));
  }

  /* ---------------------------------------------------------
     16. LOOKBOOK BANNER MINI-SLIDER
  --------------------------------------------------------- */
  function initLookbookBanner(){
    const photos = [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=1200&q=80&auto=format&fit=crop"
    ];
    let i = 0;
    const mainPhoto = document.querySelector(".lb-photo-main");
    function apply(){ mainPhoto.style.backgroundImage = `url('${photos[i]}')`; }
    document.querySelector(".lb-next").addEventListener("click", ()=>{ i = (i+1)%photos.length; apply(); });
    document.querySelector(".lb-prev").addEventListener("click", ()=>{ i = (i-1+photos.length)%photos.length; apply(); });
  }

  /* ---------------------------------------------------------
     17. FORMULAIRES (contact / newsletter)
  --------------------------------------------------------- */
  function initForms(){
    document.getElementById("contactForm").addEventListener("submit", (e)=>{
      e.preventDefault();
      const name = document.getElementById("cName").value.trim();
      const subject = document.getElementById("cSubject").value.trim();
      const message = document.getElementById("cMessage").value.trim();
      document.getElementById("contactSuccess").hidden = false;
      e.target.reset();
      showToast("✓ Message envoyé avec succès");

      const waMsg = encodeURIComponent(`Bonjour AURA, je m'appelle ${name}.\nSujet : ${subject}\n${message}`);
      setTimeout(()=>{}, 0);
    });

    ["newsletterForm","newsletterForm2"].forEach(id=>{
      const form = document.getElementById(id);
      if(!form) return;
      form.addEventListener("submit", (e)=>{
        e.preventDefault();
        showToast("✓ Merci pour votre inscription ! Code AURA10 envoyé par e-mail.");
        e.target.reset();
      });
    });
  }

  /* ---------------------------------------------------------
     18. INITIALISATION GÉNÉRALE
  --------------------------------------------------------- */
  function init(){
    renderCategories();
    renderCategoryFilters();
    renderFavoritesShowcase();
    renderNewGrid();
    renderShopGrid();
    renderCartDrawer();
    renderFavDrawer();
    updateCounts();
    initHeroSlider();
    initLookbookBanner();
    initSearch();
    initFilters();
    initMobileMenu();
    initForms();

    document.getElementById("cartBtn").addEventListener("click", ()=> openDrawer(document.getElementById("cartDrawer")));
    document.getElementById("favBtn").addEventListener("click", ()=> openDrawer(document.getElementById("favDrawer")));
    document.getElementById("cartCloseBtn").addEventListener("click", closeDrawers);
    document.getElementById("favCloseBtn").addEventListener("click", closeDrawers);
    document.getElementById("drawerOverlay").addEventListener("click", closeDrawers);

    document.getElementById("modalCloseBtn").addEventListener("click", closeProductModal);
    document.getElementById("modalOverlay").addEventListener("click", closeProductModal);
    document.addEventListener("keydown", (e)=>{ if(e.key === "Escape"){ closeProductModal(); closeDrawers(); } });

    document.getElementById("clearCartBtn").addEventListener("click", ()=>{
      cart = [];
      Store.setCart(cart);
      updateCounts();
      renderCartDrawer();
      showToast("Panier vidé");
    });

    document.getElementById("checkoutWhatsapp").addEventListener("click", ()=>{
      if(cart.length === 0){ showToast("Votre panier est vide"); return; }
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsappMessage()}`;
      window.open(url, "_blank", "noopener");
    });

    document.getElementById("accountBtn").addEventListener("click", ()=>{
      showToast("Espace client bientôt disponible");
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
