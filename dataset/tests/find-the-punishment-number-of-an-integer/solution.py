class Solution:
    def punishmentNumber(self, n: int) -> int:
        def can_partition(s, start, target):
            if start == len(s):
                return target == 0
            val = 0
            for end in range(start, len(s)):
                val = val * 10 + int(s[end])
                if val > target:
                    break
                if can_partition(s, end + 1, target - val):
                    return True
            return False
        total = 0
        for i in range(1, n + 1):
            sq = i * i
            if can_partition(str(sq), 0, i):
                total += sq
        return total
