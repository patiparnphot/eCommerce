var fs   = require( 'fs' ),
    glob = require( 'glob' ),
    path = require( 'path' );

function setBlogIdFormat (blogIdInt) {
    var blogIdString = blogIdInt.toString();
    if (blogIdString.length == 3) { return blogIdString; }
    else if (blogIdString.length == 2) {return "0" + blogIdString;}
    else if (blogIdString.length == 1) {return "00" + blogIdString;}
    else { return blogIdString; }
}

async function callJsonFileByName (name) {
    var files = await glob.sync("./data/Blog/*" + name + ".json");
    if (!files || files.length == 0) {
        return false;
    } else {
        var jsonData = fs.readFileSync(path.resolve(files[0]), 'utf8');
        return jsonData;
    }
}

async function callBlogIdByName (name) {
    var files = await glob.sync("./data/Blog/*" + name + ".json");
    if (!files || files.length == 0) {
        return false;
    } else {
        var fileNameWithExt = files[0].split("/").slice(-1).pop();
        var fileName = fileNameWithExt.split(".")[0];
	var fileProp = fileName.split("_");
        var blogId = fileProp[0];
        return blogId;
    }
}

async function callBlogNameByPath (path) {
    var fileNameWithExt = path.split("/").slice(-1).pop();
    var fileName = fileNameWithExt.split(".")[0];
    var fileProp = fileName.split("_");
    var blogName = fileProp[fileProp.length-1];
    return blogName;
}

async function editBlogName (pathFile, blogName) {
    if (!pathFile || !blogName) return false;
    var pathFileArr = pathFile.split("/");
    var pathWithoutFile = "";
    for (let i = 0; i < (pathFileArr.length - 1); i++) {
        pathWithoutFile += await pathFileArr[i];
        pathWithoutFile += "/";
    }
    var fileNameWithExt = pathFileArr.slice(-1).pop();
    var fileName = fileNameWithExt.split(".")[0];
    var filePropsArr = fileName.split("_");
    var newFileName = "";
    for (let i = 0; i < filePropsArr.length; i++) {
        if ( i == (filePropsArr.length - 1) ) {
            newFileName += blogName + ".json";
        } else {
            newFileName += await filePropsArr[i];
            newFileName += "_";
        }
    }
    return await (pathWithoutFile + newFileName);
}

async function callJsonFileByBlogId (blogId) {
    var files = await glob.sync("./data/Blog/" + blogId + "*.json");
    if (!files || files.length == 0) {
        return false;
    } else {
        var jsonData = fs.readFileSync(path.resolve(files[0]), 'utf8');
        return jsonData;
    }
}

function callLastestJsonFile () {
    var files = glob.sync("./data/Blog/*_lastest_**.json");
    if (!files || files.length == 0) {
        return false;
    } else {
        var jsonData = fs.readFileSync(path.resolve(files[0]), 'utf8');
        return jsonData;
    }
}

async function callLastestBlogId () {
    var files = await glob.sync("./data/Blog/*_lastest_**.json");
    if (!files || files.length == 0) {
        return false;
    } else {
        var fileNameWithExt = files[files.length-1].split("/").slice(-1).pop();
        var fileName = fileNameWithExt.split(".")[0];
	var fileProp = fileName.split("_");
        var blogId = fileProp[0];
        return blogId;
    }
}

async function editJsonFile (wannaEditJson, editedForm) {
    if(!wannaEditJson || !editedForm){
        return {};
    }
    let editedJson = {};
    let wannaEditJsonProps = Object.keys(wannaEditJson);
    let editedFormProps = Object.keys(editedForm);
    for (let i = 0; i < wannaEditJsonProps.length; i++) {
        for (let j = 0; j < editedFormProps.length; j++) {
            if (wannaEditJsonProps[i] == editedFormProps[j]) {
                editedJson = await (() => {
                    let currentlyJson = editedJson;
                    currentlyJson[editedFormProps[j]] = editedForm[editedFormProps[j]];
                    return currentlyJson;
                })();
            }
        }
        if (!editedJson[wannaEditJsonProps[i]]) {
            editedJson = await (() => {
                let currentlyJson = editedJson;
                currentlyJson[wannaEditJsonProps[i]] = wannaEditJson[wannaEditJsonProps[i]];
                return currentlyJson;
            })();
        }
    }
    return await editedJson;
}

module.exports = {
    async findByBlogName(name){
        if(!name){
            return {};
        }
        var jsonData = await callJsonFileByName(name);
        if (!jsonData) { return {}; }
        else { return JSON.parse(jsonData); }
    },
    async findByNextBlog(name){
        if(!name){
            return {};
        }
        var currentBlogId = await callBlogIdByName(name);
        if (!currentBlogId) {
            return {};
        } else {
            var nextBlogIdInt = parseInt(currentBlogId, 10) + 1;
	    var nextBlogId = setBlogIdFormat(nextBlogIdInt);
	    var nextBlogIdJsonData = await callJsonFileByBlogId(nextBlogId);
	    if (!nextBlogIdJsonData) {
	        var currentBlogIdJsonData = await callJsonFileByBlogId(currentBlogId);
		return JSON.parse(currentBlogIdJsonData);
	    } else {
	        return JSON.parse(nextBlogIdJsonData);
	    }   
        }
    },
    async findByPrevBlog(name){
        if(!name){
            return {};
        }
        var currentBlogId = await callBlogIdByName(name);
        if (!currentBlogId) {
            return {};
        } else {
            var prevBlogIdInt = parseInt(currentBlogId, 10) - 1;
            var prevBlogId = setBlogIdFormat(prevBlogIdInt);
	    var prevBlogIdJsonData = await callJsonFileByBlogId(prevBlogId);
	    if (!prevBlogIdJsonData) {
	        var currentBlogIdJsonData = await callJsonFileByBlogId(currentBlogId);
	        return JSON.parse(currentBlogIdJsonData);
	    } else {
	        return JSON.parse(prevBlogIdJsonData);
	    }   
        }
    },
    findByLastestBlog: function(){
        var lastestJsonData = callLastestJsonFile();
        if (!lastestJsonData) { return {}; }
        else { return JSON.parse(lastestJsonData); }
    },
    async findByRecentBlogs(numbers){
        var lastestBlogId = await callLastestBlogId();
	if (!lastestBlogId) {
	    return [];
        } else {
	    var recentJsonArr = [];
	    for(let i = 0; i < numbers; i++) {
	        let recentBlogIdInt = parseInt(lastestBlogId, 10) - i;
	        let recentBlogId = setBlogIdFormat(recentBlogIdInt);
	        let recentJsonData = await callJsonFileByBlogId(recentBlogId);
	        if(recentJsonData) {
	            recentJsonArr.push(JSON.parse(recentJsonData));
	        }
	    }
	    return recentJsonArr;
        }
    },
    async findByPaginationBlogs(start, end){
        if((!start)||(!end)){
            return {};
        }
        var paginationJsonArr = [];
        var startBlogIdInt = parseInt(start, 10);
        var numbers = parseInt(end, 10) - startBlogIdInt;
	for(let i = 0; i <= numbers; i++) {
	    let currentBlogIdInt = startBlogIdInt + i;
	    let currentBlogId = setBlogIdFormat(currentBlogIdInt);
	    let currentJsonData = await callJsonFileByBlogId(currentBlogId);
	    if(currentJsonData) {
	        paginationJsonArr.push(JSON.parse(currentJsonData));
	    }
	}
	return paginationJsonArr;
    },
    async createNewBlog(newBlogObj){
        if (!newBlogObj) return {};
    	var lastestBlogId = await callLastestBlogId();
	if (!lastestBlogId) {
	    return {};
        } else {
            var newLastestBlogIdInt = parseInt(lastestBlogId, 10) + 1;
            var newLastestBlogId = await setBlogIdFormat(newLastestBlogIdInt);
            newBlogObj.id = await newLastestBlogId;
            newBlogObj.slug = await newBlogObj.slug.toLowerCase();
            var newBlogStr = await JSON.stringify(newBlogObj);
            console.log("newBlogId: ", newLastestBlogId);
            return new Promise((resolve, reject) => {
                fs.writeFile("./data/Blog/" + newLastestBlogId + "_lastest_" + newBlogObj.slug + ".json", newBlogStr, function(err) {
	            if(err) reject(err)
		    var files = glob.sync("./data/Blog/*_lastest_**.json");
		    console.log(files);
		    for(let i = 0; i < (files.length-1); i++){
		        let fileNameWithExt = files[i].split("/").slice(-1).pop();
		        let fileName = fileNameWithExt.split(".")[0];
		        let fileProp = fileName.split("_");
		        let blogId = fileProp[0];
		        let blogName = fileProp[fileProp.length-1];
		        fs.rename(files[i], "./data/Blog/" + blogId + "_" + blogName + ".json", function(err) {
		            if(err) console.log('Cannot Rename: ' + files[i]);
		        });
		    }
                    resolve(newBlogObj);
                })  
	    });
        }
    },
    async editBlog(blogId, editedForm){
        if (!blogId && !editedForm) {
            return {};
        }
        var blogIdInt = await parseInt(blogId, 10);
        var editBlogId = await setBlogIdFormat(blogIdInt);
        editedForm.id = editBlogId;
        var files = await glob.sync("./data/Blog/" + editBlogId + "*.json");
        if (!files || files.length == 0) {
            return false;
        } else {
            var wannaEditStr = await callJsonFileByBlogId(editBlogId);
            if (!wannaEditStr) return {};
            var wannaEditJson = JSON.parse(wannaEditStr);
            var editedBlog = await editJsonFile(wannaEditJson, editedForm);
            if (!editedBlog || editedBlog == {}) return {};
            editedBlog.slug = await editedBlog.slug.toLowerCase();
            var editedBlogStr = JSON.stringify(editedBlog);
            if (wannaEditJson.slug == editedForm.slug) {
                return new Promise((resolve, reject) => {
                    fs.writeFile(path.resolve(files[0]), editedBlogStr, "utf8", async (err) => {
                        if(err) reject(err)
                        else resolve(editedBlog)
                    })
                })
            } else {
                var newPathFile = await editBlogName(files[0], editedForm.slug.toLowerCase());
                return new Promise((resolve, reject) => {
                    fs.writeFile(path.resolve(newPathFile), editedBlogStr, "utf8", async (err) => {
                        if(err) reject(err)
                        else {
                            fs.unlink(path.resolve(files[0]), async (err) => {
                                if(err) reject(err)
                                else resolve(editedBlog);
                            });
                        }
                    })
                })
            }
        }
    },
    howManyBlogs: function(){
        var files = glob.sync("./data/Blog/*.json");
        return files.length;
    },
    async listOfBlogName(){
        var files = glob.sync("./data/Blog/*.json");
        var listOfBlogName = [];
        for (let i = 0; i < files.length; i++) {
            listOfBlogName.push(await callBlogNameByPath(files[i]));
        }
        return listOfBlogName;
    },
    blogCategories: function(){
        var jsonData = fs.readFileSync(path.resolve("./data/BlogCategories.json"), 'utf8');
        if (!jsonData) { return {}; }
        else { return JSON.parse(jsonData); }
    },
    blogDetailContents: function(){
        var jsonData = fs.readFileSync(path.resolve("./data/BlogDetailContents.json"), 'utf8');
        if (!jsonData) { return {}; }
        else { return JSON.parse(jsonData); }
    },
    indexContents: function(){
        var jsonData = fs.readFileSync(path.resolve("./data/IndexContents.json"), 'utf8');
        if (!jsonData) { return {}; }
        else { return JSON.parse(jsonData); }
    },
    templateContents: function(){
        var jsonData = fs.readFileSync(path.resolve("./data/TemplateContents.json"), 'utf8');
        if (!jsonData) { return {}; }
        else { return JSON.parse(jsonData); }
    }
}