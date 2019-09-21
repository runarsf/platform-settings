# platform-settings

Set machine-specific and os-specific settings.

### Configuration example
Computer hostname has higher priority than OS. It *currently* doesn't support inheritance.
<br/>`settings.json`
```json
{
  "platformSettings.platforms": {
    "win32": {
      "editor.lineNumbers": "on"
    },
    "linux": {
      "editor.lineNumbers": "relative"
    },
    "mycomputer": {
      "editor.lineNumbers": "relative"
    }
  }
}
```

## Release Notes

See [CHANGELOG.md](https://github.com/runarsf/platform-settings/blob/master/CHANGELOG.md) for release notes.
