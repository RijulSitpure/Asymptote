from typing import List

class Solution:
    def maxTotal(self, values: List[int], limits: List[int], k: int) -> int:
        items = sorted(zip(values, limits), key=lambda x: -x[0])
        total = 0
        used = 0
        for val, lim in items:
            if used < k and val > 0:
                total += val
                used += 1
        return total

def run_tests():
    sol = Solution()
    assert sol.maxTotal([5, 4, 3, 2, 1], [1, 1, 1, 1, 1], 3) == 12
    assert sol.maxTotal([10, -2, 5], [1, 1, 1], 2) == 15
    print("All tests passed for 3645.")

if __name__ == "__main__":
    run_tests()
