(function (global, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    global.SortedSet = factory();
  }
}(this, function() {
  "use strict";

  //helper function to remove duplicate values
  function deDupe(arr) {
    var items = {};
    arr.forEach(function(val) {
      if (!items[val]) {
        items[val] = true;
      }
    });
    return Object.keys(items).map(function(val) { return Number(val); });
  }

  // Internal private array which holds actual set elements
  var setArray;

  // Constructor for the SortedSet class
  function SortedSet(initial) {
    // Handle the case when initial array is provided
    if (arguments.length > 0) {
      // if array has elements of duplicate value, reduce down to one instance 
      setArray = deDupe(initial);
      // sort the elements in ascending order.
      setArray = setArray.sort(function(a, b) { 
        return a - b;
      });
    } else {
      setArray = [];
    }
  }

  /* Accessor; returns element at index
   */
  SortedSet.prototype.at = function(index) {
    return setArray[index];
  };

  /* Converts a set into an Array and returns the result
   */
  SortedSet.prototype.toArray = function() {
    return setArray.slice(0);
  };

  /* Converts a set into a String and returns the result
   */
  SortedSet.prototype.toString = function() {
    return setArray.toString();
  };

  /* Synchronously iterates elements in the set
   */
  SortedSet.prototype.forEach = function(callback, thisArg) {
    if (this === void 0 || this === null ||
        setArray === void 0 || setArray === null) {
      throw new TypeError();
    }

    var t = Object(setArray);
    var len = t.length >>> 0;
    if (typeof callback !== "function") {
      throw new TypeError();
    }

    var context = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in t) {
        callback.call(context, t[i], i, t);
      }
    }
  };

  /* Read-only property for getting number of elements in sorted set
   */
  Object.defineProperty(SortedSet.prototype, 'length', {
    get: function() {
      return setArray.length;
    }
  });

  /* Returns true if a given element exists in the set
   */
  SortedSet.prototype.contains = function(element) {
    return setArray.indexOf(element) > -1;
  };

  /* Gets elements between startIndex and endIndex. If endIndex is omitted, a
   * single element at startIndex is returned.
   */
  SortedSet.prototype.get = function(startIndex, endIndex) {
    return endIndex ? setArray.slice(startIndex, endIndex + 1) : setArray[startIndex];
  };

  /* Gets all items between specified value range. If exclusive is set, values
   * at lower bound and upper bound are not included.
   */
  SortedSet.prototype.getBetween = function(lbound, ubound, exclusive) {
    var startIndex;
    for (var i = 0; i < setArray.length; i++) {
      if (setArray[i] >= lbound) {
        startIndex = i;
        if (exclusive && setArray[i] === lbound) startIndex++;
        break;
      }
    }
    var endIndex;
    for (var i = setArray.length; i > 0; i--) {
      if (setArray[i] <= ubound) {
        endIndex = i;
        if (exclusive && setArray[i] === ubound) endIndex--;
        break;
      }
    }
    return setArray.slice(startIndex, endIndex + 1)
  };

  /* Adds new element to the set if not already in set
   */
  SortedSet.prototype.add = function(element) {
    if (setArray.indexOf(element) === -1) {
      var inserted;
      for (var i = 0; i < setArray.length; i++) {
        if (setArray[i] > element) {
          inserted = true;
          if (i === 0) setArray.unshift(element);
          else {
            setArray.splice(i, 0, element);
            break;
          }
          
        }
      }
      if (!inserted) setArray.push(element);
    }
    return setArray;
  };

  /* Removes element from set and returns the element
   */
  SortedSet.prototype.remove = function(element) {
    var item = setArray.splice(setArray.indexOf(element), 1);
    return item[0];
  };

  /* Removes element at index location and returns the element
   */
  SortedSet.prototype.removeAt = function(index) {
    var item = setArray[index];
    setArray = setArray.slice(0, index).concat( setArray.slice(index + 1, setArray.length) )
    return item;
  };

  /* Removes elements that are larger than lower bound and smaller than upper
   * bound and returns removed elements.
   */
  SortedSet.prototype.removeBetween = function(lbound, ubound, exclusive) {
    // TODO: Implement removeBetween method
  };

  /* Removes all elements from the set
   */
  SortedSet.prototype.clear = function() {
    setArray.splice(0, setArray.length);
    return setArray;
  };

  /* BONUS MARKS AWARDED IF IMPLEMENTED
   * Implement an asynchronous forEach function. (See above for synchrnous
   * implementation). This method ASYNCHRONOUSLY iterates through each elements
   * in the array and calls a callback function.
   */
  SortedSet.prototype.forEachAsync = function(callback, thisArg) {
    // TODO: Implement for bonus marks
  };

  return SortedSet;
}));
