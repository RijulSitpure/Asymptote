from typing import List

class Solution:
    def maxBalancedShipments(self, weights: List[int]) -> int:
        count = 0
        current_max = -1
        for w in weights:
            if current_max == -1:
                current_max = w
            else:
                current_max = max(current_max, w)
                if w < current_max:
                    count += 1
                    current_max = -1
        return count

def run_tests():
    sol = Solution()
    assert sol.maxBalancedShipments([5, 3, 2, 6, 1]) == 2
    assert sol.maxBalancedShipments([1, 2, 3, 4]) == 0
    assert sol.maxBalancedShipments([4, 1, 3, 2]) == 2
    print("All tests passed for 3638.")

if __name__ == "__main__":
    run_tests()
