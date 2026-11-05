class Fenwick:
    def __init__(self, size: int):
        self.tree = [0] * (size + 2)
    def add(self, i: int, val: int):
        while i < len(self.tree):
            self.tree[i] += val
            i += i & (-i)
    def query(self, i: int) -> int:
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & (-i)
        return s

class Solution:
    def minThreshold(self, nums: list[int], k: int) -> int:
        n = len(nums)
        if n * (n - 1) // 2 < k:
            return -1
        min_v = min(nums)
        max_v = max(nums)
        
        def count_pairs(thresh: int) -> int:
            cnt = 0
            for i in range(n):
                for j in range(i + 1, n):
                    if nums[i] > nums[j] and nums[i] - nums[j] <= thresh:
                        cnt += 1
            return cnt

        l, r = 0, max_v - min_v
        ans = -1
        while l <= r:
            mid = (l + r) // 2
            if count_pairs(mid) >= k:
                ans = mid
                r = mid - 1
            else:
                l = mid + 1
        return ans

def run_tests():
    s = Solution()
    assert s.minThreshold([3, 1, 2], 2) == 2
    assert s.minThreshold([1, 2, 3], 1) == -1
    print("All tests passed for minimum-threshold-for-inversion-pairs-count")

if __name__ == '__main__':
    run_tests()
