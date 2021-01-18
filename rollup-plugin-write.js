//import { name as appName, version as appVersion} from "./package.json"
const appName = require("./package.json").name
const appVersion = require("./package.json").version
const fs = require("fs")

const v = new Date();
const buildDate =  `${v.getFullYear()}-${v.getMonth() + 1}-${v.getDate()} ${v.getHours()}:${v.getMinutes()}:${v.getSeconds()}`;
const defaultInject = "/* @App version: " + appVersion + " " + "@Build Date: " + buildDate + "*/"

/**
 * rules .css: 
 *  - type = assets
 *  - data = source
 * 
 * rules .js:
 *  - type = chunk
 *  - data = code
 */
const CSS_RULE = {
    type: "asset",
    data: "source"
}
const JS_RULE = {
    type: "chunk",
    data: "code"
}

function writeBuildInfoInsteadRollUpOptionsForVite(opts = {}){
    const { 
        injectData = defaultInject,
        position = "banner",
        fileName = `${appName}-v${appVersion}.txt`,
        filePath = "./docs",
        fileContent = appName + appVersion
    } = opts
    return {
        name:"WriteBuildInfo",
        generateBundle:async (options,bundle,isWrite) => {
            if(isWrite) {
                Reflect.ownKeys(bundle).forEach(name => {
                    findAssetFileInjectCode(bundle[name],"js",injectData,position)
                    findAssetFileInjectCode(bundle[name],"css",injectData,position)
                })
            }   
        },
        writeBundle:async () => {
            setImmediate(async () => {
                fs.mkdir(filePath, { recursive: true },(err) => {
                    !err && fs.writeFile( filePath +"/"+ fileName, fileContent,{ flag: "a" }, (err) => {
                        if(err){
                            console.log(err)
                        }
                    })
                })
            })
        }
    }
}

function findAssetFileInjectCode(assetInfo,ext,injectData,position){
    if(ext === "js" && assetInfo.type === JS_RULE.type && /\.js$/.test(assetInfo.fileName)){
        if(position === "banner"){
            Reflect.set(assetInfo,JS_RULE.data,injectData + assetInfo[JS_RULE.data])
        }
        if(position === "footer"){
            Reflect.set(assetInfo,JS_RULE.data,assetInfo[JS_RULE.data] + injectData)
        }
    } 
    if (ext === "css" && assetInfo.type === CSS_RULE.type && /\.css$/.test(assetInfo.fileName)){
        if(position === "banner"){
            Reflect.set(assetInfo,CSS_RULE.data,injectData + assetInfo[CSS_RULE.data])
        }
        if(position === "footer"){
            Reflect.set(assetInfo,CSS_RULE.data,assetInfo[CSS_RULE.data] + injectData)
        }
    }
}


module.exports = writeBuildInfoInsteadRollUpOptionsForVite