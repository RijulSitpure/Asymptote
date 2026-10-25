class Solution:
    def countGoodRectangles(self, rectangles: list[list[int]]) -> int:
        max_len = 0
        ans = 0
        for l, w in rectangles:
            side = min(l, w)
            if side > max_len:
                max_len = side
                ans = 1
            elif side == max_len:
                ans += 1
        return ans

def test():
    sol = Solution()
    assert sol.countGoodRectangles([[5,8],[3,9],[5,12],[16,5]]) == 3
    assert sol.countGoodRectangles([[2,3],[3,7],[4,3],[3,7]]) == 3

    print("✓ number-of-rectangles-that-can-form-the-largest-square passed")

if __name__ == '__main__':
    test()
