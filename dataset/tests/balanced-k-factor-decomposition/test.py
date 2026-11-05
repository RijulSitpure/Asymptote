from typing import List

class Solution:
    def minFactorDifference(self, n: int, k: int) -> int:
        best_diff = [float('inf')]
        def dfs(rem: int, count: int, min_val: int, current_factors: List[int]):
            if count == 1:
                if rem >= min_val:
                    diff = max(max(current_factors, default=rem), rem) - min(min(current_factors, default=rem), rem)
                    best_diff[0] = min(best_diff[0], diff)
                return
            d = min_val
            while d * d <= rem:
                if rem % d == 0:
                    dfs(rem // d, count - 1, d, current_factors + [d])
                d += 1
        dfs(n, k, 1, [])
        return best_diff[0] if best_diff[0] != float('inf') else -1

def run_tests():
    sol = Solution()
    assert sol.minFactorDifference(24, 3) == 2 # 2 * 3 * 4 = 24, diff 4 - 2 = 2
    assert sol.minFactorDifference(100, 2) == 0 # 10 * 10 = 100, diff 0
    assert sol.minFactorDifference(12, 1) == 0 # 12, diff 0
    print("All tests passed for 3669.")

if __name__ == "__main__":
    run_tests()
