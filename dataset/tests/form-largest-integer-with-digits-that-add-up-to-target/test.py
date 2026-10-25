class Solution:
    def largestNumber(self, cost: list[int], target: int) -> str:
        dp = [-1] * (target + 1)
        dp[0] = 0
        for c in range(1, target + 1):
            for digit_cost in cost:
                if c >= digit_cost and dp[c - digit_cost] != -1:
                    dp[c] = max(dp[c], dp[c - digit_cost] + 1)
        if dp[target] <= 0:
            return "0"
        res = []
        cur = target
        for d in range(9, 0, -1):
            c = cost[d - 1]
            while cur >= c and dp[cur - c] == dp[cur] - 1:
                res.append(str(d))
                cur -= c
        return "".join(res)

def test():
    sol = Solution()
    assert sol.largestNumber([4,3,2,5,6,7,2,5,5], 9) == "7772", "test 1 failed"
    assert sol.largestNumber([7,6,5,5,5,6,8,7,8], 12) == "85", "test 2 failed"
    assert sol.largestNumber([2,4,6,2,4,6,4,4,4], 5) == "0", "test 3 failed"
    print("✓ form-largest-integer-with-digits-that-add-up-to-target passed")

if __name__ == "__main__":
    test()
