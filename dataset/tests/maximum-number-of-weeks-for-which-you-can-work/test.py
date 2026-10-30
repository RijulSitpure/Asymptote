class Solution:
    def numberOfWeeks(self, milestones: list[int]) -> int:
        total = sum(milestones)
        max_val = max(milestones)
        rest = total - max_val
        if max_val > rest + 1:
            return 2 * rest + 1
        return total

def test_number_of_weeks():
    sol = Solution()
    assert sol.numberOfWeeks([1, 2, 3]) == 6
    assert sol.numberOfWeeks([5, 2, 1]) == 7

