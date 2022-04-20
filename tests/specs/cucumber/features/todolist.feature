Feature: Using ToDo List

    Using the demo ToDo list.

    Scenario: Add a line in the ToDo
        Given I open ToDo list page
        When I type a new element
        And I press enter
        Then I should see the new element at the end of the list
