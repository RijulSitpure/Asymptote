class Solution:
    def maxCompatibilitySum(self, students: list[list[int]], mentors: list[list[int]]) -> int:
        m = len(students)
        scores = [[0] * m for _ in range(m)]
        for i in range(m):
            for j in range(m):
                scores[i][j] = sum(s == t for s, t in zip(students[i], mentors[j]))
                
        memo = {}
        def dp(s_idx, mask):
            if s_idx == m:
                return 0
            state = (s_idx, mask)
            if state in memo:
                return memo[state]
            best = 0
            for j in range(m):
                if not (mask & (1 << j)):
                    best = max(best, scores[s_idx][j] + dp(s_idx + 1, mask | (1 << j)))
            memo[state] = best
            return best
            
        return dp(0, 0)

def test_max_compatibility_sum():
    sol = Solution()
    assert sol.maxCompatibilitySum([[1,1,0],[1,0,1],[0,0,1]], [[1,0,0],[0,0,1],[1,1,0]]) == 8
    assert sol.maxCompatibilitySum([[0,0],[0,0],[0,0]], [[1,1],[1,1],[1,1]]) == 0

