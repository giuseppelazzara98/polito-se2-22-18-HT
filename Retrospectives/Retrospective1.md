TEMPLATE FOR RETROSPECTIVE (Team 18)
====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES

### Macro statistics

- Number of stories committed vs. done: __3 vs 2__
- Total points committed vs. done: __29 vs 21__
- Nr of hours planned vs. spent (as a team): __72h / 74h 50m__

  We needed 2h 50m more than the planned hours to help who needed help and to fix some code bugs.

**Remember** a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

### Detailed statistics

| Story  | # Tasks                         | Points | Hours est. | Hours actual |
| ------ | ------------------------------- | ------ | ---------- | ------------ |
| _#0_ | Sprint Review                   |        | 1h 30m     | 1h 30m       |
| _#0_ | Sprint Planning                 |        | 15h        | 15h          |
| _#0_ | Frontend setup                  |        | 30m        | 30m          |
| _#0_ | Backend setup                   |        | 30m        | 30m          |
| _#0_ | DB setup                        |        | 2h         | 2h           |
| _#0_ | Navbar                          |        | 1h         | 2h           |
| _#0_ | Retrospective document          |        | 2h         | 1h 45m       |
| _#0_ | Daily scrum                     |        | 6h         | 5h 45m       |
| _#1_ | List of hikes                   |        | 6h         | 7h           |
| _#1_ | Filters fe                      |        | 3h 30m     | 6h           |
| _#1_ | Filters API                     |        | 6h         | 6h           |
| _#1_ | Test fe                         |        | 2h 30m     | 2h 15m       |
| _#1_ | Test API                        |        | 4h         | 4h 30m       |
| _#1_ | Code review fe                  |        | 30m        | 30m          |
| _#1_ | Code review be                  |        | 30m        | 30m          |
| _#2_ | Form description fe             |        | 2h         | 5h 30m       |
| _#2_ | Login                           |        | 1h 30m     | 1h 30m       |
| _#2_ | Sass for new hike form          |        | 3h         | 3h           |
| _#2_ | Form description be             |        | 2h         | 2h 20m       |
| _#2_ | Test fe                         |        | 2h         | 2h           |
| _#2_ | Test API                        |        | 2h         | 2h 30m       |
| _#2_ | Code review fe                  |        | 30m        | 30m          |
| _#2_ | Code review be                  |        | 30m        | 30m          |

- Hours per task average, standard deviation (estimate and actual)
  - estimate hours per task average: 2.83
  - estimate standard deviation: 3.12
  - actual hours per task average: 3.20
  - actual standard deviation: 3.24
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1: -0,116

The total task estimation error ratio is negative because the number of hours spent is greater than the number of hours estimated.

## QUALITY MEASURES

- Unit Testing:
  - Total hours estimated: 6h
  - Total hours spent: 7h
  - Nr of automated unit test cases: 34
  - Coverage (if available): 99%

The actual coverage reported in unitTestResult.txt is less than 99% because there were some functions related to the story 3 (not delivered) that were not tested, but actually, all the functions related to the stories 1 and 2 have been tested with a 99% of coverage.

- E2E testing:
  - Total hours estimated: 4h 30m
  - Total hours spent: 4h 15m

- Code review (front-end and back-end)
  - Total hours estimated: 2h
  - Total hours spent: 2h

## ASSESSMENT

- **What caused your errors in estimation (if any)?**

  - We underestimated the time needed to implement the hike table and the time needed to implement the form to add a new hike. We thought also that some code bugs would be easier to fix than they actually were.

  - We would have used less time without inserting into the list of tasks the time needed to do the sprint planning (that took 2h 30h for each member) and the retrospective.

- **What lessons did you learn (both positive and negative) in this sprint?**

   - We learned that we should have estimated better the time needed to implement each story. Trying to deliver as many stories as possible is useless because we have to fix some bugs and help other team members. For this reason, next time, we will try to commit less stories allocating more time to each one.

   - We are a team of 6 people and we worked together and with cohesion to deliver the best possible result. 

- **Which improvement goals set in the previous retrospective were you able to achieve?**

  - We were able to achieve almost all of the planned objectives set in the previous retrospective. We were able to improve the coordination between the team members but we still have to improve the task estimation in terms of time.

- **Which ones you were not able to achieve? Why?**

  - /

- **Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)**

  - **Better estimation**: we will try to estimate better the time needed to implement each story, committing less stories for the next sprints.

- **One thing you are proud of as a Team!!**

  - We are proud of the fact that togheter we have been able to help each other and have also been able to be more cohesive and organized among difficulties.