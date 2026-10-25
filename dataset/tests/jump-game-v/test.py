class Solution:
    def maxJumps(self, arr: list[int], d: int) -> int:
        n = len(arr)
        memo = {}
        def dp(i):
            if i in memo:
                return memo[i]
            ans = 1
            for step in [1, -1]:
                for dist in range(1, d + 1):
                    j = i + step * dist
                    if not (0 <= j < n) or arr[j] >= arr[i]:
                        break
                    ans = max(ans, 1 + dp(j))
            memo[i] = ans
            return ans
        return max(dp(i) for i in range(n))

def test():
    sol = Solution()
    assert sol.maxJumps([6,4,14,6,8,13,9,7,10,6,12], 2) == 4, "test 1 failed"
    assert sol.maxJumps([3,3,3,3,3], 3) == 1, "test 2 failed"
    assert sol.maxJumps([7,6,5,4,3,2,1], 1) == 7, "test 3 failed"
    print("✓ jump-game-v passed")

if __name__ == "__main__":
    test()
