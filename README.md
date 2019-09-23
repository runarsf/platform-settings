# platform-settings

Set machine-specific and os-specific settings.

### Configuration example
Computer hostname has higher priority than OS.
<br/>`settings.json`
```json
{
  "platformSettings.autoLoad": true,
  "platformSettings.platforms": {
    "win32": {
      "nodes": {
        "workspaceExplorer.workspaceStorageDirectory": "%userprofile%\\.vscode_workspaces"
      }
    },
    "linux": {
      "nodes": {
        "workspaceExplorer.workspaceStorageDirectory": "~/.vscode_workspaces"
      }
    },
    "myWinPC": {
      "inherits": "win32",
      "nodes": {
        "workspaceExplorer.workspaceStorageDirectory": "C:\\Users\\userame\\.vscode_workspaces"
      }
    }
  }
}
```

## Release Notes

See [CHANGELOG.md](https://github.com/runarsf/platform-settings/blob/master/CHANGELOG.md) for release notes.
