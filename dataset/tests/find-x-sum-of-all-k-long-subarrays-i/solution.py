class Solution:
    def findXSum(self, nums: list[int], k: int, x: int) -> list[int]:
        from collections import Counter
        n = len(nums)
        ans = []
        for i in range(n - k + 1):
            sub = nums[i:i + k]
            counts = Counter(sub)
            sorted_items = sorted(counts.items(), key=lambda item: (item[1], item[0]), reverse=True)
            top_x = sorted_items[:x]
            ans.append(sum(val * cnt for val, cnt in top_x))
        return ans
