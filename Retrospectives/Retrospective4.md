# TEMPLATE FOR RETROSPECTIVE (Team 18)

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES

### Macro statistics

- Number of stories committed vs done: **3 vs 3**
- Total points committed vs done: **47 vs 47**
- Nr of hours planned vs spent: (as a team) **72h / 72h15m**

**Remember** a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

### Detailed statistics

| Story | # Tasks                                    | Points | Hours est. | Hours actual |
| ----- | ------------------------------------------ | :----: | ---------- | ------------ |
| _#0_  | Sprint Review |   -   | 1h30m | 1h30m |
| _#0_  | Daily Scrum 1 |   -   | 1h30m | 1h30m |
| _#0_  | Daily Scrum 2 |   -   | 1h30m | 1h30m |
| _#0_  | Daily Scrum 3 |   -   | 1h30m | 1h30m |
| _#0_  | Daily Scrum 4 |   -   | 1h30m | 1h30m |
| _#0_  | Git issue 1 - Map boarder fix |   -   | 30m | 30m |
| _#0_  | Git issue 2 - Make hut description required |   -   | 30m | 15m |
| _#0_  | Fix Sonar Cloud problems - be |   -   | 2h45m | 2h45m |
| _#0_  | Fix Sonar Cloud problems - fe |   -   | 3h15m | 3h15m |
| _#0_  | Insert photos on hike table - be |   -   | 1h15m | 1h15m |
| _#0_  | Insert photos on hike form - be |   -   | 1h30m | 1h30m |
| _#0_  | Insert photos on hut form - be |   -   | 1h30m | 1h30m |
| _#0_  | Insert photo into hikes table fe |   -   | 1h | 1h |
| _#0_  | Insert photo on hikes form fe |   -   | 2h30m | 2h30m |
| _#0_  | Insert photo on hut form fe |   -   | 30m | 30m |
| _#0_  | Manage DB |   -   | 5h | 5h30m |
| _#0_  | Update README.md |   -   | 1h30m | 1h30m |
| _#17_  | API start hike |   21   | 1h30m | 1h30m |
| _#17_  | Manage DB start hike |   21   | 3h | 2h30m |
| _#17_  | Start a hike fe |   21   | 12h15m | 12h45m |
| _#17_  | test fe |   21   | 45m | 45m |
| _#17_  | Code review be story 17 |   21   | 1h | 1h |
| _#17_  | Code review fe |   21   | 30m | 30m |
| _#17_  | Test be story 17 |   21   | 2h | 2h |
| _#18_  | API terminate hike |   21   | 3h | 3h |
| _#18_  | Terminate a hike fe |   21   | 1h | 1h30m |
| _#18_  | test fe |   21   | 45m | 30m |
| _#18_  | Test be story 18 |   21   | 2h | 2h |
| _#18_  | Code review be story 18 |   21   | 1h | 1h |
| _#18_  | Code review fe |   21   | 30m | 30m |
| _#34_  | API for the hikes' user table |   5   | 4h45m | 4h45m |
| _#34_  | Completed hikes table fe |   5   | 4h30m | 4h30m |
| _#34_  | test fe |   5   | 45m | 30m |
| _#34_  | Test be story 34 |   5   | 2h | 2h |
| _#34_  | Code review be story 34 |   5   | 1h | 1h |
| _#34_  | Code review fe |   5   | 30m | 30m |

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task (average, standard deviation):
  - estimate hours per task average: 2
  - estimate standard deviation: 2,1
  - actual hours per task average: 1,95
  - actual standard deviation: 
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent -1: -0,003

The total task estimation error ratio is negative because we spent 15 minutes more than the estimated time.

## QUALITY MEASURES

- Unit Testing:
  - Total hours estimated: 6h
  - Total hours spent: 6h
  - Nr of automated unit test cases: 105
  - Coverage (if available): 99%
- E2E testing:
  - Total hours estimated: 2h15m
  - Total hours spent: 1h45m
- Code review
  - Total hours estimated: 4h30m
  - Total hours spent: 4h30m
- Technical Debt management:
  - Total hours estimated : 6h
  - Total hours spent : 6h
  - Hours estimated for remediation by SonarQube: 6h
  - Hours estimated for remediation by SonarQube only for the selected and planned issues: 6h
  - Hours spent on remediation : 6h
  - debt ratio (as reported by SonarQube under "Measures-Maintainability"): 0.0%
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability ) :
    - Reliability : A
    - Maintainability : A
    - Security : A

### SonarQube strategy

The team has decided to use the same strategy of the previous sprint:

- Fixing all the critical security issues
- Fixing as many code smells as possible :

  Since this project has thousands of lines of code, we wanted to make sure that all the best practices were adopted, so that in the future, we will have clearer and easier code to maintain.
  Some code smells have also been marked as resolved, as we felt that the code written did not violate any best practice in terms of maintainability.

## ASSESSMENT

- What caused your errors in estimation (if any)?
  - /

- What lessons did you learn (both positive and negative) in this sprint?
  - We learned mostly how to manage the storage of pictures into a db, and how to retrieve them. We also learned that being a team means to be united and work for a common goal, even if it is not always easy.

  - There are no negative lessons to highlight.

- Which improvement goals set in the previous retrospective were you able to achieve?
  - We were able to achieve all the planned goals, set in the previous retrospective. As a matter of fact, after some sprints of "training", the team was able to increase the productivity, thus the number of stories committed and then completed without problems.

- Which ones you were not able to achieve? Why?
  - /

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
  - / (This was the last sprint)

- One thing you are proud of as a Team!!
  - In this semester, between the demo and the real project, our team always worked together, trying to get to the maximum result even if it was not so easy. In addition, the team always felt it was appropriate to prefer quality over quantity, working with precision and without haste. Eventually, each team member gave his or her contribution to make sure that the team constantly worked in a peaceful atmosphere.
