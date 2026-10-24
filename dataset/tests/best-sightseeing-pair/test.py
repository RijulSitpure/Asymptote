from typing import List

class Solution:
    def maxScoreSightseeingPair(self, values: List[int]) -> int:
        max_i = values[0] + 0
        res = 0
        for j in range(1, len(values)):
            res = max(res, max_i + values[j] - j)
            max_i = max(max_i, values[j] + j)
        return res

def test():
    sol = Solution()
    assert sol.maxScoreSightseeingPair([8,1,5,2,6]) == 11, "test 1 failed"
    assert sol.maxScoreSightseeingPair([1,2]) == 2, "test 2 failed"
    print("✓ best-sightseeing-pair passed")

if __name__ == "__main__":
    test()
