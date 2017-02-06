Progressive web app to help beginners learn to code javascript. Will have a bunch of courses that are cached using service worker so you can do the exercises while you're offline :)

##Setup Instructions
1. Run npm install
2. If you don't have gulp installed, do npm install -g gulp
3. Run gulp serve:dist to start the web server

##About the app
Based on the [Web Starter Kit](https://developers.google.com/web/tools/starter-kit/)
Uses:

1. Service workers for offline
2. React/Redux/React Router for app architecture
3. Web workers for sandboxing JS execution

## Contributing

Contributions, questions and comments are all welcome and encouraged. For code contributions to Web Starter Kit, please see our [Contribution guide](CONTRIBUTING.md) before submitting a pull request. [Website](https://developers.google.com/web/tools/starter-kit/) related issues should be filed on the [Web Fundamentals](https://github.com/google/WebFundamentals/issues/new) issue tracker.

## License

Apache 2.0  
Copyright 2015 Google Inc


## Todos

[] Move material-icons into vendor folder rather than relying on Google CDN
[] Update course data
[] Add tests
[] Improve webpack config so it doesn't take 10 seconds to transpile (split into vendor and app bundles)
