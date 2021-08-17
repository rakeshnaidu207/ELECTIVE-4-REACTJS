# Module_6_E3
Write a function deepEqual that takes two values and returns true only if they are the same value or are objects with the same properties, 
where the values of the properties are equal when compared to deepEqual.
To find out whether values should be compared directly (use the === operator for that) 
or have their properties compared, you can use the type of operator. 
If it produces an "object" for both values, you should do a deep comparison. 
But you have to take one silly exception into account: because of a historical accident, type of null also produces "object".
The Object. keys function will be useful when you need to go over the properties of objects to compare them.
