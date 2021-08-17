# File System Module Task

## Build wcat command

It is used to display or make a copy content of one or more files in the terminal. 

`General Syntax:`
```javascript
node wcat.js [options] [filepaths]
```

- option to remove big line break (-s)

- option to add line number to non empty lines (-b)

- option to add line numbers to all lines (-n) 

### Commands:

- node wcat.js filepath => displays content of the file in the terminal  ✔

- node wcat.js filepath1 filepath2 filepath3... => displays content of all files in the terminal in (contactinated form) in the given order. ✅

- node wcat.js -s filepath => convert big line breaks into a singular line break

- node wcat.js -n filepath => give numbering to all the lines 

- node wcat -b filepath => give numbering to non-empty lines

- We can mix and match the options.

### Edge cases:

- If file entered is not found then it gives file does not exist error. ✅

- -n and -b are 2 options which are mutually exclusive so if user types both of them together only the first enter option should work.

- -s and any or both -n and -b present then -s will be executed first and then -n and -b according second rule 