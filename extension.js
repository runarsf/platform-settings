"use strict";
/**
 * @todo Prepare for release 1.0.0.
 *   - [ ] Changelog.
 *   - [x] Bump version number.
 * @todo Add icon.
 * @todo Improve development docs - semantic versioning, debugging, updating.
 * @todo Improve contributed settings.
 * @todo Convert to typescript.
 * @todo Turn Settings into a class, make channel a private variable, and add loadSettings as a method of the class.
 * COMPLETE: Accept pull requests from dependabot.
 * COMPLETE: Add `remove` option under platformSettings.[platform].
 * COMPLETE: Replace console.log with channel log.
 * COMPLETE: Don't import entire library, only what is needed. { workspace }
 */
const { workspace, window, commands } = require("vscode");
const os = require("os");
let channel = window.createOutputChannel("platform-settings");

function loadSettings(platform) {
  const settingNodes = workspace.getConfiguration("platformSettings").platforms[
    platform
  ].nodes;
  const removeNodes = workspace.getConfiguration("platformSettings").platforms[
    platform
  ].remove;
  const config = workspace.getConfiguration();

  channel.appendLine(`Loading settings for ${platform}.`);
  Object.keys(settingNodes).forEach((key) => {
    channel.appendLine(`  + ${key}: ${settingNodes[key]}`);
    config.update(String(key), settingNodes[key], 1);
  });
  // TODO: Support more than top-level nodes.
  if (removeNodes) {
    removeNodes.forEach((item, _) => {
      channel.appendLine(`  - ${item}`);
      config.update(String(item), undefined, 1);
    });
  }
}

function updateSettings() {
  const config = workspace.getConfiguration("platformSettings");

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

  let refreshSettings = commands.registerCommand(
    "extension.refreshSettings",
    function () {
      updateSettings();
    }
  );

  if (workspace.getConfiguration("platformSettings").autoLoad) {
    channel.appendLine(
      "platformSettings.autoLoad enabled, loading settings..."
    );
    updateSettings();
  }

  context.subscriptions.push(refreshSettings);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
