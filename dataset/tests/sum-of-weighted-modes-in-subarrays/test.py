from collections import Counter
from typing import List

class Solution:
    def sumOfModes(self, nums: List[int], k: int) -> int:
        n = len(nums)
        ans = 0
        counts = Counter()
        for i in range(k):
            counts[nums[i]] += 1
        def get_mode() -> int:
            max_f = max(counts.values())
            return min(val for val, f in counts.items() if f == max_f)
        ans += get_mode()
        for i in range(k, n):
            counts[nums[i]] += 1
            counts[nums[i - k]] -= 1
            if counts[nums[i - k]] == 0:
                del counts[nums[i - k]]
            ans += get_mode()
        return ans

def run_tests():
    sol = Solution()
    assert sol.sumOfModes([1, 2, 2, 3], 3) == 4 # [1,2,2]->2, [2,2,3]->2, sum = 4
    assert sol.sumOfModes([5, 5, 5], 2) == 10 # [5,5]->5, [5,5]->5, sum = 10
    print("All tests passed for 3672.")

if __name__ == "__main__":
    run_tests()
