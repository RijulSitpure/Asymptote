class Solution:
    def doesValidArrayExist(self, derived: list[int]) -> bool:
        import functools
        import operator
        return functools.reduce(operator.xor, derived) == 0
