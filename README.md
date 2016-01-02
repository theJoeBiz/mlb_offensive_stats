# MLB Offensive Stats

## Local Install
```
npm install
npm start
```

Application will be available at [http://localhost:8080](http://localhost:8080)

## Production Build
```
npm install
npm run build
```

`npm run build` will create a production build (minified) of the application code along with dependencies and output static files into the `dist` directory that can be run using any simple http server. (i.e. `python -m SimpleHTTPServer`). Below is a tree of the files produced.

```
dist
  |-- assets
    |-- css
      |-- main.css
    |-- js
      |-- main.js
  |-- index.html
```
