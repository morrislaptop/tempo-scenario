/* global angular */

angular
  .module('scenario')

  .config(['scenarioMockDataProvider', function (scenarioMockDataProvider) {
    scenarioMockDataProvider.setDefaultScenario('_default');
    /* jshint ignore:start */
    scenarioMockDataProvider.setMockData({
  "_default": [
    [
      {
        "httpMethod": "GET",
        "statusCode": 200,
        "response": {
          "_embedded": {
            "ApiProvider": [
              {
                "apiProviderId": "FreeAgent"
              },
              {
                "apiProviderId": "Xero"
              }
            ]
          },
          "_links": {
            "Single": {
              "rel": "Single",
              "href": "http://wongatech.github.io/tempo-scenario/Single",
              "method": "GET"
            },
            "Multiple": {
              "rel": "Multiple",
              "href": "http://wongatech.github.io/tempo-scenario/Multiple",
              "method": "GET"
            }
          }
        },
        "rel": "Single",
        "uri": "http://wongatech.github.io/tempo-scenario/Single"
      }
    ],
    [
      {
        "httpMethod": "GET",
        "statusCode": 204,
        "retry-after": 5,
        "rel": "Multiple",
        "uri": "http://wongatech.github.io/tempo-scenario/Multiple"
      },
      {
        "httpMethod": "GET",
        "statusCode": 200,
        "response": {
          "Authorisation": [
            {
              "authorisationId": "99d18af8",
              "provider": "Xero",
              "status": "HealthChecking"
            }
          ],
          "_links": {
            "Single": {
              "rel": "Single",
              "href": "http://wongatech.github.io/tempo-scenario/Single",
              "method": "GET"
            },
            "Multiple": {
              "rel": "Multiple",
              "href": "http://wongatech.github.io/tempo-scenario/Multiple",
              "method": "GET"
            }
          }
        },
        "rel": "Multiple",
        "uri": "http://wongatech.github.io/tempo-scenario/Multiple"
      },
      {
        "httpMethod": "GET",
        "statusCode": 200,
        "response": {
          "_embedded": {
            "Authorisation": [
              {
                "authorisationId": "a1e8ca6420fa",
                "provider": "Xero",
                "status": "Created"
              }
            ]
          },
          "_links": {
            "Single": {
              "rel": "Single",
              "href": "http://wongatech.github.io/tempo-scenario/Single",
              "method": "GET"
            },
            "Multiple": {
              "rel": "Multiple",
              "href": "http://wongatech.github.io/tempo-scenario/Multiple",
              "method": "GET"
            }
          }
        },
        "rel": "Multiple",
        "uri": "http://wongatech.github.io/tempo-scenario/Multiple"
      }
    ]
  ]
});
    /* jshint ignore:end */
  }]);
