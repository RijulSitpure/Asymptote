import collections
from typing import List

class Solution:
    def longestPalindrome(self, words: List[str]) -> int:
        count = collections.Counter(words)
        ans = 0
        has_central = False
        for word, cnt in count.items():
            if word[0] == word[1]:
                ans += (cnt // 2) * 4
                if cnt % 2 == 1:
                    has_central = True
            elif word[0] < word[1]:
                rev = word[::-1]
                ans += min(cnt, count[rev]) * 4
        if has_central:
            ans += 2
        return ans
