from typing import List

class Solution:
    def shortestToChar(self, s: str, c: str) -> List[int]:
        n = len(s)
        ans = [float('inf')] * n
        prev = -float('inf')
        for i in range(n):
            if s[i] == c:
                prev = i
            ans[i] = i - prev

        prev = float('inf')
        for i in range(n - 1, -1, -1):
            if s[i] == c:
                prev = i
            if prev - i < ans[i]:
                ans[i] = prev - i

        return ans

def test():
    sol = Solution()
    s1 = "loveleetcode"
    c1 = "e"
    assert sol.shortestToChar(s1, c1) == [3, 2, 1, 0, 1, 0, 0, 1, 2, 2, 1, 0], "test 1 failed"
    assert sol.shortestToChar("aaab", "b") == [3, 2, 1, 0], "test 2 failed"
    print("✓ shortest-distance-to-a-character passed")

if __name__ == "__main__":
    test()
