const vscode = require('vscode');
const os = require('os');

function updateSettings () {
  const config = vscode.workspace.getConfiguration('platformSettings');
  const codeConfig = vscode.workspace.getConfiguration();

  let platform;
  if (String(os.platform) in config.platforms) platform = String(os.platform);
  if (String(os.hostname()) in config.platforms) platform = String(os.hostname());

  if (platform) {
    const platformSettings = config.platforms[platform];
    console.log(`Loading settings for ${platform}.`);
    Object.keys(platformSettings).forEach(function (key) {
      console.log(`${key}: ${platformSettings[key]}`);
      codeConfig.update(String(key), platformSettings[key], 1);
    });
  }
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let refreshSettings = vscode.commands.registerCommand('extension.refreshSettings', function () {
    updateSettings();
  });

  updateSettings();

  context.subscriptions.push(refreshSettings);
}
exports.activate = activate;

function deactivate() {}
module.exports = {
  activate,
  deactivate
}