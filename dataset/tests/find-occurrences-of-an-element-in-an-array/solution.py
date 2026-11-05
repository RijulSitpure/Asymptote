class Solution:
    def occurrencesOfElement(self, nums: list[int], queries: list[int], x: int) -> list[int]:
        indices = [i for i, val in enumerate(nums) if val == x]
        m = len(indices)
        return [indices[q - 1] if q <= m else -1 for q in queries]