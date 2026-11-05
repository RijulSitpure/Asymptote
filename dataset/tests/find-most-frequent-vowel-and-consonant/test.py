from collections import Counter

class Solution:
    def maxFreqSum(self, s: str) -> int:
        vowels = set("aeiou")
        v_count = Counter()
        c_count = Counter()
        for ch in s:
            if ch in vowels:
                v_count[ch] += 1
            else:
                c_count[ch] += 1
        mv = max(v_count.values()) if v_count else 0
        mc = max(c_count.values()) if c_count else 0
        return mv + mc

def run_tests():
    s = Solution()
    res = s.maxFreqSum("hello")
    assert res == 3, f"Expected 3, got {res}"
    print("3541 find-most-frequent-vowel-and-consonant PASSED")

if __name__ == "__main__":
    run_tests()
