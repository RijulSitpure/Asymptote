class Solution:
    def minSumOfLengths(self, arr: list[int], target: int) -> int:
        n = len(arr)
        pref_map = {0: -1}
        cur_sum = 0
        min_len = [float("inf")] * n
        best = float("inf")
        ans = float("inf")
        for i, x in enumerate(arr):
            cur_sum += x
            pref_map[cur_sum] = i
            need = cur_sum - target
            if need in pref_map:
                start_idx = pref_map[need]
                l = i - start_idx
                if start_idx >= 0 and min_len[start_idx] != float("inf"):
                    ans = min(ans, l + min_len[start_idx])
                best = min(best, l)
            min_len[i] = best
        return ans if ans != float("inf") else -1

def test():
    sol = Solution()
    assert sol.minSumOfLengths([3,2,2,4,3], 3) == 2, "test 1 failed"
    assert sol.minSumOfLengths([7,3,4,7], 7) == 2, "test 2 failed"
    assert sol.minSumOfLengths([4,3,2,6,2,3,4], 6) == -1, "test 3 failed"
    print("✓ find-two-non-overlapping-sub-arrays-each-with-target-sum passed")

if __name__ == "__main__":
    test()
