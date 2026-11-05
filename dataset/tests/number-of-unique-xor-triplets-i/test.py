class Solution:
    def uniqueXorTriplets(self, nums: list[int]) -> int:
        n = len(nums)
        if n < 3:
            return n
        ans = 1
        while ans <= n:
            ans <<= 1
        return ans

def run_tests():
    s = Solution()
    assert s.uniqueXorTriplets([1, 2, 3]) == 4
    assert s.uniqueXorTriplets([1, 2]) == 2
    print("All tests passed for number-of-unique-xor-triplets-i")

if __name__ == '__main__':
    run_tests()
