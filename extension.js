const vscode = require('vscode');
var delimiters_1 = require("./delimiters");

let header = `/*!






 __  __                                                  ____
|  \\/  |   __ _  __  __   ___   _ __     ___    ___     / ___|   __ _   _ __ ___     __ _ 
| |\\/| |  / _\` | \\ \\/ /  / _ \\ | '_ \\   / __|  / _ \\   | |  _   / _\` | | '_ \` _ \\   / _\` |
| |  | | | (_| |  >  <  |  __/ | | | | | (__  |  __/   | |_| | | (_| | | | | | | | | (_| |
|_|  |_|  \\__,_| /_/\\_\\  \\___| |_| |_|  \\___|  \\___|    \\____|  \\__,_| |_| |_| |_|  \\__,_|







 */
/**!
 *   @license © Copyright {{YEAR}}, All rights reserved.
 *   @author Maxence Gama, @maxencegama
 *   @contact contact@maxencegama.dev
 */
\n`;

let supportsLanguage = function (languageId) {
    return languageId in delimiters_1.languageDemiliters;
};

let printHeader = () => {
	var activeTextEditor = vscode.window.activeTextEditor;
	if (!activeTextEditor) {
		return;
	}
    var document = activeTextEditor.document;
	if (supportsLanguage(document.languageId)) {
		let textheader = header.replace("{{YEAR}}", new Date().getFullYear());
		activeTextEditor.edit(function (editor) {
			editor.insert(new vscode.Position(0, 0), textheader);
		});
	}
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('mg-header.printheader', printHeader);

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
