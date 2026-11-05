from typing import List

class Solution:
    def minSwaps(self, nums: List[int]) -> int:
        def digit_sum(x: int) -> int:
            return sum(int(d) for d in str(x))

        sorted_nums = sorted(nums, key=lambda x: (digit_sum(x), x))
        num_to_idx = {v: i for i, v in enumerate(sorted_nums)}
        seen = set()
        ans = 0
        for i in range(len(nums)):
            if i in seen or num_to_idx[nums[i]] == i:
                continue
            cycle_sz = 0
            j = i
            while j not in seen:
                seen.add(j)
                j = num_to_idx[nums[j]]
                cycle_sz += 1
            ans += max(cycle_sz - 1, 0)
        return ans

def run_tests():
    s = Solution()
    res = s.minSwaps([21, 12])
    assert res == 1, f"Expected 1, got {res}"
    print("3551 minimum-swaps-to-sort-by-digit-sum PASSED")

if __name__ == "__main__":
    run_tests()
