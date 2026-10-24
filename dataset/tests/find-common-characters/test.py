from typing import List

class Solution:
    def commonChars(self, words: List[str]) -> List[str]:
        min_freq = [float('inf')] * 26
        for word in words:
            freq = [0] * 26
            for ch in word:
                freq[ord(ch) - ord('a')] += 1
            for i in range(26):
                min_freq[i] = min(min_freq[i], freq[i])
        res = []
        for i in range(26):
            if min_freq[i] != float('inf') and min_freq[i] > 0:
                res.extend([chr(ord('a') + i)] * min_freq[i])
        return res

def test():
    sol = Solution()
    assert sorted(sol.commonChars(["bella","label","roller"])) == sorted(["e","l","l"]), "test 1 failed"
    assert sorted(sol.commonChars(["cool","lock","cook"])) == sorted(["c","o"]), "test 2 failed"
    print("✓ find-common-characters passed")

if __name__ == "__main__":
    test()
