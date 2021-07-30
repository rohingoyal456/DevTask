let helpObj=require("./commands/help");
let treeObj=require("./commands/tree");
let organizeObj=require("./commands/organize");

//main input
var inputArr=process.argv.slice(2);
var commandInput=inputArr[0];
var pathName=inputArr[1];
switch(commandInput)
{
    case "tree":
        // input -> node main.js tree "path"
        console.log(treeObj.tree(pathName));
        break;
    case "organize":
        // input -> node main.js organize "path"
        console.log(organizeObj.organize(pathName));
        break;
    case "help":
        // input -> node main.js help
        console.log(helpObj.help());
        break;
    default:
        console.log("Kindly enter the correct cmd");
}
