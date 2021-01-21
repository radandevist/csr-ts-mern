# Radan's MERN boilerplate #1 (client-side rendered)

This is a MERN boilerplate which uses typescript and webpack.  The resulting react app will be client-side rendered.

## features:

* Typescript
* webpack
* css/sass/scss support
* css/sass/scss modules support
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

## Resources used:

For implementing this boilerplate, I mainly took inspiration from the following sources:

* [mern-skeleton](https://github.com/shamahoque/mern-skeleton) by [Shama Hoque](https://github.com/shamahoque), and her book titled [Fullstack react projects](https://www.packtpub.com/web-development/full-stack-react-projects-second-edition)

* [mern-boilerplate](https://github.com/mohamedsamara/mern-boilerplate) by [
Mohamed Samara](https://github.com/mohamedsamara)

## Notes:

### about css/sass/css modules:

As a covention, css/sass/scss modules are prefixed by `.module.(css|sass|scss)` extension. and for typescript needs we must add a corresponding declaration file. i.e. : if i create a css module named `foo.module.css` thus a file named `foo.module.css.d.ts` have to be created also (same logic for sass and scss).

## Todo next:

[ ] Remove the unused dependencies.

[ ] Connection to databse.

[ ]  CRUD Api routes with Authentication and role based authorizations

[ ] React setup.

[ ] idk
