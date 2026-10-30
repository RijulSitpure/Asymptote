class Solution:
    def countOperationsToEmptyArray(self, nums: list[int]) -> int:
        n = len(nums)
        bit = [0] * (n + 1)
        def update(idx, delta):
            while idx <= n:
                bit[idx] += delta
                idx += idx & (-idx)
        def query(idx):
            s = 0
            while idx > 0:
                s += bit[idx]
                idx -= idx & (-idx)
            return s
        for i in range(1, n + 1):
            update(i, 1)
        order = sorted(range(n), key=lambda i: nums[i])
        ans = 0
        curr = 1
        for target in order:
            t = target + 1
            if t >= curr:
                ans += query(t) - query(curr - 1)
            else:
                ans += query(n) - query(curr - 1) + query(t)
            update(t, -1)
            curr = t
        return ans
