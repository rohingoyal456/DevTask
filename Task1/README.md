# File System Module Task

Three Basic Commands which relates to File System:
- Tree
- Organize
- Help

## Description of the Basic Commands:

- The **Tree** command will give the tree structure of the directory you have selected.

    `Syntax`
    ```javascript
        node filename.js tree "path"
    ```

- The **Organize** command will organize all the files present in the directory based on its extension. 

    ### What does Organize Function will do?

    It will create an **Organized Files** named folder and this further will divide into five folders **App**, **Media**, **Archives**, **Documents** and **Others**. Files then will be placed in these folders based on their extension.

    `Syntax`
    ```javascript
        node filename.js organize "path"
    ```

- The **Help** command will list all the commands.

    `Syntax`
    ```javascript
        node filename.js help
    ```


> To execute all these commands, you have to run the main.js file in the terminal and call these commands with the path of your choice