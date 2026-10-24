from typing import List

class Solution:
    def minKBitFlips(self, nums: List[int], k: int) -> int:
        n = len(nums)
        flips = 0
        cur_flipped = 0
        for i in range(n):
            if i >= k and nums[i - k] == 2:
                cur_flipped ^= 1
            if (nums[i] ^ cur_flipped) == 0:
                if i + k > n:
                    return -1
                nums[i] = 2
                cur_flipped ^= 1
                flips += 1
        return flips

def test():
    sol = Solution()
    assert sol.minKBitFlips([0,1,0], 1) == 2, "test 1 failed"
    assert sol.minKBitFlips([1,1,0], 2) == -1, "test 2 failed"
    assert sol.minKBitFlips([0,0,0,1,0,1,1,0], 3) == 3, "test 3 failed"
    print("✓ minimum-number-of-k-consecutive-bit-flips passed")

if __name__ == "__main__":
    test()
