from typing import List

class Solution:
    def numSpecialEquivGroups(self, words: List[str]) -> int:
        signatures = {
            ("".join(sorted(w[0::2])), "".join(sorted(w[1::2])))
            for w in words
        }
        return len(signatures)

def test():
    sol = Solution()
    assert sol.numSpecialEquivGroups(["abcd", "cdab", "cbad", "xyzz", "zzxy", "zzyx"]) == 3, "test 1 failed"
    assert sol.numSpecialEquivGroups(["abc", "acb", "bac", "bca", "cab", "cba"]) == 3, "test 2 failed"
    print("✓ groups-of-special-equivalent-strings passed")

if __name__ == "__main__":
    test()
