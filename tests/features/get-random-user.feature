Feature: Get Random User

  Scenario: Get random user with gender female
    Given I send a GET request to the randomuser endpoint:
    When the response status code should be 200
    Then the response body should contain gender "female"

  Scenario: Get random user with gender male
    Given I send a GET request to the randomuser endpoint:
    When the response status code should be 200
    Then the response body should contain gender "male"