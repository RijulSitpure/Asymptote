class Solution:
    def catchMaximumAmountofPeople(self, team: list[int], dist: int) -> int:
        n = len(team)
        i, j = 0, 0
        caught = 0
        while i < n and j < n:
            while i < n and team[i] != 1:
                i += 1
            while j < n and team[j] != 0:
                j += 1
            if i < n and j < n:
                if abs(i - j) <= dist:
                    caught += 1
                    i += 1
                    j += 1
                elif j < i - dist:
                    j += 1
                else:
                    i += 1
        return caught
