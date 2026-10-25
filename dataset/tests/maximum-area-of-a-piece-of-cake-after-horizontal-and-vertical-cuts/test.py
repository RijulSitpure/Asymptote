class Solution:
    def maxArea(self, h: int, w: int, horizontalCuts: list[int], verticalCuts: list[int]) -> int:
        horizontalCuts.sort()
        verticalCuts.sort()
        h_cuts = [0] + horizontalCuts + [h]
        v_cuts = [0] + verticalCuts + [w]
        max_dh = max(h_cuts[i] - h_cuts[i - 1] for i in range(1, len(h_cuts)))
        max_dw = max(v_cuts[i] - v_cuts[i - 1] for i in range(1, len(v_cuts)))
        return (max_dh * max_dw) % (10**9 + 7)

def test():
    sol = Solution()
    assert sol.maxArea(5, 4, [1,2,4], [1,3]) == 4, "test 1 failed"
    assert sol.maxArea(5, 4, [3,1], [1]) == 6, "test 2 failed"
    assert sol.maxArea(5, 4, [3], [3]) == 9, "test 3 failed"
    print("✓ maximum-area-of-a-piece-of-cake-after-horizontal-and-vertical-cuts passed")

if __name__ == "__main__":
    test()
