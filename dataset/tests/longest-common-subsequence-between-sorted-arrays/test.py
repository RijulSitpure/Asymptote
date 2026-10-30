from collections import Counter

class Solution:
    def longestCommonSubsequence(self, arrays: list[list[int]]) -> list[int]:
        counts = Counter()
        for arr in arrays:
            counts.update(arr)
        n = len(arrays)
        return [x for x in sorted(counts) if counts[x] == n]

def test_longest_common_subseq():
    sol = Solution()
    assert sol.longestCommonSubsequence([[1,3,4],[1,4,7,9]]) == [1, 4]
    assert sol.longestCommonSubsequence([[2,3,6,8],[1,2,3,5,6,7,10],[2,3,4,6,9]]) == [2, 3, 6]

