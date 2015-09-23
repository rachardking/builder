var esprima2 = require('esprima-fb');
var esprima = require('esprima');
var babel = require('babel');
var acorn = require('acorn');
var babylon = require('babylon');
var escodegen = require('escodegen');
var core= require('babel-core');
//console.log(Object.keys(core));

var fs = require('fs-extra');
var estraverse = require('estraverse-fb');
var colors = require('colors');



var esformatter = require('esformatter');

const esformatterOptions = {
    // inherit from the default preset
    preset : 'default',
    indent : {
        value : '    '
    },
    lineBreak : {
        before : {
            // at least one line break before BlockStatement
            BlockStatement : '>=1',
            // only one line break before BlockStatement
            DoWhileStatementOpeningBrace : 1
            // ...
        }
    },
    "plugins": [
        "esformatter-jsx"
    ],
    // this is the section this plugin will use to store the settings for the jsx formatting
    "jsx": {
        // by default is true if set to false it works the same as esformatter-jsx-ignore
        "formatJSX": true,
        // keep the node attributes on the same line as the open tag. Default is true.
        // Setting this to false will put each one of the attributes on a single line
        "attrsOnSameLineAsTag": false,
        // how many attributes should the node have before having to put each
        // attribute in a new line. Default 1
        "maxAttrsOnTag": 2,
        // if the attributes are going to be put each one on its own line, then keep the first
        // on the same line as the open tag
        "firstAttributeOnSameLine": true,
        // align the attributes with the first attribute (if the first attribute was kept on the same line as on the open tag)
        "alignWithFirstAttribute": true,
        "spaceInJSXExpressionContainers": " ",
        "htmlOptions": { // same as the ones passed to jsbeautifier.html
            "brace_style": "collapse",
            "indent_char": " ",
            //indentScripts: "keep",
            "indent_size": 4,
            "max_preserve_newlines": 2,
            "preserve_newlines": true
            //unformatted: ["a", "sub", "sup", "b", "i", "u" ],
            //wrapLineLength: 0
        }
    }
};

function formatJsFile(fileData){
    try{

        return esformatter.format(fileData, esformatterOptions);
    } catch(e){
        console.error(e);
        throw Error(e.message);
    }
}


var nodeAdd = {
			"type": "ExportDefaultDeclaration",
			"start": 218,
			"end": 246,
			"loc": {
				"start": {
					"line": 17,
					"column": 0
				},
				"end": {
					"line": 17,
					"column": 28
				}
			},
			"declaration": {
				"type": "Identifier",
				"start": 233,
				"end": 245,
				"loc": {
					"start": {
						"line": 17,
						"column": 15
					},
					"end": {
						"line": 17,
						"column": 27
					}
				},
				"name": "HelloMessage",
				"leadingComments": null
			},
			"leadingComments": [
				{
					"type": "CommentLine",
					"value": "草泥马戈壁",
					"start": 208,
					"end": 217,
					"loc": {
						"start": {
							"line": 16,
							"column": 0
						},
						"end": {
							"line": 16,
							"column": 9
						}
					},
					"range": [
						208,
						217
					]
				}
			]
		}



// babel.transformFile('./code.js', {whitelist:[],externalHelpers: true}, function(err,data){
// 	var result = data.ast.program;
// 	//console.log(result)
// 	var res = babel.transform.fromAst(result,null,{whitelist:[], modules:'ignore'})
// 	var code = formatJsFile(res.code);
// 	console.log(code);


// 	fs.writeFile('./codeString.js', code, {encoding: 'utf8'})
// });



fs.readFile('./code.js', {encoding: 'utf8'},function(err,data){
	//var result = esprima2.parse(data,{sourceType: 'module'};
	//var result = babel.transform(data);
	
	var result = babel.parse(data);
	//result.body.push(nodeAdd)
	//console.log(result);
	//result.start = 3;
	//processData(result);
	var res = babel.transform.fromAst(result,null,{whitelist:[]})
	var code = formatJsFile(res.code);
	//var res = escodegen.generate(result)
	console.log(code);

	fs.writeFile('./codeString.js', code, {encoding: 'utf8'})

	//fs.writeFile('./codeParse.js', JSON.stringify(result,null,'\t'), {encoding: 'utf8'})
	//console.log(escodegen.generate(AST[, options]));
});

// fs.readFile('./codeParse.js', {encoding: 'utf8'},function(err,data){
	
// 	var res = babel.transform.fromAst(JSON.parse(data),null,{whitelist:[]})
// 	console.log(res);

	
// });




function processData (data) {
	estraverse.traverse(data, {
		enter: function(node, parent) {
			if (node.type === 'ImportDeclaration' && node.leadingComments && node.leadingComments[0] && node.leadingComments[0].value === '@import') {
				console.log(parent)
				//console.log(parent)
				return estraverse.VisitorOption.Skip;
			}
            
		}
	})
}


// babel.transformFile("./code.js", function (err, result) {
// 	//var res = babel.transform.fromAst(JSON.parse(result.ast))
// 	//console.log(result.ast)
// 	//fs.writeFile('./codeParse.js', result.ast.toString(), {encoding: 'utf8'})

// 	//fs.writeFile('./codeParse.js', JSON.stringify(result.ast.program.body,null,'\t'), {encoding: 'utf8'})
// 	//console.log(comments)
//   	//console.log(result.ast)
//   	//console.log(babel.transform.fromAst(result.ast.program))
// });

//console.log(Object.keys(babel));