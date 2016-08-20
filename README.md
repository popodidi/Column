# Column
Column is a GUI of SQLite database mainly based on [Electron](https://electron.atom.io), [React](https://facebook.github.io/react), [Semantic UI](https://semantic-ui.com) and [knex](https://knexjs.org) libraries.

## Download
### 0.2.1
- [Mac OS](https://goo.gl/1vvZDW)

## Features
- [x] Open multiple databases
- [x] Run SQL command
- [x] List all tables

## Contributing / Development
Column is still under development.
The ultimate goal is to be a GUI of SQLite database with funtionalities of viewing and manipulating tables and rows of SQLite databases, beautiful user interface and great user experience.

Feel free to open issues or, even better, pull requests to get this project forward.

### TODO
- [ ] Modal alert when SQL errors occur
- [ ] create table GUI
- [ ] add row GUI
- [ ] create database GUI

### git clone & npm install
```bash
$ git clone https://github.com/popodidi/Column
$ npm install
```

### Semantic UI

```bash
$ npm install gulp -g
$ cd semantic
$ gulp build
```

### Electron rebuild
```bash
$ npm run rebuild
```

### Debugging
```bash
$ npm run dev-server
$ npm run dev-electron
```

### Export Application
```bash
$ npm run pro-webpack
$ npm run pro-electron # check the output
$ npm run build-for-mac
```