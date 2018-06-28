# Kudo-o-Matic Frontend

## Getting started

* Make sure you have fulfilled the [prerequisites](#prerequisites)
* Running `bin/setup` will hook you up with everything you need

## Development workflow

* While developing you can run a local server using `bin/maji start`. This will start a server on http://localhost:9090.
* If the `dist/` folder dissapears, please re-build using using `bin/maji build`.
* To run the app on a connected mobile device run `bin/maji run <platform>`.
* To build the native app using cordova, run `bin/maji build <platform>`.
* To run Javascript tests run `bin/maji test --watch`. This will start a Karma server with Phantomjs and will continuously watch your Javascript files and run tests on changes.
* To run integration specs run `bin/maji test --integration`.
* To run all tests run `bin/maji test`.

## Code formatting

Code is formatted by [Prettier](https://github.com/prettier/prettier).
The provided [Setup](#setup) script will install a git commit hook that will format your code.
Prettier can also be run manually using `yarn run prettier` or `yarn run prettier -- --write`.


## Packaging native apps / running on your device

* Make sure you have fulfilled the platform specific [prerequisites](#prerequisites) for the platform you're targeting.
* Running `bin/maji run` with the target platform as parameter, e.g. `bin/maji run ios` will launch the app on your connected iPhone, while `bin/maji run android` will launch the app on your connected Android device. Specifying `-e` on the `maji run` command will launch the app on the iOS Simulator or Android Emulator.

## Prerequisites

### General

* Node.js >=6 + NPM, for the build system
* Chrome v59.x or higher to run the tests headless. You might need install it from the [beta channel](https://www.google.com/chrome/browser/beta.html).
* Java 8 (or higher) to run the end-to-end tests (it powers the selenium server)

### iOS

* XCode
* iOS SDK

### Android

* Android SDK
* Android platform tools installed
* Android platform 10+.
* `android` and `adb` in your $PATH (add `path/to/android-sdk-macosx/tools` and `path/to/android-sdk-macosx/platform-tools` to your $PATH).

## Setup environment; Connection with API

### Development environment
* In `src/config/settings.development.json`, edit the `apiLocation` and `authorizationLocation` to the Staging-API.
* The API is secured by Doorkeeper. Doorkeeper needs besides the correct username and password a Client ID and Client Secret. These parameters have to be added by environment variables. The variables are `CLIENT_ID` and `CLIENT_SECRET`. To get the values please ask Managed Services.

### Production environment
* In `src/config/settings.production.json`, edit the `apiLocation` and `authorizationLocation` to the Production-API.
* The API is secured by Doorkeeper. Doorkeeper needs besides the correct username and password a Client ID and Client Secret. These parameters have to be added by environment variables. The variables are `CLIENT_ID` and `CLIENT_SECRET`. These variables are set with Jenkins Credentials.

### Test environment
* In `src/config/settings.development.json`, edit the `apiLocation` and `authorizationLocation` to the Staging-API.

## Mobile builds and automatic deployments

### Jenkins
At the moment we use Jenkins as our automation server for Continuous integration and deployments. It allows you to write a script with tasks to perform. These tasks run on a node, which is just a (remote) server. We've setup the jenkins server itself as our main node for non-mobile builds for now. 
For mobile builds our Mac mini comes into play. We have a Mac mini set-up in our office in Weert to do iOS and Android builds. Its set up in Jenkins as the `kabisas-mac-mini` node. 

#### Pipeline
This project has been set-up as a specific Jenkins project type called a _Pipeline_. This type of project allows you to define specific branches that trigger Jenkins on commit.
These commits will trigger the execution of your _Jenkinsfile_ in the project root.

#### Jenkinsfile
The Jenkinsfile is a file in the root of your Git project where you can define steps. The steps can be basic bash commands that are being run in the node's workspace.
It doesn't have to be called _Jenkinsfile_, the filename of the Jenkinsfile can be defined in the pipeline configuration in Jenkins.
In this project we named the file _Mobilebuild_ for the mobile ci builds. 

### Fastlane + HockeyApp
[Fastlane](https://github.com/fastlane/fastlane) is a tool to automate builds for iOS and Android. It can be installed with brew or as a ruby gem (in case you would like to run it locally).
We have included it in the Gemfile to make sure it will also be installed on the build agent. The `fastlane/Fastfile` is a script where the configuration for our Fastlane deployments is defined.
Further information about how Fastlane is setup and how it works can be found in the [Kabisa Guide repo](https://github.com/kabisa/kabisa-guide)

[HockeyApp](https://hockeyapp.net/) is a service to host and distribute your apps. It allows you to upload your app to their service using for example Fastlane. You can then install the app on your desired phone through their app or website. One of the main advantages of HockeyApp is that all the deployments and installations can be seen managed and tracked.

To request access as a new developer or tester, please contact Managed Services.

### Deploy a new version to HockeyApp
We've added a check in our Fastfile to only build and deploy the apps when a specific commit message is specified.
Make sure to include `BUILD_HOCKEY` in your commit to build and deploy to HockeyApp.
