from typing import List

class Solution:
    def wordCount(self, startWords: List[str], targetWords: List[str]) -> int:
        start_set = set()
        for w in startWords:
            mask = 0
            for ch in w:
                mask |= 1 << (ord(ch) - ord('a'))
            start_set.add(mask)
        ans = 0
        for w in targetWords:
            mask = 0
            for ch in w:
                mask |= 1 << (ord(ch) - ord('a'))
            found = False
            for ch in w:
                sub_mask = mask ^ (1 << (ord(ch) - ord('a')))
                if sub_mask in start_set:
                    found = True
                    break
            if found:
                ans += 1
        return ans
