from typing import List

class Solution:
    def numMovesStonesII(self, stones: List[int]) -> List[int]:
        stones.sort()
        n = len(stones)
        max_moves = max(stones[n - 1] - stones[1] + 1 - (n - 1), stones[n - 2] - stones[0] + 1 - (n - 1))

        min_moves = n
        j = 0
        for i in range(n):
            while j < n and stones[j] - stones[i] + 1 <= n:
                j += 1
            count = j - i
            if count == n - 1 and stones[j - 1] - stones[i] + 1 == n - 1:
                min_moves = min(min_moves, 2)
            else:
                min_moves = min(min_moves, n - count)
        return [min_moves, max_moves]

def test():
    sol = Solution()
    assert sol.numMovesStonesII([7,4,9]) == [1, 2], "test 1 failed"
    assert sol.numMovesStonesII([6,5,4,3,10]) == [2, 3], "test 2 failed"
    print("✓ moving-stones-until-consecutive-ii passed")

if __name__ == "__main__":
    test()
