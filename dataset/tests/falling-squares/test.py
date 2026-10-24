from typing import List

class Solution:
    def fallingSquares(self, positions: List[List[int]]) -> List[int]:
        intervals = []
        ans = []
        max_h = 0

        for left, size in positions:
            right = left + size
            base_h = 0
            for prev_l, prev_r, prev_h in intervals:
                if left < prev_r and right > prev_l:
                    base_h = max(base_h, prev_h)
            cur_h = base_h + size
            intervals.append((left, right, cur_h))
            max_h = max(max_h, cur_h)
            ans.append(max_h)

        return ans

def test():
    sol = Solution()
    assert sol.fallingSquares([[1, 2], [2, 3], [6, 1]]) == [2, 5, 5], "test 1 failed"
    assert sol.fallingSquares([[100, 100], [200, 100]]) == [100, 100], "test 2 failed"
    print("✓ falling-squares passed")

if __name__ == "__main__":
    test()
