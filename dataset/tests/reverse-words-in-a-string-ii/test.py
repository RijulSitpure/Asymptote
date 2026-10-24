import sys
from typing import List

class Solution:
    def reverseWords(self, s: List[str]) -> None:
        def reverse(l: int, r: int):
            while l < r:
                s[l], s[r] = s[r], s[l]
                l += 1
                r -= 1

        reverse(0, len(s) - 1)
        start = 0
        for i in range(len(s) + 1):
            if i == len(s) or s[i] == " ":
                reverse(start, i - 1)
                start = i + 1

def test():
    sol = Solution()
    s1 = ["t","h","e"," ","s","k","y"," ","i","s"," ","b","l","u","e"]
    sol.reverseWords(s1)
    assert s1 == ["b","l","u","e"," ","i","s"," ","s","k","y"," ","t","h","e"], "test 1 failed"
    s2 = ["a"]
    sol.reverseWords(s2)
    assert s2 == ["a"], "test 2 failed"
    print("✓ reverse-words-in-a-string-ii passed")

if __name__ == "__main__":
    test()
