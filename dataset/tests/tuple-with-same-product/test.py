from collections import defaultdict

class Solution:
    def tupleSameProduct(self, nums: list[int]) -> int:
        freq = defaultdict(int)
        n = len(nums)
        for i in range(n):
            for j in range(i + 1, n):
                freq[nums[i] * nums[j]] += 1
        ans = 0
        for count in freq.values():
            if count > 1:
                ans += 8 * (count * (count - 1) // 2)
        return ans

def test():
    sol = Solution()
    assert sol.tupleSameProduct([2,3,4,6]) == 8
    assert sol.tupleSameProduct([1,2,4,5,10]) == 16

    print("✓ tuple-with-same-product passed")

if __name__ == '__main__':
    test()
