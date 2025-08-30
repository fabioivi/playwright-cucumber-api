Feature: Spotify Authentication

  Scenario: Authenticate with valid credentials
    Given I have valid Spotify client credentials
    When I request an access token from Spotify
    Then the response status code should be 200
    And the response body should contain an access token

  Scenario: Authenticate with invalid credentials
    Given I have invalid Spotify client credentials
    When I request an access token from Spotify
    Then the response status code should be 400
    And the response body should contain an error message

