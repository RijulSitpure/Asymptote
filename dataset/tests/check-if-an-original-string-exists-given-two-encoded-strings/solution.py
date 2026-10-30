class Solution:
    def possiblyEquals(self, s1: str, s2: str) -> bool:
        memo = {}

        def dfs(i: int, j: int, diff: int) -> bool:
            if i == len(s1) and j == len(s2):
                return diff == 0
            state = (i, j, diff)
            if state in memo:
                return memo[state]

            if diff < 0 and i < len(s1) and not s1[i].isdigit():
                if dfs(i + 1, j, diff + 1):
                    memo[state] = True
                    return True
            elif diff > 0 and j < len(s2) and not s2[j].isdigit():
                if dfs(i, j + 1, diff - 1):
                    memo[state] = True
                    return True
            elif diff == 0 and i < len(s1) and j < len(s2) and not s1[i].isdigit() and not s2[j].isdigit():
                if s1[i] == s2[j] and dfs(i + 1, j + 1, 0):
                    memo[state] = True
                    return True

            if i < len(s1) and s1[i].isdigit():
                num = 0
                for k in range(i, min(i + 3, len(s1))):
                    if not s1[k].isdigit():
                        break
                    num = num * 10 + int(s1[k])
                    if dfs(k + 1, j, diff + num):
                        memo[state] = True
                        return True

            if j < len(s2) and s2[j].isdigit():
                num = 0
                for k in range(j, min(j + 3, len(s2))):
                    if not s2[k].isdigit():
                        break
                    num = num * 10 + int(s2[k])
                    if dfs(i, k + 1, diff - num):
                        memo[state] = True
                        return True

            memo[state] = False
            return False

        return dfs(0, 0, 0)
