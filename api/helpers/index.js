// capitalize first letter of each word
String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
  };
  
  // check array for duplicates
  function hasDuplicate(w){
    return new Set(w).size !== w.length 
  }