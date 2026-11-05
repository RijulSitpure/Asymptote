from typing import List

class Solution:
    def minSwaps(self, nums: List[int]) -> int:
        evens = [i for i, x in enumerate(nums) if x % 2 == 0]
        odds = [i for i, x in enumerate(nums) if x % 2 != 0]
        
        n = len(nums)
        if abs(len(evens) - len(odds)) > 1:
            return -1
            
        def calc_swaps(indices: List[int], start: int) -> int:
            return sum(abs(curr - (start + 2 * idx)) for idx, curr in enumerate(indices))

        if len(evens) > len(odds):
            return calc_swaps(evens, 0)
        elif len(odds) > len(evens):
            return calc_swaps(odds, 0)
        else:
            return min(calc_swaps(evens, 0), calc_swaps(evens, 1))

def run_tests():
    s = Solution()
    res1 = s.minSwaps([2, 4, 1, 3])
    assert res1 == 1, f"Expected 1, got {res1}" # swap 4 with 1 -> [2, 1, 4, 3] (1 swap)
    res2 = s.minSwaps([1, 3, 5])
    assert res2 == -1, f"Expected -1, got {res2}"
    print("3587 minimum-adjacent-swaps-to-alternate-parity PASSED")

if __name__ == "__main__":
    run_tests()
