# TEMPLATE FOR RETROSPECTIVE (Team 18)

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES

### Macro statistics

- Number of stories committed vs done: **2 vs 2**
- Total points committed vs done: **13 vs 13**
- Nr of hours planned vs spent: (as a team) **72h / 72h**

**Remember** a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

### Detailed statistics

| Story | # Tasks                                    | Points | Hours est. | Hours actual |
| ----- | ------------------------------------------ | :----: | ---------- | ------------ |
| _#0_  | Sprint Review                              |   -    | 1h30m      | 1h30m        |
| _#0_  | Daily Scrum 1                              |   -    | 1h30m      | 1h30m        |
| _#0_  | Daily Scrum 2                              |   -    | 1h30m      | 1h30m        |
| _#0_  | Daily Scrum 3                              |   -    | 1h30m      | 1h30m        |
| _#0_  | Daily Scrum 4                              |   -    | 1h30m      | 1h30m        |
| _#0_  | Fix email Confirmation Front-End           |   -    | 1h         | 1h           |
| _#0_  | Fix email Confirmation Back-End            |   -    | 8h         | 8h           |
| _#0_  | Fix CSS range filter                       |   -    | 30m        | 30m          |
| _#0_  | Fix session API registration               |   -    | 30m        | 30m          |
| _#0_  | Modification to the Register API           |   -    | 15m        | 15m          |
| _#0_  | Fix GPS name                               |   -    | 30m        | 30m          |
| _#0_  | Git Issue icon of the hike table           |   -    | 15m        | 15m          |
| _#0_  | Front-End fix on SonarCloud                |   -    | 3h30m      | 3h30m        |
| _#0_  | Back-End fix on SonarCloud                 |   -    | 2h30m      | 2h30m        |
| _#0_  | Check code with SonarCloud                 |   -    | 30m        | 30m          |
| _#0_  | Range Filter with Map                      |   -    | 4h45m      | 4h45m        |
| _#0_  | Range Filter Back-End                      |   -    | 4h         | 4h           |
| _#0_  | Fix Range Filter                           |   -    | 45m        | 45m          |
| _#0_  | Validation Province on new Hike Form       |   -    | 4h45m      | 5h45m        |
| _#0_  | Change buttons on the navbar               |   -    | 1h         | 1h30m        |
| _#0_  | Municipalities Filter                      |   -    | 1h         | 1h           |
| _#0_  | Manage DB Data                             |   -    | 4h         | 4h           |
| _#5_  | Form to insert Hut Description (Front-End) |   5    | 9h         | 9h           |
| _#5_  | Hut Description API (Back-End)             |   5    | 1h         | 1h           |
| _#5_  | Test Back-End (Story 5)                    |   5    | 1h         | 1h           |
| _#5_  | Test Front-End (Story 5)                   |   5    | 30m        | 30m          |
| _#5_  | Manage DB                                  |   5    | 1h         | 1h           |
| _#5_  | Code Review Back-End(Story 5)              |   5    | 30m        | 30m          |
| _#5_  | Code Review Front-End(Story 5)             |   5    | 30m        | 30m          |
| _#6_  | Form to insert Parking Lot (Front-End)     |   8    | 8h30m      | 7h           |
| _#6_  | Parking Lot API (Back-End)                 |   8    | 1h         | 1h           |
| _#6_  | Test Back-End (Story 6)                    |   8    | 1h         | 1h           |
| _#6_  | Test Front-End (Story 6)                   |   8    | 30m        | 30m          |
| _#6_  | Manage DB                                  |   8    | 1h         | 1h           |
| _#6_  | Code Review Back-End(Story 6)              |   8    | 30m        | 30m          |
| _#6_  | Code Review Front-End(Story 6)             |   8    | 30m        | 30m          |

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task (average, standard deviation):
  - estimate hours per task average: 2,002
  - estimate standard deviation: 2,326
  - actual hours per task average: 2,002
  - actual standard deviation: 2,256
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent -1: 0

## QUALITY MEASURES

- Unit Testing:
  - Total hours estimated: 2h
  - Total hours spent: 2h
  - Nr of automated unit test cases: 87
  - Coverage (if available): 99%
- E2E testing:
  - Total hours estimated: 1h
  - Total hours spent: 1h
- Code review
  - Total hours estimated: 2h
  - Total hours spent: 2h
- Technical Debt management:
  - Total hours estimated : 6h30m
  - Total hours spent : 6h30m
  - Hours estimated for remediation by SonarQube: 6h
  - Hours estimated for remediation by SonarQube only for the selected and planned issues: 6h
  - Hours spent on remediation : 6h
  - debt ratio (as reported by SonarQube under "Measures-Maintainability"): 0.0%
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability ) :
    - Reliability : A
    - Maintainability : A
    - Security : A

### SonarQube strategy

The team has decided to use the following strategy:

- Fixing all the critical security issues
- Fixing as many code smells as possible :

  Since this project has thousands of lines of code, we wanted to make sure that all the best practices were adopted, so that in the future, we will have clearer and easier code to maintain.
  Some code smells have also been marked as resolved, as we felt that the code written did not violate any best practice in terms of maintainability.

## ASSESSMENT

- What caused your errors in estimation (if any)?

  - /

- What lessons did you learn (both positive and negative) in this sprint?

  - As a team, we have learned how to use SonarCloud in order to check the quality of our code, how to fix the issues that it reports, and the best practices that we should follow. We don't have any negative lessons to report.

- Which improvement goals set in the previous retrospective were you able to achieve?
  - We were able to achieve all the planned goals, set in the previous retrospective. As a matter of fact, by completing the tasks two days before the deadline, we were able to focus on the quality of our code, by fixing bugs and issues reported by SonarCloud and not.
- Which ones you were not able to achieve? Why?

  - /

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

  - Having reached the fourth sprint, we believe we have improved a lot in the management of the assigned time and in the knowledge of the technologies used on the project. For this reason we want to try to improve our productivity by trying to commit one more story than in the previous sprint.

- One thing you are proud of as a Team!!
  - As a team, we are proud of the fact that we have been able to complete all the tasks assigned to us, and that we have been able to fix all the issues reported by SonarCloud. We are also proud of the fact that we have been able to complete the project two days before the deadline, and that we have been able to focus on the quality of our code.
