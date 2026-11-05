from typing import List

class Solution:
    def earliestFinishTime(self, landStartTime: List[int], landDuration: List[int], waterStartTime: List[int], waterDuration: List[int]) -> int:
        min_l_finish = min(s + d for s, d in zip(landStartTime, landDuration))
        min_w_finish = min(s + d for s, d in zip(waterStartTime, waterDuration))
        best_lw = min(max(min_l_finish, ws) + wd for ws, wd in zip(waterStartTime, waterDuration))
        best_wl = min(max(min_w_finish, ls) + ld for ls, ld in zip(landStartTime, landDuration))
        return min(best_lw, best_wl)

def run_tests():
    sol = Solution()
    assert sol.earliestFinishTime([2, 5], [3, 2], [1, 6], [4, 1]) == 7
    assert sol.earliestFinishTime([1], [2], [1], [3]) == 6
    print("All tests passed for 3635.")

if __name__ == "__main__":
    run_tests()
