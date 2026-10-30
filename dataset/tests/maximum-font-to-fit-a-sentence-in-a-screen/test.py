class MockFontInfo:
    def __init__(self, char_w, h):
        self.char_w = char_w
        self.h = h
    def getWidth(self, size, ch):
        return size * self.char_w
    def getHeight(self, size):
        return size * self.h

class Solution:
    def maxFont(self, text: str, w: int, h: int, fonts: list[int], fontInfo) -> int:
        def fits(size):
            if fontInfo.getHeight(size) > h: return False
            total_w = sum(fontInfo.getWidth(size, ch) for ch in text)
            return total_w <= w
        l, r = 0, len(fonts) - 1
        ans = -1
        while l <= r:
            mid = (l + r) // 2
            if fits(fonts[mid]):
                ans = fonts[mid]
                l = mid + 1
            else:
                r = mid - 1
        return ans

sol = Solution()
fi1 = MockFontInfo(1, 1)
assert sol.maxFont("helloworld", 80, 20, [6,8,10,12,14,16,18,24,36], fi1) == 8
fi2 = MockFontInfo(2, 3)
assert sol.maxFont("helloworld", 80, 20, [6,8,10,12,14,16,18,24,36], fi2) == -1
print("All tests passed successfully.")
