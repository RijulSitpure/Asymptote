class Solution:
    def gcdValues(self, nums: list[int], queries: list[int]) -> list[int]:
        from bisect import bisect_right
        
        max_val = max(nums)
        freq = [0] * (max_val + 1)
        for x in nums:
            freq[x] += 1
            
        # cnt[g] = number of pairs with GCD exactly equal to g
        cnt = [0] * (max_val + 1)
        for g in range(max_val, 0, -1):
            # Count multiples of g
            c = 0
            for mult in range(g, max_val + 1, g):
                c += freq[mult]
            total_pairs = c * (c - 1) // 2
            # Subtract pairs having larger multiple GCD
            for mult in range(2 * g, max_val + 1, g):
                total_pairs -= cnt[mult]
            cnt[g] = total_pairs
            
        # Prefix sum of pair counts
        pref = [0] * (max_val + 1)
        for g in range(1, max_val + 1):
            pref[g] = pref[g - 1] + cnt[g]
            
        ans = []
        for q in queries:
            ans.append(bisect_right(pref, q))
        return ans
