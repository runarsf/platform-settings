const vscode = require('vscode');
const os = require('os');

function loadSettings (platform) {
  const settingNodes = vscode.workspace.getConfiguration('platformSettings').platforms[platform].nodes;
  const config = vscode.workspace.getConfiguration();
  
  console.log(`Loading settings for ${platform}.`);
  Object.keys(settingNodes).forEach((key) => {
    console.log(` - ${key}: ${settingNodes[key]}`);
    config.update(String(key), settingNodes[key], 1);
  });
}

function updateSettings () {
  const config = vscode.workspace.getConfiguration('platformSettings');

  let platform;
  if (os.platform() in config.platforms) platform = os.platform();
  if (os.hostname() in config.platforms) platform = os.hostname();
  if (String(eval(config.condition)) in config.platforms) platform = String(eval(config.condition));
  if (platform) {
    if (config.platforms[platform].inherits) loadSettings(config.platforms[platform].inherits);

    loadSettings(platform);
  }
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate (context) {
  let refreshSettings = vscode.commands.registerCommand('extension.refreshSettings', function () {
    updateSettings();
  });

  if (vscode.workspace.getConfiguration('platformSettings').autoLoad) updateSettings();

  context.subscriptions.push(refreshSettings);
}
exports.activate = activate;

function deactivate () {}
module.exports = {
  activate,
  deactivate
}