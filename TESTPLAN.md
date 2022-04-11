# E2E testing

    -	to ensure that the implementation is working correctly as expected — no bugs!
    -	to ensure that the implementation is working as specified according to the requirements specification
    -	to prevent regressions between code merges and releases

    Test priorities:
        -	Basic positive tests
        -	Extended positive testing with optional parameters
        -	Negative testing with valid input
        -	Negative testing with invalid input
        -	Security, authorization, and permission tests(optional or separate tests)

## API testing

- Sunny cases:

  - Verify correct HTTP status code
  - Verify response payload
  - Verify basic performance sanity

- Rainy day:

  1. Get request without authorization
  2. Get request with invalid authorization
  3. Get request with invalid user rights
  4. Get request for non-existing realty
  5. Get request without request id
  6. Post request without authorization
  7. Post request with invalid authorization
  8. Post request with invalid user rights
  9. Post request with invalid body
  10. Post request with validation error
  11. Post request with empty body(should return 500 http code)
  12. Update request without authorization
  13. Update request with invalid authorization
  14. Update request with invalid user rights
  15. Update request for non-existing realty
  16. Update request with invalid body
  17. Update request with validation error
  18. Update request with empty body(should return 500 http code)
  19. Delete request without authorization
  20. Delete request with invalid authorization
  21. Delete request with invalid user rights
  22. Delete a realty which is not in DRAFT state
  23. Delete request for non-existing realty
  24. Call non-existing method: e.g. POST for /realties endpoint
  25. Call non-existing endpoint: e.g. POST /nonExisitingRealties

- Extended rainy day:
  - Syntax validation tests (at least for some fields), e.g:
  - Too long string (e.g. “FINLAND” for countryCode which only allows Alpha-2 strings)
  - Invalid format (e.g. “111” to realtyIdwith UUID requirements)

## UI-testing

- Happy path: reality and check saved information: create, update

- Extended: with optional parameters and correct fields are visible/invisible

- Rainy day:

  1.  Try to open realty page without loggin with straight url
  2.  Try to open realty page with straight url with incorrect user rights
  3.  Try to open non-existing realty page with straight url
  4.  Try to create new realty with straight url without loggin
  5.  Try to create new realty with straight url without user rights
  6.  Try to create new realty with missing mandatory information
  7.  Try to create new realty with invalid information
  8.  Try to modify realty without user rights with straight url
  9.  Try to modify realty with missing mandatory information
  10. Try to modify realty with invalid information

## For manual testing until its possible to automate

Image handling:

    1.	Try to add extremely large images
    2.	Try to add non supported type of images
    3.	Change image orders etc and verify that changes are saved
    4.	Verify that there is listed only realtors who has user rights to customer/office

## Other considerations

Selected browsers: -

Limited resolutions: -

## Test cases

### _Example test case_: customer wants a new offer with a different car

1. Log in as a salesperson
2. Start a new sales
3. Do a TRAFI search for trade-in vehicle with (any valid) license plate
4. Fill the information needed and save vehicle
5. Move to the customer tab and pick any existing customer
6. Move to the selling vehicle tab and pick any vehicle
7. Move to the offer tab and set some relevant values for the offer
8. Print offer: check the selling vehicle is the one you chose in the pdf
9. Go to the events page and select the offer you made
10. Change the selling vehicle to a different one
11. Set values for the new offer if needed and print the offer
12. Selling vehicle should be changed in the offer pdf

R = needs refactoring if its exists

### Sales process

Some possible cases(\*)

| Case                                                                                            | Exists | Notes |
| ----------------------------------------------------------------------------------------------- | ------ | ----- |
| 1, 2 or none trade-in vehicles                                                                  |        |       |
| 1 or 2 customers                                                                                |        |       |
| New customer, returning customer, customer info found from TRAFI                                |        |       |
| TRAFI search of the customers trade-in vehicle: previous search found, new search               |        |       |
| Manually enter customers trade-in vehicle                                                       |        |       |
| Financing calculator                                                                            |        |       |
| Financing plan, cash payment (no financing plan): different credit providers                    |        |       |
| Custom accessories, additional information                                                      |        |       |
| Old debt of the trade-in vehicle (if larger than the value of a trade-in vehicle)               |        |       |
| Trade-in vehicle's refund price is larger than the price of the selling vehicle                 |        |       |
| Customer test drives multiple cars                                                              |        |       |
| Start sales process from different places (warehouse, start sales process -button)              | R      |       |
| Required fields -> notify the salesperson (user)                                                |        |       |
| Start test drive from sales pipeline                                                            |        |       |
| Print evaluation template                                                                       |        |       |
| Customer wants to add/remove the trade-in vehicle                                               |        |       |
| Customer wants to change the financing plan                                                     |        |       |
| Customer wants to change the selling vehicle                                                    |        |       |
| Quick search with whatever vague hint salesperson happens to remember about the car or customer |        |       |

Concern: thousands of different cases.

E2E: Couple tests that goes through the whole sales pipeline. Checks that the basic functionalities are functioning.

Manual: tests with different cases(\*) that a salesperson could come up.

### Purchase process \*\*\* check cases to be correct (just copied from sales process)

Some possible cases(\*)

| Case                                                                                            | Exists | Notes |
| ----------------------------------------------------------------------------------------------- | ------ | ----- |
| 1, 2 or none trade-in vehicles                                                                  |        |       |
| 1 or 2 customers                                                                                |        |       |
| New customer, returning customer, customer info found from TRAFI                                |        |       |
| TRAFI search of the customers trade-in vehicle: previous search found, new search               |        |       |
| Manually enter customers trade-in vehicle                                                       |        |       |
| Financing calculator                                                                            |        |       |
| Financing plan, cash payment (no financing plan): different credit providers                    |        |       |
| Custom accessories, additional information                                                      |        |       |
| Old debt of the trade-in vehicle (if larger than the value of a trade-in vehicle)               |        |       |
| Trade-in vehicle's refund price is larger than the price of the selling vehicle                 |        |       |
| Customer test drives multiple cars                                                              |        |       |
| Start sales process from different places (warehouse, start sales process -button)              |        |       |
| Required fields -> notify the salesperson (user)                                                |        |       |
| Start test drive from sales pipeline                                                            |        |       |
| Print evaluation template                                                                       |        |       |
| Customer wants to add/remove the trade-in vehicle                                               |        |       |
| Customer wants to change the financing plan                                                     |        |       |
| Customer wants to change the selling vehicle                                                    |        |       |
| Quick search with whatever vague hint salesperson happens to remember about the car or customer |        |       |

Concern: thousands of different cases.

E2E: Couple tests that goes through the whole sales pipeline. Checks that the basic functionalities are functioning.

Manual: tests with different cases(\*) that a salesperson could come up.

### Searches

| Case                | Exists | Notes |
| ------------------- | ------ | ----- |
| Warehouse search    | R      |       |
| Event search        |        |       |
| Customer search     | R      |       |
| User search (admin) |        |       |
| Quick search        |        |       |

E2E: Check the searches function correctly e.g. write something and expect a result that
is defined in fixtures
Manually: Define test cases where you create a new (car, offer, user) and for them

### Customer

| Case                         | Exists | Notes |
| ---------------------------- | ------ | ----- |
| Show a customer              |        |       |
| Create a new customer        | R      |       |
| Edit customer                |        |       |
| Print customer information   |        |       |
| Change marketing permissions |        |       |

E2E: create a new customer, set marketing details and print customer information.
Validate the data in pdf.

Manual: Crete a new customer during the sales process and check the customer has been
created with the right details.

### Test drive

| Case                                      | Exists | Notes |
| ----------------------------------------- | ------ | ----- |
| New customer, returning customer          |        |       |
| Validate that pdf has correct information |        |       |
| Should be marked as "in a test drive"     | R      |       |

E2E: Go to warehouse, pick a vehicle, print(download) a test drive permission, validate the pdf, check
the vehicle has set to "in a test drive" and set back to "ready for a test drive".

Manual:
1)Start test drive from the sales pipeline (customer comes back from the test drive)
2)Set a vehicle to "in a test drive". Log in with a different salesperson (same organization, like a colleague) and
check the test drive status of the vehicle is right.

A potential problem: it must not be possible to make an offer by another salesperson when a vehicle is set to
'in a test drive'. What if a salesperson forgets to mark the car? How to represent the analogy of "taking a look
of your cars" and tell immediately what you got at the moment.

### Contract

| Case                                | Exists | Notes |
| ----------------------------------- | ------ | ----- |
| Correct false information if needed |        |       |
| Pdf has the right data              |        |       |
| Prints it without problems          |        |       |

E2E: Part of the test which tests a whole sales pipeline.

Manual: Create a sales contract with false data and figure out how to correct it.

### Admin

| Case                          | Exists | Notes |
| ----------------------------- | ------ | ----- |
| Role changes work as intended |        |       |
| Create new users, new office  |        |       |

E2E: Log in with an admin user and check all the admin features are visible.

Manual: Log in as a salesperson, check the role is correct(right features and data) and log out. Then log in as an
admin, change the role of the salesperson(to manager e.g.) and log out. Log in with the user which role was changed
from salesperson to manager and check the role is correct.

A potential problem: What if a salesperson changes offices (e.g. moves from Helsinki to Tampere).

### Dashboard

| Case                                           | Exists | Notes |
| ---------------------------------------------- | ------ | ----- |
| Lists cars and shows the oldest warehouse item |        |       |
| Something else when new features are added?    |        |       |

E2E: TODO

Manual: start a sales process from the dashboard.

### Warehouse

| Case                                              | Exists | Notes |
| ------------------------------------------------- | ------ | ----- |
| Create a new vehicle                              | R      |       |
| Delete vehicle(?)                                 |        |       |
| Add pictures for the vehicle, rotate the pictures |        |       |

E2E: Check that 1) a vehicle is present(added in fixtures), 2) editing a warehouse item is possible and 3) vehicle
pictures page is visible.

Manual: 1) Part of a test where new offer is created from the warehouse page. 2)
Test vehicle images: add, rotate, delete and move pictures to their right places. Add video links.

### Log in

| Case                                        | Exists | Notes |
| ------------------------------------------- | ------ | ----- |
| Log in is successful with right credentials | R      |       |
| Log out                                     | R      |       |
| Log in does not work with false credentials |        |       |
| Users log in with right role                |        |       |
| Changing password works                     |        |       |

E2E: Log in with different users with different roles. Check the role is correct.

Manual: Resetting of a password works i.e. email with a reset link has been sent.

### Navigation

| Case                               | Exists | Notes |
| ---------------------------------- | ------ | ----- |
| Navigate to customers page         | R      |       |
| Navigate to warehouse page         | R      |       |
| Navigate to sales pipeline         | R      |       |
| Navigate to front page / dashboard | R      |       |

E2E: Above.

Manual: if not working properly it will come up in other tests.

### Errors and mistakes

| Case                                                                            | Exists | Notes                |
| ------------------------------------------------------------------------------- | ------ | -------------------- |
| Api errors (informative error messages)                                         | (r)    | To some extent exist |
| Validation errors                                                               | (r)    | To some extent exist |
| User (salesperson) does different mistakes in the system - how to correct those |        |                      |

E2E: Check that errors messages are shown.

Test: different cases where user ends up doing something not intended.
