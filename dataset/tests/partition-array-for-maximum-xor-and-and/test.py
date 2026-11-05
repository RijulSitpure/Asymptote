from typing import List

class Solution:
    def maxPartitionScore(self, nums: List[int]) -> int:
        n = len(nums)
        if n < 2:
            return 0
            
        best = 0
        # Subset enumeration for partition into non-empty sets A and B
        total_subsets = 1 << n
        for mask in range(1, total_subsets - 1):
            xor_a = 0
            and_b = -1
            for i in range(n):
                if mask & (1 << i):
                    xor_a ^= nums[i]
                else:
                    if and_b == -1:
                        and_b = nums[i]
                    else:
                        and_b &= nums[i]
            score = xor_a + and_b
            if score > best:
                best = score
        return best

def run_tests():
    s = Solution()
    res1 = s.maxPartitionScore([1, 2, 3]) # A={1,2} (xor 3), B={3} (and 3) -> 3+3=6
    assert res1 == 6, f"Expected 6, got {res1}"
    res2 = s.maxPartitionScore([4, 4]) # A={4}, B={4} -> 4 + 4 = 8
    assert res2 == 8, f"Expected 8, got {res2}"
    print("3630 partition-array-for-maximum-xor-and-and PASSED")

if __name__ == "__main__":
    run_tests()
