import sys
from typing import List

class Solution:
    def findMinMoves(self, machines: List[int]) -> int:
        total = sum(machines)
        n = len(machines)
        if total % n != 0:
            return -1

        avg = total // n
        ans = 0
        balance = 0

        for m in machines:
            diff = m - avg
            balance += diff
            ans = max(ans, abs(balance), diff)

        return ans

def test():
    sol = Solution()
    assert sol.findMinMoves([1, 0, 5]) == 3, "test 1 failed"
    assert sol.findMinMoves([0, 3, 0]) == 2, "test 2 failed"
    assert sol.findMinMoves([0, 2, 0]) == -1, "test 3 failed"
    print("✓ super-washing-machines passed")

if __name__ == "__main__":
    test()
