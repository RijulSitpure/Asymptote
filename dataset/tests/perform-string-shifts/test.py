class Solution:
    def stringShift(self, s: str, shift: list[list[int]]) -> str:
        n = len(s)
        net = sum(amt if d == 1 else -amt for d, amt in shift) % n
        return s[-net:] + s[:-net]

sol = Solution()
assert sol.stringShift("abc", [[0,1],[1,2]]) == "cab"
assert sol.stringShift("abcdefg", [[1,1],[1,1],[0,2],[1,3]]) == "efgabcd"
print("All tests passed successfully.")
