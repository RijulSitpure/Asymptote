class Solution:
    def checkDistances(self, s: str, distance: list[int]) -> bool:
        first = {}
        for i, ch in enumerate(s):
            if ch in first:
                expected = distance[ord(ch) - ord('a')]
                if i - first[ch] - 1 != expected:
                    return False
            else:
                first[ch] = i
        return True
