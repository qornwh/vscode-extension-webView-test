// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "testbbb" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('testbbb.helloWorld', () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    //vscode.window.showInformationMessage('Hello World from test!');
    DesignPanel.createOrShow(context.extensionUri);
  });

  let saveable = vscode.commands.registerCommand('testbbb.savehelloWorld', () => {
    const panel = DesignPanel.currentPanel?.getPanel();
    if (panel) {
      const opt = {
        default: context.extensionUri,
        saveLabel: 'save',
        title: '마크다운 파일 저장',
      };
      vscode.window.showSaveDialog(opt).then((fileUri) => {
        if (fileUri) {
          // 테스트
          console.log('Selected file: ' + fileUri);
        }
      });
    }
  });

  context.subscriptions.push(disposable);
  context.subscriptions.push(saveable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

class DesignPanel {
  public static currentPanel: DesignPanel | undefined;

  public static readonly viewType = 'designView';

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(extensionUri: vscode.Uri) {
    const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

    // If we already have a panel, show it.
    if (DesignPanel.currentPanel) {
      DesignPanel.currentPanel._panel.reveal(column);
      return;
    }
    const panel = vscode.window.createWebviewPanel(DesignPanel.viewType, 'Design View', vscode.ViewColumn.One, getWebviewOptions(extensionUri));

    DesignPanel.currentPanel = new DesignPanel(panel, extensionUri);
  }

  public getPanel() {
    return this._panel;
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._extensionUri = extensionUri;

    // Set the webview's initial html content
    this._update();

    this._panel.webview.html = this._getHtmlForWebview();

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programmatically
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // Update the content based on view changes
    //this._panel.onDidChangeViewState(
    //  (e) => {
    //    if (this._panel.visible) {
    //      this._update();
    //    }
    //  },
    //  null,
    //  this._disposables
    //);

    // Handle messages from the webview
    //this._panel.webview.onDidReceiveMessage(
    //  (message) => {
    //    switch (message.command) {
    //      case 'alert':
    //        vscode.window.showErrorMessage(message.text);
    //        return;
    //    }
    //  },
    //  null,
    //  this._disposables
    //);
  }

  public dispose() {
    DesignPanel.currentPanel = undefined;

    // Clean up our resources
    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private _update() {
    const webview = this._panel.webview;
  }

  private _getHtmlForWebview() {
    // Local path to main script run in the webview
    const designPathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'designViewer', 'designViewer.js');

    // And the uri we use to load this script in the webview
    const designScriptUri = designPathOnDisk.with({ scheme: 'vscode-resource' });

    // Local path to css styles
    //const styleResetPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'reset.css');
    //const stylesPathMainPath = vscode.Uri.joinPath(
    //	this._extensionUri,
    //	'media',
    //	'vscode.css'
    //);

    // Uri to load styles into webview
    //const stylesResetUri = webview.asWebviewUri(styleResetPath);
    //const stylesMainUri = webview.asWebviewUri(stylesPathMainPath);

    // Use a nonce to only allow specific scripts to be run
    const nonce = getNonce();

    return `<html>
			<head>
				<meta charset='utf-8'>
				<title>Page Title</title>

			</head>
			<body>
				<div id="root" class="mdRoot">
					<div id="eidtor" class="mdEditor"/>
				</div>
				<script src="${designScriptUri}"></script>
			</body>
		</html>`;
  }
}

function getWebviewOptions(extensionUri: vscode.Uri): vscode.WebviewOptions {
  return {
    // Enable javascript in the webview
    // 이거 해줘야 스크립트 추가 가능함
    enableScripts: true,

    // And restrict the webview to only loading content from our extension's `media` directory.
    localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'designViewer')],
  };
}

function getNonce() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
