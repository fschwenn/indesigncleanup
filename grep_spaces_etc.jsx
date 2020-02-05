//This script is written by phlorian
//with the help of chainGREP.jsx by Gregor Fellenz 

main();

function main() {
	if (app.layoutWindows.length == 0) return;
	var changeObject = app.documents[0];
	if (changeObject.hasOwnProperty('characters') && changeObject.characters.length == 0) return;
	var doc = app.documents[0];
	var style;
	var scriptVersion = app.scriptPreferences.version;
	app.scriptPreferences.version = 15.0;
	var options = app.findChangeGrepOptions.properties;
	app.findGrepPreferences = NothingEnum.NOTHING;
	app.changeGrepPreferences = NothingEnum.NOTHING;
	try {
		// spaces at start of line
		app.findChangeGrepOptions.properties = ({includeFootnotes:true, kanaSensitive:true, widthSensitive:true});
		app.findGrepPreferences.properties = ({findWhat:"^\\s+(...)"});
		app.changeGrepPreferences.properties = ({changeTo:"$1", fillColor:"C=75 M=5 Y=100 K=0"});
		changeObject.changeGrep();
		
		// spaces at end of line
		app.findChangeGrepOptions.properties = ({includeFootnotes:true, kanaSensitive:true, widthSensitive:true});
		app.findGrepPreferences.properties = ({findWhat:"(...)\\s+$"});
		app.changeGrepPreferences.properties = ({changeTo:"$1", fillColor:"C=75 M=5 Y=100 K=0"});
		changeObject.changeGrep();
		
		// remove double spaces
		app.findChangeGrepOptions.properties = ({includeFootnotes:true, kanaSensitive:true, widthSensitive:true});
		app.findGrepPreferences.properties = ({findWhat:"(\\S)(\\s)\\s+(\\S)"});
		app.changeGrepPreferences.properties = ({changeTo:"$1$2$3", fillColor:"C=75 M=5 Y=100 K=0"});
		changeObject.changeGrep();
		
		// replace two or more dots (ideally 3) by ellipsis
		app.findChangeGrepOptions.properties = ({includeFootnotes:true, kanaSensitive:true, widthSensitive:true});
		app.findGrepPreferences.properties = ({findWhat:"\\.{2,}"});
		app.changeGrepPreferences.properties = ({changeTo:"~e", fillColor:"C=75 M=5 Y=100 K=0"});
		changeObject.changeGrep();
		
		// remove space in front of punctuation mark
		app.findChangeGrepOptions.properties = ({includeFootnotes:true, kanaSensitive:true, widthSensitive:true});
		app.findGrepPreferences.properties = ({findWhat:"\\s(,|:|;|!|\\?|\\.)"});
		app.changeGrepPreferences.properties = ({changeTo:"$1", fillColor:"C=75 M=5 Y=100 K=0"});
		changeObject.changeGrep();
		
		// set space after punctuation mark
		app.findChangeGrepOptions.properties = ({includeFootnotes:true, kanaSensitive:true, widthSensitive:true});
		app.findGrepPreferences.properties = ({findWhat:"(,|:|;|!|\\?|\\.)([A-Za-z]+)"});
		app.changeGrepPreferences.properties = ({changeTo:"$1 $2", fillColor:"C=75 M=5 Y=100 K=0"});
		changeObject.changeGrep();

		// thin space within special abbreviated expressions (z. B., u. U., u. a.)
		app.findChangeGrepOptions.properties = ({includeFootnotes:true, kanaSensitive:true, widthSensitive:true});
		app.findGrepPreferences.properties = ({findWhat:"\\b([zZ])\\.\\s?B\\."});
		app.changeGrepPreferences.properties = ({changeTo:"$1.~%B.", fillColor:"C=75 M=5 Y=100 K=0"});
		changeObject.changeGrep();	
		app.findChangeGrepOptions.properties = ({includeFootnotes:true, kanaSensitive:true, widthSensitive:true});
		app.findGrepPreferences.properties = ({findWhat:"\\b([uU])\\.\\s?(U|a)\\."});
		app.changeGrepPreferences.properties = ({changeTo:"$1.~%$2.", fillColor:"C=75 M=5 Y=100 K=0"});
		changeObject.changeGrep();
		
		//spaces around brackets and quotation marks
		app.findChangeGrepOptions.properties = ({includeFootnotes:true, kanaSensitive:true, widthSensitive:true});
		app.findGrepPreferences.properties = ({findWhat:"\\s(\\)|\\]|\\}|~}|~])"});
		app.changeGrepPreferences.properties = ({changeTo:"$1", fillColor:"C=75 M=5 Y=100 K=0"});
		changeObject.changeGrep();
		app.findChangeGrepOptions.properties = ({includeFootnotes:true, kanaSensitive:true, widthSensitive:true});
		app.findGrepPreferences.properties = ({findWhat:"(\\(|\\[|\\{|~{|~[)\\s"});
		app.changeGrepPreferences.properties = ({changeTo:"$1", fillColor:"C=75 M=5 Y=100 K=0"});
		changeObject.changeGrep();
		
		//nonbraking space between number and unit
		app.findChangeGrepOptions.properties = ({includeFootnotes:true, kanaSensitive:true, widthSensitive:true});
		app.findGrepPreferences.properties = ({findWhat:"(\\d)\\s?(mm|cm|m|km|g|kg|s|h|min)\\b"});
		app.changeGrepPreferences.properties = ({changeTo:"$1~S$2", fillColor:"C=75 M=5 Y=100 K=0"});
		changeObject.changeGrep();
		
		//nonbraking space within page reference
		app.findChangeGrepOptions.properties = ({includeFootnotes:true, kanaSensitive:true, widthSensitive:true});
		app.findGrepPreferences.properties = ({findWhat:"\\bS\\.\\s?(\\d)"});
		app.changeGrepPreferences.properties = ({changeTo:"S.~S$1", fillColor:"C=75 M=5 Y=100 K=0"});
		changeObject.changeGrep();
		
		//set proper quotation marks
		app.findChangeGrepOptions.properties = ({includeFootnotes:true, kanaSensitive:true, widthSensitive:true});
		app.findGrepPreferences.properties = ({findWhat:"\\x{0022}(\\S+)"});
		app.changeGrepPreferences.properties = ({changeTo:"~{$1", fillColor:"C=75 M=5 Y=100 K=0"});
		changeObject.changeGrep();
		app.findChangeGrepOptions.properties = ({includeFootnotes:true, kanaSensitive:true, widthSensitive:true});
		app.findGrepPreferences.properties = ({findWhat:"(\\S+)\\x{0022}"});
		app.changeGrepPreferences.properties = ({changeTo:"$1~}", fillColor:"C=75 M=5 Y=100 K=0"});
		changeObject.changeGrep();

		//replace qingle quot by proper apostroph
		app.findChangeGrepOptions.properties = ({includeFootnotes:true, kanaSensitive:true, widthSensitive:true});
		app.findGrepPreferences.properties = ({findWhat:"(\\w+)\\'"});
		app.changeGrepPreferences.properties = ({changeTo:"$1\\x{2019}", fillColor:"C=75 M=5 Y=100 K=0"});
		changeObject.changeGrep();
		
		//replace Bindestrich by Gedankenstrich
		app.findChangeGrepOptions.properties = ({includeFootnotes:true, kanaSensitive:true, widthSensitive:true});
		app.findGrepPreferences.properties = ({findWhat:" \\-( |,)"});
		app.changeGrepPreferences.properties = ({changeTo:" ~=$1", fillColor:"C=75 M=5 Y=100 K=0"});
		changeObject.changeGrep();
	} catch (e) {alert(e + ' at line ' + e.line)}
	app.findChangeGrepOptions.properties = options;
	app.findGrepPreferences = NothingEnum.NOTHING;
	app.changeGrepPreferences = NothingEnum.NOTHING;
	app.scriptPreferences.version = scriptVersion;
};

function getStyleByString(docOrGroup, string, property) {
	if (string == '[No character style]') return docOrGroup[property][0];
	if (string == '[No paragraph style]') return docOrGroup[property][0];
	if (string == 'NormalParagraphStyle') return docOrGroup[property][1];
	stringResult = string.match (/^(.*?[^\]):(.*)$/);
	var styleName = (stringResult) ? stringResult[1] : string;
	styleName = styleName.replace (/\:/g, ':');
	remainingString = (stringResult) ? stringResult[2] : '';
	var newProperty = (stringResult) ? property.replace(/s$/, '') + 'Groups' : property;
	var styleOrGroup = docOrGroup[newProperty].itemByName(styleName);
	if (remainingString.length > 0 && styleOrGroup.isValid) styleOrGroup = getStyleByString (styleOrGroup, remainingString, property);
	return styleOrGroup;
};
