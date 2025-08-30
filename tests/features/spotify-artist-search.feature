Feature: Spotify Artist Search

  Scenario: Search for a valid artist
    Given I have a valid Spotify access token
    When I search for artist "Adele"
    Then the response status code should be 200
    And the response body should contain artist "Adele"

#   Scenario: Search for a non-existent artist
#     Given I have a valid Spotify access token
#     When I search for artist "ZZZZZZZZZZZZZZZZZZZ"
#     Then the response status code should be 200
#     And the response body should not contain any artists

  Scenario: Search with empty query
    Given I have a valid Spotify access token
    When I search for artist ""
    Then the response status code should be 400
