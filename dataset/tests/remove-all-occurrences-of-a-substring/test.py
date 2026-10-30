class Solution:
    def removeOccurrences(self, s: str, part: str) -> str:
        stack = []
        m = len(part)
        part_list = list(part)
        for ch in s:
            stack.append(ch)
            if len(stack) >= m and stack[-m:] == part_list:
                del stack[-m:]
        return "".join(stack)

def test_remove_occurrences():
    sol = Solution()
    assert sol.removeOccurrences("daabcbaabcbc", "abc") == "dab"
    assert sol.removeOccurrences("axxxxyyyyb", "xy") == "ab"

