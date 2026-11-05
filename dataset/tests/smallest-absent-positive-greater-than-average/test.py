from typing import List

class Solution:
    def smallestAbsentPositive(self, nums: List[int]) -> int:
        avg = sum(nums) / len(nums)
        seen = set(nums)
        cand = max(1, int(avg) + 1)
        if cand <= avg:
            cand += 1
        while cand in seen:
            cand += 1
        return cand

def run_tests():
    sol = Solution()
    assert sol.smallestAbsentPositive([1, 2, 3]) == 4 # avg 2.0, cand 3 in seen -> 4
    assert sol.smallestAbsentPositive([2, 5]) == 4 # avg 3.5, cand 4 not in seen -> 4
    assert sol.smallestAbsentPositive([-2, -1]) == 1 # avg -1.5, cand 1 not in seen -> 1
    print("All tests passed for 3678.")

if __name__ == "__main__":
    run_tests()
