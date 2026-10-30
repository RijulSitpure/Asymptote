from typing import List

class Solution:
    def maximumEvenSplit(self, finalSum: int) -> List[int]:
        if finalSum % 2 != 0:
            return []
        res = []
        cur = 2
        while finalSum >= cur:
            res.append(cur)
            finalSum -= cur
            cur += 2
        res[-1] += finalSum
        return res
