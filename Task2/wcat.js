let fs=require("fs");
let path=require("path");
let filePathObj=require("./commands/readContent");

//main input
let inputArr=process.argv.slice(2);
let fileArray=[];
let optionArray=[];
let contentappended="";

//dividing the inputs
for(let i=0;i<inputArr.length;i++)
{
    if(inputArr[i].charAt(0)=="-")
    {
        optionArray.push(inputArr[i]);
    }
    else
    {
        fileArray.push(inputArr[i]);
    }
}
let checkForbn=false;
if(optionArray.includes("-b") && optionArray.includes("-n"))
{
    checkForbn=true;
}
let priorityForb=0;
let priorityForn=0;
for(let i=0;i<optionArray.length;i++)
{
    if(optionArray.includes("-n"))
    {
        priorityForn=optionArray.length-i;
    }
    else if(optionArray.includes("-b"))
    {
        priorityForb=optionArray.length-i;
    }
}
//file content command print

for(let i=0;i<fileArray.length;i++)
{
    let ans= fs.existsSync(fileArray[i]);
    if(ans==false)
    {
        console.log(path.basename(fileArray[i])," doesn't exist");
    }
    else
    {
        contentappended+=filePathObj.readContent(fileArray[i]);
    }   
}
console.log("The content present in files are:");
if(contentappended!="")
{
    console.log(contentappended);
}
else
{
    console.log("There is no content present in the files");
}

console.log("***********************************************");

// -s command code
let isPresents=optionArray.includes("-s");
if(isPresents)
{  
    console.log("The content of files after -s command:");
    let contentFors=contentappended.split("\r\n");
    for(let i=1;i<contentFors.length;i++)
    {
        if(contentFors[i]=="" && contentFors[i-1]=="")
        {
            contentFors[i]=null;
        }
        else if(contentFors[i]=="" && contentFors[i-1]==null)
        {
            contentFors[i]=null;
        }
    }
    let tempArr=[];
    for(let i=0;i<contentFors.length;i++)
    {
        if(contentFors[i]!=null)
        {
            tempArr.push(contentFors[i]);
        }
    }
    contentFors=tempArr.join("\n");
    console.log(contentFors);
    console.log("***********************************************");}

// -n command code
let isPresentn=optionArray.includes("-n");
if((isPresentn && checkForbn==false) || (checkForbn==true && priorityForn>priorityForb))
{
    console.log("The content of files after -n command:");
    let contentForn=contentappended.split("\r\n");
    let tempArr=[];
    for(let i=0;i<contentForn.length;i++)
    {
        let line=(i+1)+" "+contentForn[i];
        tempArr.push(line);
    }
    contentForn=tempArr.join("\n");
    console.log(contentForn);
    console.log("***********************************************");
}

// -b command code
let isPresentb=optionArray.includes("-b");
if((isPresentb && checkForbn==false) || (checkForbn==true && priorityForb>priorityForn))
{
    console.log("The content of files after -b command:");
    let contentForb=contentappended.split("\r\n");
    let tempArr=[];
    let num=1;
    for(let i=0;i<contentForb.length;i++)
    {
        if(contentForb[i]=="")
        {
            let line=num+" "+contentForb[i]; 
            tempArr.push(line);
            num++;
        }
        else 
        {
            tempArr.push(contentForb[i]);
        }
    }
    contentForb=tempArr.join("\n");
    console.log(contentForb);
    console.log("***********************************************");
}