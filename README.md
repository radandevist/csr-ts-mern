# mern-mono-ts

This is a MERN boilerplate which uses typescript and webpack.

server and client are packed together int a single repo.

The resulting react app will be client-side rendered.

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

* prerequisites:

  * Node
  * MongoDB

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

### :green_circle: about css/sass/css modules:

As a covention, css/sass/scss modules are prefixed by `.module.(css|sass|scss)` extension. and for typescript needs we must add a corresponding declaration file. i.e. : if i create a css module named `foo.module.css` thus a file named `foo.module.css.d.ts` have to be created also (same logic for sass and scss).

### :green_circle: creating a new page/view (client):

* create the react component of your new page

* insert a new `ClientRoute` instance in `clientRoutes` array inside `client/app/routes.ts`. This one is for react routing on the client-side.

* insert the new page's path (a string) in the `clientRoutes` array inside `server/routes/react/routes.ts`. This one is for the express routing on the server. Otherwise, express will not recognize your page's path and will throw you an error which will tell you it can't get that url.
Make sure that it matches the path you entered in `client/app/routes.ts` previously.

### :green_circle: connecting to mongodb:

You will need **MongoDB** installed on your machine for local development.

The mongo uri in our [config file](https://github.com/radandevist/csr-ts-mern/blob/master/config/config.ts) is best suited for [mongoDB Atlas](https://www.mongodb.com/cloud), to continue with this config you'll need to register an account there.

Althought, you're free to use any mongo host or any database management system also.

### :green_circle: about path aliases:

Path aliases avoid us to relative paths import burden; e.g. instead of doins such import `import { SomeModule } from "../../../some-module"` specify a path alias and just import the needed module from that alias: `import { SomeModule } from "@alias/some-module"`.
Actually, i've configured the following aliases:
 * "@client/*" pointing at `client/app/`
 * "@server/*" pointing at `server/`
 * "@config/*" pointing at `config/`
 * "@images/*" pointing at `client/app/assets/images/`

Under the hood we are making use of [tsconfig-paths-webpack-plugin](https://www.npmjs.com/package/tsconfig-paths-webpack-plugin) in order to make webpack understand our aliases.

You can specify aliases for paths in `tsconfig.json > compilerOptions > paths`.

### :green_circle: brief folder structure explanation:

* client: client codes
  * app: all react codes goes here
  * public: for static files not being used during build process, its content will be copied in `dist/client`.
* server: server codes
  * assets: static assets for our app that will be processed during build. (e.g. images, fonts, etc...)
* config: all config related to our app files are stored here

## Todo next:

* [x] Remove the unused dependencies.

* [x] Connection to database.

* [X] functionning CRUD Api routes with Authentication and role based authorizations

* [ ] add authors field in tutorials model

* [ ]  detailed authorization:
  * [ ]  only admin can delete user and update role
  * [ ]  admins can also create users
  * [ ]  moderators and admins can unpublish tutorial
  * [ ]  only user can update his email and username

* [ ]  generate api-docs using swagger-ui
* [ ]  revise all status code responses in the appe case
