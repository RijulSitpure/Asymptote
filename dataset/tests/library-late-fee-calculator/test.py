from typing import List

class Solution:
    def calculateLateFee(self, returnDate: List[int], dueDate: List[int]) -> int:
        rd, rm, ry = returnDate
        dd, dm, dy = dueDate
        if ry < dy:
            return 0
        if ry > dy:
            return 10000
        if rm < dm:
            return 0
        if rm > dm:
            return 500 * (rm - dm)
        if rd <= dd:
            return 0
        return 15 * (rd - dd)

def run_tests():
    sol = Solution()
    assert sol.calculateLateFee([9, 6, 2026], [6, 6, 2026]) == 45 # 3 days late -> 3 * 15 = 45
    assert sol.calculateLateFee([1, 1, 2026], [1, 1, 2026]) == 0 # on time -> 0
    assert sol.calculateLateFee([1, 7, 2026], [1, 5, 2026]) == 1000 # 2 months late -> 2 * 500 = 1000
    assert sol.calculateLateFee([1, 1, 2027], [1, 1, 2026]) == 10000 # different year
    print("All tests passed for 3687.")

if __name__ == "__main__":
    run_tests()
