from typing import List

class Solution:
    def numPairsDivisibleBy60(self, time: List[int]) -> int:
        count = [0] * 60
        res = 0
        for t in time:
            r = t % 60
            res += count[(60 - r) % 60]
            count[r] += 1
        return res

def test():
    sol = Solution()
    assert sol.numPairsDivisibleBy60([30,20,150,100,40]) == 3, "test 1 failed"
    assert sol.numPairsDivisibleBy60([60,60,60]) == 3, "test 2 failed"
    print("✓ pairs-of-songs-with-total-durations-divisible-by-60 passed")

if __name__ == "__main__":
    test()
