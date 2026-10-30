from collections import Counter

class Solution:
    def kthDistinct(self, arr: list[str], k: int) -> str:
        counts = Counter(arr)
        distinct = [s for s in arr if counts[s] == 1]
        return distinct[k - 1] if k <= len(distinct) else ""
