Feature: Spotify Authentication

  Scenario: Authenticate with valid credentials
    Given I have valid Spotify client credentials
    When I request an access token from Spotify
    Then the response status code should be 200
    And the response body should contain an access token
