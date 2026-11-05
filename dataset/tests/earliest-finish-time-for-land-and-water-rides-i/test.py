from typing import List

class Solution:
    def earliestFinishTime(self, landStartTime: List[int], landDuration: List[int], waterStartTime: List[int], waterDuration: List[int]) -> int:
        n_l = len(landStartTime)
        n_w = len(waterStartTime)
        best = float('inf')
        for i in range(n_l):
            ls, ld = landStartTime[i], landDuration[i]
            l_finish = ls + ld
            for j in range(n_w):
                ws, wd = waterStartTime[j], waterDuration[j]
                w_finish = ws + wd
                finish_lw = max(l_finish, ws) + wd
                finish_wl = max(w_finish, ls) + ld
                best = min(best, finish_lw, finish_wl)
        return best

def run_tests():
    sol = Solution()
    assert sol.earliestFinishTime([2, 5], [3, 2], [1, 6], [4, 1]) == 7
    assert sol.earliestFinishTime([1], [2], [1], [3]) == 6
    print("All tests passed for 3633.")

if __name__ == "__main__":
    run_tests()
