let fs=require("fs");
let path=require("path");

//File Extensions
let types={
    media:["mp4","mkv"],
    archives:['zip','7z','rar','tar','gz','ar','iso','xz'],
    documents:['docx','doc','pdf','xlsx','xls','odt','ods','odp','odg','odf','txt','ps','tex'],
    app:['exe','dmg','pkg','deb']
}

function organizefn(pathName)
{
    let destPath=o=path.join(pathName,"organized files");
    let allEntities=fs.readdirSync(pathName);
    if(fs.existsSync(destPath)==false)
    {
        fs.mkdirSync(path.join(pathName,"organized files"));   //Organized Files folder created
        for(let key in types)
        {
            fs.mkdirSync(path.join(pathName,"organized files",key));
        }
        fs.mkdirSync(path.join(pathName,"organized files","other"));
    }

    for(let i=0;i<allEntities.length;i++)
    {
        let sourceFullPath=path.join(pathName,allEntities[i]);
        let tobeCopiedFileName=path.basename(sourceFullPath);
        let extension= tobeCopiedFileName.split(".")[1];
        let fileCopied=false;
        for(let key in types)
        {
            for(let x in types[key])
            {
                if(types[key][x]==extension)
                {
                    let destFullPath=path.join(pathName,"organized files",key,tobeCopiedFileName);
                    fs.copyFileSync(sourceFullPath,destFullPath);
                    fileCopied=true;
                    fs.unlinkSync(sourceFullPath);
                }
            }
        }
        if(!fileCopied)
        {
            let destFullPath=path.join(pathName,"organized files","other",tobeCopiedFileName);
            fs.copyFileSync(sourceFullPath,destFullPath);
            fs.unlinkSync(sourceFullPath);
        }
    }

    return "Folder has been successfully orgainzed";
}

// code export 
module.exports={
    organize:organizefn
}