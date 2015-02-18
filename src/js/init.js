// initializing the application, sets up the hash listener
// sets up hash watching
(function(){

  function processHash() {
                //location is url, and this is standard js
    var hash = location.hash || '#';
        //this is what makes the router run
    if (!app.router.run(hash.slice(1))) {
      app.pageNotFound();
    }
  }

  window.addEventListener('hashchange', processHash);
  processHash();

})();
