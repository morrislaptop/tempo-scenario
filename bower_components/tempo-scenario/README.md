Tempo Scenario
==============

Tools for managing mock data scenarios in AngularJS applications.

Scenarios are collections of HTTP responses. Tempo Scenario allows you to
define these using JSON files and a manifest.

Tempo Scenario also allows you to switch between scenarios by adding
`?scenario=name` to the application URL.

Mock Format
-----------

Mocks are organised into directories representing the available resources and
files for various versions of the response.

    .
    ├── Account
    │   ├── loggedIn.json
    │   └── anonymous.json
    ├── MobilePhone
    │   ├── _default.json
    ├── Root
    │   └── _default.json
    └── mockResources.json

A resource file might look like this:

    {
      "httpMethod": "GET",
      "statusCode": 200,
      "headers": {
      	"X-Token": "32342343424234adfas"
      },
      "response": {
        "id": "foo"
      }
    }

You can also queue responses so that subsequent calls to the same rel can simulate a status workflow in the backend over time...

	[
	  {
	    "httpMethod": "GET",
	    "statusCode": 204,
	    "headers": {
	      "Retry-After": 2
	    },
	    "response": {}
	  },
	  {
	    "httpMethod": "GET",
	    "statusCode": 200,
	    "response": {
	      "type":"Redirecting",
	      "id":"4720b8e7-3384-406a-96fc-536e3baf7553",
	      "accountId":"3c099d9a-b7ec-4071-8f41-17201a5ee1ec",
	      "provider":"FreeAgent",
	      "status":"AuthorisationCreated"
	    }
	  }
	]

The manifest file `mockResources.json` defines the available scenarios and
describes which version of each resource should be used for each scenario.

    {
      "_default": [
        "Root/_default.json",
        "Account/anonymous.json",
        "MobilePhone/_default.json"
      ],
      "loggedIn": [
        "Account/loggedIn.json"
      ]
    }

All scenarios inherit resources defined in `_default` unless they provide an
override. Think of `_default` as the base class for scenarios.

The example above defines 2 scenarios `_default` and `loggedIn`. `loggedIn` has
the default versions of the `Root` and `MobilePhone` resources, but overrides
`Account`, using the version in `Account/loggedIn.json`.

Bower Component
---------------

Add Tempo Scenario to your project with Bower:

    bower install --save http://tempo-components.s3.amazonaws.com/tempo-scenario/dev/tempo-scenario-v0.2.0.tar

Or npm:

    npm install --save http://wonga-node-modules.s3.amazonaws.com/tempo-scenario/tempo-scenario-v0.2.0.tar.gz

Include `tempo-scenario.js` or `tempo-scenario.min.js` in your application:

    <script src="bower_components/tempo-scenario/js/tempo-scenario.min.js"></script>

Grunt Task
----------

Tempo Scenario defines a Grunt task called `scenarios`, which will compile
resources into an AngularJS module definition. Add the Grunt task to your build
and make the module a depedency in your app to enable scenarios.

Install the module using npm:

    npm install --save-dev QuickbridgeLtd/tempo-scenario

Add it to your Grunt configuration:

    // load the task
    grunt.loadNpmTasks('tempo-scenario');

    // configuration for scenarios
    scenarios: {
      myApp: {
        src: 'mocks',
        dest: 'build/scenarios.js',
        baseURL: 'http://myapi.com/',
        template: 'myTemplate.tpl' // optional
      }
    },

Once the task is run, `build/scenarios.js` will be generated containing all your
mock data. Include that in your app:

    <script src="build/scenarios.js"></script>

`scenarioMockDataProvider`
--------------------------

Tempo Scenario also declares a provider, `scenarioMockDataProvider`, which
allows you to set mock data by passing an object to the `setMockData` method.
