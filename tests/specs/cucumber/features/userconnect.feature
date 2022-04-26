Feature: Connect as a user from backoffice

    Connect as a user from backoffice

    Scenario: Connect as a partner user from Backoffice
        Given I am connected as an admin to the backoffice
        And I am on the page who list the partners
        When I click on the link on the ID of the first partner of the list
        And I click on the link 'Users' in the navbar
        And I click on the orange icon to connect as a user for the first user of the list
        Then I should have a new tab open on the Dashboard of this user
