class Solution:
    def maxXorSubarray(self, nums: list[int], limit: int) -> int:
        all_pref = [0]
        pref = 0
        for x in nums:
            pref ^= x
            all_pref.append(pref)
        best = -1
        for i in range(len(all_pref)):
            for j in range(i + 1, len(all_pref)):
                val = all_pref[i] ^ all_pref[j]
                if val <= limit:
                    best = max(best, val)
        return best