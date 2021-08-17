/*Write a function deepEqual that takes two values and returns true only if they are the same value or are objects with the same properties, 
where the values of the properties are equal when compared to deepEqual.
To find out whether values should be compared directly (use the === operator for that) 
or have their properties compared, you can use the type of operator. 
If it produces an "object" for both values, you should do a deep comparison. 
But you have to take one silly exception into account: because of a historical accident, type of null also produces "object".
The Object. keys function will be useful when you need to go over the properties of objects to compare them.*/


  function deepEqual(obj1, obj2) {

    if(obj1 === obj2) // If it is the same object, there no need to compare.
    // items are identical so returns true
        return true;

    if((obj1 !== Object(obj1) )&& (obj2 !== Object(obj2))) // compare primitives
    //check if value is primitive
        return obj1 === obj2;

    if(Object.keys(obj1).length !== Object.keys(obj2).length)
        return false;

    // compare objects with same number of keys
    for(let key in obj1)
    {
        if(!(key in obj2)) return false; 
        if(!deepEqual(obj1[key], obj2[key])) return false;
    }

    return true;
}


//Test Cases

let obj ={one: { 1:'1'}, two: 2};
console.log(deepEqual(obj, obj));
// true
console.log(deepEqual(obj, {one: 1, two: 2}));
// false
console.log(deepEqual(obj, {one: { 1:'1'}, two: 2}));
// true
console.log(deepEqual(obj, {one: {'1': 1}, two: 2}));
// false
console.log(deepEqual(obj, {1: 'one', 2:'two'}));
// false
