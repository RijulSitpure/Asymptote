from typing import List

class Solution:
    def minTotalTime(self, forward: List[int], backward: List[int], queries: List[int]) -> int:
        n = len(forward)
        sum_b = sum(backward)
        ans = 0
        pos = 0
        prefixF = [0] * (n + 1)
        prefixB = [0] * (n + 1)
        for i in range(n):
            prefixF[i + 1] = prefixF[i] + forward[i]
            prefixB[i] = (0 if i == 0 else prefixB[i - 1]) + backward[i]

        for q in queries:
            r = (prefixF[n] if q < pos else 0) + prefixF[q] - prefixF[pos]
            l = (sum_b if q > pos else 0) + prefixB[pos] - prefixB[q]
            ans += min(l, r)
            pos = q
        return ans

def run_tests():
    s = Solution()
    res = s.minTotalTime([1, 2, 3], [3, 2, 1], [1, 2])
    assert res == 3, f"Expected 3, got {res}"
    print("3540 minimum-time-to-visit-all-houses PASSED")

if __name__ == "__main__":
    run_tests()
