class Solution:
    def minCost(self, colors: str, neededTime: list[int]) -> int:
        ans = 0
        cur_max = neededTime[0]
        cur_sum = neededTime[0]
        for i in range(1, len(colors)):
            if colors[i] == colors[i - 1]:
                cur_sum += neededTime[i]
                cur_max = max(cur_max, neededTime[i])
            else:
                ans += cur_sum - cur_max
                cur_sum = neededTime[i]
                cur_max = neededTime[i]
        ans += cur_sum - cur_max
        return ans

def test():
    sol = Solution()
    assert sol.minCost("abaac", [1,2,3,4,5]) == 3, "test 1 failed"
    assert sol.minCost("abc", [1,2,3]) == 0, "test 2 failed"
    assert sol.minCost("aabaa", [1,2,3,4,1]) == 2, "test 3 failed"
    print("✓ minimum-time-to-make-rope-colorful passed")

if __name__ == "__main__":
    test()
