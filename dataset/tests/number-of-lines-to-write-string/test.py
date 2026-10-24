from typing import List

class Solution:
    def numberOfLines(self, widths: List[int], s: str) -> List[int]:
        lines = 1
        cur = 0
        for ch in s:
            w = widths[ord(ch) - ord('a')]
            if cur + w > 100:
                lines += 1
                cur = w
            else:
                cur += w
        return [lines, cur]

def test():
    sol = Solution()
    w1 = [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10]
    s1 = "abcdefghijklmnopqrstuvwxyz"
    assert sol.numberOfLines(w1, s1) == [3, 60], "test 1 failed"
    print("✓ number-of-lines-to-write-string passed")

if __name__ == "__main__":
    test()
