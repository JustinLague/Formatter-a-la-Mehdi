const vscode = require('vscode');
const propertiesGetter = require("./propertiesGetter")
const formater = require("./formater");
const writer = require("./writer");



exports.generateGettersSetters = () => {
    vscode.window.showInformationMessage("debut de generateGetters");
    var editor = vscode.window.activeTextEditor;
    
    if (!editor) {
        return; 
    }
    
    var selection = editor.selection;
    var selectionText = editor.document.getText(selection);
    var allText = editor.document.getText();

    var listProperties;

    if (selectionText !== '')
        listProperties = propertiesGetter.getPropertiesFromSelection(selectionText);
    else
        listProperties = propertiesGetter.getPropertiesFromFile(allText);

    
    var formatedGetters = formater.formatGetters(listProperties);
    var formatedSetters = formater.formatSetters(listProperties);

    writer.writeGettersSetters(formatedGetters);
    writer.writeGettersSetters(formatedSetters);
}