# All in a Single Night

## Part One
Every year, Santa manages to deliver all of his presents in a single night. This year, however, he has some new locations to visit. His elves have provided him the distances between every pair of locations. He can start and end at any two (different) locations he wants, but he must visit each location exactly once. What is the shortest distance he can travel to achieve this? For example, given the following distances:
- a - London to Dublin = 464
- b - London to Belfast = 518
- c - Dublin to Belfast = 141

The possible routes are therefore:
- a - Dublin -> London -> Belfast = 982
- b - London -> Dublin -> Belfast = 605
- c - London -> Belfast -> Dublin = 659
- d - Dublin -> Belfast -> London = 659
- e - Belfast -> Dublin -> London = 605
- f - Belfast -> London -> Dublin = 982

The shortest of these is London -> Dublin -> Belfast = 605, and so the answer is 605 in this example.
What is the distance of the shortest route?

## Part Two
The next year, just to show off, Santa decides to take the route with the longest distance instead. He can still start and end at any two (different) locations he wants, and he still must visit each location exactly once. For example, given the distances above, the longest route would be 982 via (for example) Dublin -> London -> Belfast.
What is the distance of the longest route?

### To begin, the input is in input.txt file.