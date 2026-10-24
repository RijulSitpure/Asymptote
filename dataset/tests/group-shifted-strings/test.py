import sys
from typing import List

class Solution:
    def groupStrings(self, strings: List[str]) -> List[List[str]]:
        from collections import defaultdict
        groups = defaultdict(list)
        for s in strings:
            key = tuple((ord(s[i + 1]) - ord(s[i])) % 26 for i in range(len(s) - 1))
            groups[key].append(s)
        return list(groups.values())

def test():
    sol = Solution()
    res = sol.groupStrings(["abc","bcd","acef","xyz","az","ba","a","z"])
    sorted_res = sorted([sorted(g) for g in res])
    expected = sorted([["acef"],["a","z"],["abc","bcd","xyz"],["az","ba"]])
    assert sorted_res == expected, "test 1 failed"
    assert sol.groupStrings(["a"]) == [["a"]], "test 2 failed"
    print("✓ group-shifted-strings passed")

if __name__ == "__main__":
    test()
