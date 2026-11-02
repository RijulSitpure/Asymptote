class Solution:
    def sumImbalanceNumbers(self, nums: list[int]) -> int:
        n = len(nums)
        total = 0
        for i in range(n):
            seen = set([nums[i]])
            cur = 0
            for j in range(i + 1, n):
                x = nums[j]
                if x not in seen:
                    has_prev = (x - 1) in seen
                    has_next = (x + 1) in seen
                    if has_prev and has_next:
                        cur -= 1
                    elif not has_prev and not has_next:
                        cur += 1
                    seen.add(x)
                total += cur
        return total
