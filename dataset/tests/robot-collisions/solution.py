class Solution:
    def survivedRobotsHealths(self, positions: list[int], healths: list[int], directions: str) -> list[int]:
        n = len(positions)
        robots = sorted(range(n), key=lambda i: positions[i])
        stack = []
        for i in robots:
            if directions[i] == 'R':
                stack.append(i)
            else:
                while stack and healths[i] > 0:
                    top = stack[-1]
                    if healths[top] < healths[i]:
                        healths[i] -= 1
                        healths[top] = 0
                        stack.pop()
                    elif healths[top] > healths[i]:
                        healths[top] -= 1
                        healths[i] = 0
                    else:
                        healths[top] = 0
                        healths[i] = 0
                        stack.pop()
        return [healths[i] for i in range(n) if healths[i] > 0]
