class Solution:
    def subarraysWithMoreZerosThanOnes(self, nums: list[int]) -> int:
        mod = 10**9 + 7
        n = len(nums)
        offset = n + 1
        tree = [0] * (2 * n + 5)
        
        def query(idx: int) -> int:
            s = 0
            while idx > 0:
                s += tree[idx]
                idx -= idx & (-idx)
            return s
            
        def update(idx: int, val: int) -> None:
            while idx < len(tree):
                tree[idx] += val
                idx += idx & (-idx)
                
        update(offset, 1)
        curr_pref = 0
        ans = 0
        for x in nums:
            curr_pref += (1 if x == 1 else -1)
            ans = (ans + query(curr_pref + offset - 1)) % mod
            update(curr_pref + offset, 1)
        return ans
