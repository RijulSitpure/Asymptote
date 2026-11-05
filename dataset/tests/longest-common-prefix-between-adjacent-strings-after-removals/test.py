from typing import List

class Solution:
    def longestCommonPrefix(self, words: List[str]) -> int:
        def common_prefix_len(a: str, b: str) -> int:
            length = 0
            limit = min(len(a), len(b))
            while length < limit and a[length] == b[length]:
                length += 1
            return length

        def get_candidates(s: str) -> List[str]:
            cands = [s]
            for idx in range(len(s)):
                cands.append(s[:idx] + s[idx + 1:])
            return cands

        max_lcp = 0
        for i in range(len(words) - 1):
            cands1 = get_candidates(words[i])
            cands2 = get_candidates(words[i + 1])
            for c1 in cands1:
                for c2 in cands2:
                    lcp = common_prefix_len(c1, c2)
                    if lcp > max_lcp:
                        max_lcp = lcp
        return max_lcp

def run_tests():
    s = Solution()
    res1 = s.longestCommonPrefix(["flower", "flow"])
    assert res1 == 4, f"Expected 4, got {res1}" # "flow" prefix
    res2 = s.longestCommonPrefix(["dog", "racecar"])
    assert res2 == 0, f"Expected 0, got {res2}"
    print("3598 longest-common-prefix-between-adjacent-strings-after-removals PASSED")

if __name__ == "__main__":
    run_tests()
