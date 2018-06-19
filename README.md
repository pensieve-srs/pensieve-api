# [Pensieve](https://www.pensieve.space/) &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

> "I use Pensieve. One simply siphons the excess thoughts from one's mind, pours them into the basin, and examines them at one's leisure. It becomes easier to spot patterns and links, you understand, when they are in this form."
>
> _Albus Dumbledore_

This project contains the backend for Pensieve providing the API for accessing data using NodeJS and MongoDB.

## Getting Started

### Dependencies

- Node 4+
- MongoDB
- SendGrid

### Installing

Clone this project and update path accordingly:

```sh
git clone git@github.com:pensieve-srs/pensieve-api.git
cd pensieve-api/
```

Install the dependencies:

```sh
yarn install
```

Copy the `.env.example` and update the variables to your settings:

```sh
cp .env.example .env.development.local
```

Start MongoDB instance:

```sh
mongod
```

Finally, start the server and watch for changes:

```sh
yarn run start:watch
```

Open up your browser and navigate to
[http://localhost:5000/docs/](http://localhost:5000/docs/). You should see a
Swagger API Docs interface.

## Contributing

### Roadmap

View the [Project Roadmap](https://github.com/orgs/pensieve-srs/projects/1) which includes upcoming features, reported bugs, and other updates to the project.

### Contributing Guide

All work happens directly on GitHub and contributions are welcomed!. [Submit a Pull Request](https://github.com/pensieve-srs/pensieve-api/pulls) to introduce new code changes. [Open an Issue](https://github.com/pensieve-srs/pensieve-api/issues) to request a new feature or report a bug. Interested in contributing? Contact [@nlaz](https://github.com/nlaz) for help to get started.

### License

Pensieve is [MIT licensed](./LICENSE.md).
