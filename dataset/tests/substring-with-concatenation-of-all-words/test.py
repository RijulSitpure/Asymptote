import sys
from typing import List
from collections import Counter

class Solution:
    def findSubstring(self, s: str, words: List[str]) -> List[int]:
        if not s or not words:
            return []
        word_len = len(words[0])
        word_count = len(words)
        total_len = word_len * word_count
        word_freq = Counter(words)
        res = []

        for i in range(word_len):
            left = i
            curr_map = Counter()
            count = 0
            for j in range(i, len(s) - word_len + 1, word_len):
                sub = s[j:j + word_len]
                if sub in word_freq:
                    curr_map[sub] += 1
                    count += 1
                    while curr_map[sub] > word_freq[sub]:
                        curr_map[s[left:left + word_len]] -= 1
                        count -= 1
                        left += word_len
                    if count == word_count:
                        res.append(left)
                else:
                    curr_map.clear()
                    count = 0
                    left = j + word_len
        return res

def test():
    sol = Solution()
    r1 = sol.findSubstring("barfoothefoobarman", ["foo", "bar"])
    assert sorted(r1) == [0, 9], "test 1 failed"
    r2 = sol.findSubstring("wordgoodgoodgoodbestword", ["word","good","best","word"])
    assert r2 == [], "test 2 failed"
    print("✓ substring-with-concatenation-of-all-words passed")

if __name__ == "__main__":
    test()
