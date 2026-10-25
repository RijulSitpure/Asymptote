class Solution:
    def minDistance(self, houses: list[int], k: int) -> int:
        houses.sort()
        n = len(houses)
        cost = [[0] * n for _ in range(n)]
        for i in range(n):
            for j in range(i, n):
                med = houses[(i + j) // 2]
                for x in range(i, j + 1):
                    cost[i][j] += abs(houses[x] - med)
        memo = {}
        def dp(idx, rem):
            if rem == 0 and idx == n:
                return 0
            if rem == 0 or idx == n:
                return float("inf")
            if (idx, rem) in memo:
                return memo[(idx, rem)]
            ans = float("inf")
            for j in range(idx, n):
                ans = min(ans, cost[idx][j] + dp(j + 1, rem - 1))
            memo[(idx, rem)] = ans
            return ans
        return dp(0, k)

def test():
    sol = Solution()
    assert sol.minDistance([1,4,8,10,20], 3) == 5, "test 1 failed"
    assert sol.minDistance([2,3,5,12,18], 2) == 9, "test 2 failed"
    assert sol.minDistance([7,4,6,1], 1) == 8, "test 3 failed"
    print("✓ allocate-mailboxes passed")

if __name__ == "__main__":
    test()
