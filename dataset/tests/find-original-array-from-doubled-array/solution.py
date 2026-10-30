from collections import Counter

class Solution:
    def findOriginalArray(self, changed: list[int]) -> list[int]:
        if len(changed) % 2 != 0:
            return []
        changed.sort()
        count = Counter(changed)
        res = []
        for x in changed:
            if count[x] == 0:
                continue
            if count[2 * x] == 0 or (x == 0 and count[0] < 2):
                return []
            res.append(x)
            count[x] -= 1
            count[2 * x] -= 1
        return res
