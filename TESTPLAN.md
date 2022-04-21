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


