from collections import Counter

class Solution:
    def areOccurrencesEqual(self, s: str) -> bool:
        counts = Counter(s)
        return len(set(counts.values())) == 1

def test_are_occurrences_equal():
    sol = Solution()
    assert sol.areOccurrencesEqual("abacbc") == True
    assert sol.areOccurrencesEqual("aaabb") == False

