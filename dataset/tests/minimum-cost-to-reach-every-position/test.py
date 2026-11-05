class Solution:
    def minCosts(self, cost: list[int]) -> list[int]:
        n = len(cost)
        ans = []
        cur_min = float('inf')
        for x in cost:
            if x < cur_min:
                cur_min = x
            ans.append(cur_min)
        return ans

def run_tests():
    s = Solution()
    assert s.minCosts([5, 3, 4, 1, 2]) == [5, 3, 3, 1, 1]
    print("All tests passed for minimum-cost-to-reach-every-position")

if __name__ == '__main__':
    run_tests()
