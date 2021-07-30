function helpfn()
{
    console.log("List of all commands");
    console.log("1. node main.js tree path");
    console.log("2. node main.js organize path");
    console.log("3. node main.js help");
}

//code export
module.exports={
    help:helpfn
}