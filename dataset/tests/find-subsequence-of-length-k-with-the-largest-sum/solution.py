class Solution:
    def maxSubsequence(self, nums: list[int], k: int) -> list[int]:
        indexed = [(val, idx) for idx, val in enumerate(nums)]
        top_k = sorted(indexed, key=lambda x: x[0], reverse=True)[:k]
        top_k.sort(key=lambda x: x[1])
        return [val for val, idx in top_k]
