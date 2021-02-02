/**
 * @todo Prepare for release 1.0.0.
 *   - [ ] Changelog.
 *   - [ ] Bump version number.
 *   - [ ] Add icon.
 *   - [ ] Complete all TODOs.
 *   - [ ] Dev docs: semantic versioning.
 *   - [ ] Dev docs: debugging.
 *   - [ ] Dev docs: updating.
 */
// TODO: Don't import entire library, only what is needed. { workspace, OutputChannel }
const vscode = require("vscode");
const os = require("os");
let channel = vscode.OutputChannel;
channel = vscode.window.createOutputChannel("platform-settings");

// TODO: Turn this into a class, and make channel a private variable.
// TODO: Replace console.log with channel log.
//  Inspiration: https://github.com/vscode-restructuredtext/vscode-restructuredtext/blob/460f9f37cdf048e4c30d2705ff9b89ebd03f535b/src/extension.ts
function loadSettings(platform) {
  const settingNodes = vscode.workspace.getConfiguration("platformSettings")
    .platforms[platform].nodes;
  const config = vscode.workspace.getConfiguration();

  console.log(`Loading settings for ${platform}.`);
  Object.keys(settingNodes).forEach((key) => {
    console.log(` - ${key}: ${settingNodes[key]}`);
    config.update(String(key), settingNodes[key], 1);
  });
}

function updateSettings() {
  const config = vscode.workspace.getConfiguration("platformSettings");

  let platform;
  if (os.platform() in config.platforms) platform = os.platform();
  if (os.hostname() in config.platforms) platform = os.hostname();
  if (String(eval(config.condition)) in config.platforms)
    platform = String(eval(config.condition));
  if (platform) {
    if (config.platforms[platform].inherits)
      loadSettings(config.platforms[platform].inherits);

    loadSettings(platform);
  }
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  channel.appendLine("Extension starting...");

  let refreshSettings = vscode.commands.registerCommand(
    "extension.refreshSettings",
    function () {
      updateSettings();
    }
  );

  if (vscode.workspace.getConfiguration("platformSettings").autoLoad)
    updateSettings();

  context.subscriptions.push(refreshSettings);
}
exports.activate = activate;

function deactivate() {}
module.exports = {
  activate,
  deactivate,
};
