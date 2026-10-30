from typing import List

class Solution:
    def earliestFullBloom(self, plantTime: List[int], growTime: List[int]) -> int:
        indices = list(range(len(plantTime)))
        indices.sort(key=lambda i: growTime[i], reverse=True)
        curr_day = 0
        max_bloom = 0
        for i in indices:
            curr_day += plantTime[i]
            max_bloom = max(max_bloom, curr_day + growTime[i])
        return max_bloom
