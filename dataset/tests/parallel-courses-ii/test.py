from itertools import combinations

class Solution:
    def minNumberOfSemesters(self, n: int, relations: list[list[int]], k: int) -> int:
        prereq = [0] * n
        for u, v in relations:
            prereq[v - 1] |= (1 << (u - 1))
        dp = [float("inf")] * (1 << n)
        dp[0] = 0
        for mask in range(1 << n):
            if dp[mask] == float("inf"):
                continue
            available = 0
            for i in range(n):
                if not (mask & (1 << i)) and (prereq[i] & mask) == prereq[i]:
                    available |= (1 << i)
            avail_courses = [i for i in range(n) if available & (1 << i)]
            if len(avail_courses) <= k:
                next_mask = mask | available
                dp[next_mask] = min(dp[next_mask], dp[mask] + 1)
            else:
                for comb in combinations(avail_courses, k):
                    next_mask = mask
                    for c in comb:
                        next_mask |= (1 << c)
                    dp[next_mask] = min(dp[next_mask], dp[mask] + 1)
        return dp[(1 << n) - 1]

def test():
    sol = Solution()
    assert sol.minNumberOfSemesters(4, [[2,1],[3,1],[1,4]], 2) == 3, "test 1 failed"
    assert sol.minNumberOfSemesters(5, [[2,1],[3,1],[4,1],[1,5]], 2) == 4, "test 2 failed"
    print("✓ parallel-courses-ii passed")

if __name__ == "__main__":
    test()
