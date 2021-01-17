# Radan's MERN boilerplate #1

This is a MERN boilerplate which uses typescript and webpack.  The resulting app will be client-side rendered.

## features:

* Typescript
* webpack
* Sass/Scss support
* client-side rendering
* Client is served by our express server whether during development thanks to [webpack-dev-middleware](https://www.npmjs.com/package/webpack-dev-middleware) or in production
* Hot module replacement while developing on the client-side
* Server reload thanks to [nodemon-webpack-plugin](https://www.npmjs.com/package/nodemon-webpack-plugin) while developing on the server-side

## Usage:

* development:

  * uncomment the following lines of code in `server/index.ts`: 
    ```typescript
    import devBundle from "./devBundle"; //! uncomment this line

    devBundle.compile(app); //! uncomment this line
    ``` 

  * hit `npm run dev` to start developing.

* production
  
  * comment out the previously specified lines in `server/index.ts`: 
    ```typescript
    import devBundle from "./devBundle"; //! comment out this line

    devBundle.compile(app); //! comment out this line
    ``` 

  * build the bundles: by running `npm run build`

  * start the app with `npm run start`

  * open a browser at http://localhost:{port}; **port** is specified in `config/config.ts`