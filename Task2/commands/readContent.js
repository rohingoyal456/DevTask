let fs=require("fs");
let path=require("path");
function readContentfn(pathName)
{
    
    let content=fs.readFileSync(pathName);
    return content;
}

module.exports={
    readContent:readContentfn
}