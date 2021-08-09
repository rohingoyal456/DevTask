let request =require("request");
let cheerio=require("cheerio");
let fs=require("fs");
let path=require("path");
//URL of homepage
let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595";
request(url,cb);
function cb(error,response,html)
{
    if(error)
    {
        console.log(error);
    }
    else if (response.statusCode==404)
    {
        console.log("Page Not Found");
    }
    else
    {
        allMatchDataExtractor(html);
    }
}
function allMatchDataExtractor(html)
{
    let searchTool=cheerio.load(html);
    let allMatch=searchTool(".widget-items a");
    let link=allMatch.attr("href");
    let lastPart=link.split("/")[3];
    let fullLink=`${url}/${lastPart}`;
    request(fullLink,cb1)
}

function cb1(error,response,html)
{
    if(error)
    {
        console.log(error);
    }
    else if (response.statusCode==404)
    {
        console.log("Page Not Found");
    }
    else
    {
        scorecardDataExtractor(html);
    }
}

function scorecardDataExtractor(html)
{
    let searchTool=cheerio.load(html);

    let Arr=searchTool(".match-cta-container");
    for(let i=0;i<Arr.length;i++)
    {
        let aArr=searchTool(Arr[i]).find("a");
        let scorecard=searchTool(aArr[2]).attr("href");
        let lastPart=scorecard.split("/")[3];
        let fullLink=`${url}/${lastPart}/full-scorecard`; 
        request(fullLink,cb2);
    }
}

function cb2(error,response,html)
{
    if(error)
    {
        console.log(error);
    }
    else if (response.statusCode==404)
    {
        console.log("Page Not Found");
    }
    else
    {
        playersDataExtractor(html);
    }
}

function playersDataExtractor(html)
{
    let searchTool=cheerio.load(html);

    let inningsArr=searchTool(".Collapsible");
    for(let i=0;i<inningsArr.length;i++)
    {
        let teamNameElem=searchTool(inningsArr[i]).find("h5");
        let teamNameTitle=searchTool(teamNameElem).text();
        let teamName=teamNameTitle.split("INNINGS")[0];

        let match=searchTool(".match-info.match-info-MATCH.match-info-MATCH-half-width");
        let opponentTeamNameElem=searchTool(inningsArr[(i+1)%2]).find("h5");
        let opponentTeamName=searchTool(opponentTeamNameElem).text().split("INNINGS")[0];
        let matchDescriptionFind=searchTool(match).find(".description");
        let matchDescriptionArr=searchTool(matchDescriptionFind).text().split(",");
        let venue=matchDescriptionArr[1];
        let date=matchDescriptionArr[2];
        let resultFind=searchTool(match).find(".status-text");
        let result=searchTool(resultFind).text();
        console.log(teamName+" vs " + opponentTeamName+" :RESULT -> "+result);
        let batsman=searchTool(inningsArr[i]).find(".table.batsman tbody tr");
        for(let j=0;j<batsman.length;j++)
        {
            let players=searchTool(batsman[j]).find("td");
            if(players.length==8)
            {
                let myTeamName=teamName;
                let name=searchTool(players[0]).text();
                let runs=searchTool(players[2]).text();
                let balls=searchTool(players[3]).text();
                let fours=searchTool(players[4]).text();
                let sixes=searchTool(players[5]).text();
                let strikeRate=searchTool(players[6]).text();
                let input=[];
                let obj={
                    "myTeamName":myTeamName,
                    "name":name,
                    "venue": venue,
                    "date": date,
                    "opponentTeamName":opponentTeamName,
                    "result": result,
                    "runs": runs,
                    "balls":balls,
                    "fours":fours,
                    "sixes": sixes,
                    "sr": strikeRate
                };

                if(!fs.existsSync("./cricinfo"))
                {
                    fs.mkdirSync("./cricinfo");
                }
                if(!fs.existsSync("./cricinfo/ipl"))
                {
                    fs.mkdirSync("./cricinfo/ipl");
                }
                if(!fs.existsSync(path.join("./cricinfo/ipl",teamName)))
                {
                    fs.mkdirSync(path.join("./cricinfo/ipl",teamName));
                }
                let fileName=name.split(" ").join("");
                if(!fs.existsSync(path.join("./cricinfo/ipl",teamName,`${fileName}.json`)))
                {
                    let jsonWriteAble=JSON.stringify(input);
                    let jsonFilePath=path.join("./cricinfo/ipl",teamName,`${fileName}.json`);
                    fs.writeFileSync(jsonFilePath,jsonWriteAble);
                }
                else
                {
                    let jsonFilePath=path.join("./cricinfo/ipl",teamName,`${fileName}.json`);
                    let content=fs.readFileSync(jsonFilePath);
                    let jsonData=JSON.parse(content);
                    jsonData.push(obj);
                    let jsonWriteAble=JSON.stringify(jsonData);
                    fs.writeFileSync(jsonFilePath,jsonWriteAble);
                }
            }
        }
    }
}
