 const worker = new Worker("/api/code/kobakazu0429/textlint-worker2/worker.js");
 worker.addEventListener("error", (event) => {
   console.error(event)
 });
 worker.addEventListener("message", (event) => {
   if (event.data.command === "lint:result") {
     console.log(event.data.result);
   }
 });

 const lint = () => {
   if(scrapbox.Layout !== "page") return;
   const text = scrapbox.Page.lines.map(line => line.text).join("\n");
   worker.postMessage({
     command: "lint",
     text: text,
     ext: ".md"
   });
 }

 const dlint = debounce(lint, 500, true);

 scrapbox.on("lines:changed", () => dlint);

 function debounce(fn, wait, callFirst) {
   var timeout = null;
   var debouncedFn = null;

   var clear = function () {
     if (timeout) {
       clearTimeout(timeout);

       debouncedFn = null;
       timeout = null;
     }
   };

   var flush = function () {
     var call = debouncedFn;
     clear();

     if (call) {
       call();
     }
   };

   var debounceWrapper = function () {
     if (!wait) {
       return fn.apply(this, arguments);
     }

     var context = this;
     var args = arguments;
     var callNow = callFirst && !timeout;
     clear();

     debouncedFn = function () {
       fn.apply(context, args);
     };

     timeout = setTimeout(function () {
       timeout = null;

       if (!callNow) {
         var call = debouncedFn;
         debouncedFn = null;

         return call();
       }
     }, wait);

     if (callNow) {
       return debouncedFn();
     }
   };

   debounceWrapper.cancel = clear;
   debounceWrapper.flush = flush;

   return debounceWrapper;
 }
