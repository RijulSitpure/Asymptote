from collections import Counter
import string

class Solution:
    def smallestPalindrome(self, s: str) -> str:
        cnt = Counter(s)
        half = []
        mid = ""
        for ch in string.ascii_lowercase:
            v = cnt[ch] // 2
            if v > 0:
                half.append(ch * v)
            if cnt[ch] % 2 == 1:
                mid = ch
        left = "".join(half)
        return left + mid + left[::-1]

def run_tests():
    s = Solution()
    assert s.smallestPalindrome("bba") == "bab"
    assert s.smallestPalindrome("dcbabcd") == "bcdadcb"
    print("All tests passed for smallest-palindromic-rearrangement-i")

if __name__ == '__main__':
    run_tests()
