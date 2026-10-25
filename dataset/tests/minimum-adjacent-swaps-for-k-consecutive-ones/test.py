class Solution:
    def minMoves(self, nums: list[int], k: int) -> int:
        p = [pos - i for i, pos in enumerate(i for i, x in enumerate(nums) if x == 1)]
        m = len(p)
        pref = [0] * (m + 1)
        for i in range(m):
            pref[i + 1] = pref[i] + p[i]
        ans = float('inf')
        radius = (k - 1) // 2
        for i in range(m - k + 1):
            mid = i + k // 2
            left_cost = p[mid] * (mid - i) - (pref[mid] - pref[i])
            right_cost = (pref[i + k] - pref[mid + 1]) - p[mid] * (i + k - 1 - mid)
            ans = min(ans, left_cost + right_cost)
        return ans

def test():
    sol = Solution()
    assert sol.minMoves([1,0,0,1,0,1], 2) == 1
    assert sol.minMoves([1,0,0,0,0,0,1,1], 3) == 5
    assert sol.minMoves([1,1,0,1], 2) == 0

    print("✓ minimum-adjacent-swaps-for-k-consecutive-ones passed")

if __name__ == '__main__':
    test()
