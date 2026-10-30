from collections import Counter

class Solution:
    def digitCount(self, num: str) -> bool:
        counts = Counter(num)
        for i, ch in enumerate(num):
            if counts[str(i)] != int(ch):
                return False
        return True
