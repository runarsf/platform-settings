# platform-settings

[![Visual Studio Marketplace](https://vsmarketplacebadge.apphb.com/version-short/runarsf.platform-settings.svg?style=flat)](https://marketplace.visualstudio.com/items?itemName=runarsf.platform-settings) [![Visual Studio Marketplace](https://vsmarketplacebadge.apphb.com/installs-short/runarsf.platform-settings.svg?style=flat)](https://marketplace.visualstudio.com/items?itemName=runarsf.platform-settings)

Set machine-specific and os-specific settings.

### Commands

- "Refresh platform settings." (`extension.refreshSettings`)
  - Used to manually refresh platform settings (useful if `platformSettings.autoLoad` is set to `false`)

### Configuration example

To see which settings are being changed/removed, use the command palette (<kbd>ctrl</kbd>+<kbd>P</kbd>) and enter `>Output: Focus on Output View`. In the dropdown menu, select `platform-settings`.

Valid _platforms_ (ordered by priority):

1. Custom condition (e.g. `os.release()`)
2. Computer hostname (e.g. `myWinPC`)
3. Operating system (`linux`, `win32`, `darwin`, `freebsd`, `sunos`)
4. Inheritance (one level)

<br />Example 1 (`settings.json`):

```json
{
  "platformSettings.autoLoad": true,
  "platformSettings.platforms": {
    "win32": {
      "nodes": {
        "editor.lineNumbers": "on"
      }
    },
    "linux": {
      // WARNING: Only supports top-level settings, and is experimental. Use with caution.
      "remove": ["editor.lineNumbers"]
    }
  }
}
```

<br />Example 2 (`settings.json`):

```json
{
  "platformSettings.autoLoad": true,
  "platformSettings.condition": "os.release()",
  "platformSettings.platforms": {
    "default": {
      "nodes": {
        "editor.lineNumbers": "on"
      }
    },
    "win32": {
      "inherits": "default",
      "nodes": {
        "workspaceExplorer.workspaceStorageDirectory": "%userprofile%\\.vscode_workspaces",
        "editor.lineNumbers": "on"
      },
      "remove": ["platformSettings.placebo"]
    },
    "linux": {
      "inherits": "default",
      "nodes": {
        "workspaceExplorer.workspaceStorageDirectory": "~/.vscode_workspaces",
        "editor.lineNumbers": "relative"
      }
    },
    "darwin": {
      "inherits": "linux",
      "nodes": {
        "workspaceExplorer.workspaceStorageDirectory": "~/.vscode_workspaces",
        "editor.lineNumbers": "off"
      }
    },
    "myWinPC": {
      "inherits": "win32",
      "nodes": {
        "workspaceExplorer.workspaceStorageDirectory": "C:\\Users\\userame\\.vscode_workspaces"
      }
    },
    "10.0.18362": {
      "inherits": "myWinPC",
      "nodes": {
        "workspaceExplorer.workspaceStorageDirectory": "%userprofile%\\.vscode_workspaces"
      }
    }
  }
}
```

## Release Notes

See [CHANGELOG.md](https://github.com/runarsf/platform-settings/blob/master/CHANGELOG.md) for release notes.

## Known Issues & Limitations

- Inheritance isn't recursive, which means only one level of inheritance will be loaded.

<br />

> **platform-settings** © [runarsf](https://github.com/runarsf) · Author and maintainer.<br />
> Released under the [ISC](https://opensource.org/licenses/ISC) [License](https://github.com/runarsf/platform-settings/blob/master/LICENSE).
