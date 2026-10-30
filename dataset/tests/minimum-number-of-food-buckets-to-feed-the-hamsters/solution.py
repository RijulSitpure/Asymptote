class Solution:
    def minimumBuckets(self, hamsters: str) -> int:
        n = len(hamsters)
        ans = 0
        last_bucket = -2

        for i, ch in enumerate(hamsters):
            if ch == 'H':
                if last_bucket == i - 1:
                    continue
                if i + 1 < n and hamsters[i + 1] == '.':
                    ans += 1
                    last_bucket = i + 1
                elif i - 1 >= 0 and hamsters[i - 1] == '.':
                    ans += 1
                    last_bucket = i - 1
                else:
                    return -1

        return ans
