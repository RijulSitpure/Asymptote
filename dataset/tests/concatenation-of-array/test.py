class Solution:
    def getConcatenation(self, nums: list[int]) -> list[int]:
        return nums + nums

def test_get_concatenation():
    sol = Solution()
    assert sol.getConcatenation([1, 2, 1]) == [1, 2, 1, 1, 2, 1]
    assert sol.getConcatenation([1, 3, 2, 1]) == [1, 3, 2, 1, 1, 3, 2, 1]

