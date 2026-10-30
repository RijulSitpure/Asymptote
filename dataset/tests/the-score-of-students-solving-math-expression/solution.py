class Solution:
    def scoreOfStudents(self, s: str, answers: list[int]) -> int:
        correct = eval(s)
        nums = [int(s[i]) for i in range(0, len(s), 2)]
        ops = [s[i] for i in range(1, len(s), 2)]
        n = len(nums)
        dp = [[set() for _ in range(n)] for _ in range(n)]
        for i in range(n):
            dp[i][i].add(nums[i])
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                for k in range(i, j):
                    op = ops[k]
                    for left in dp[i][k]:
                        for right in dp[k + 1][j]:
                            val = left * right if op == '*' else left + right
                            if val <= 1000:
                                dp[i][j].add(val)
        possible = dp[0][n - 1]
        score = 0
        for ans in answers:
            if ans == correct:
                score += 5
            elif ans in possible:
                score += 2
        return score
