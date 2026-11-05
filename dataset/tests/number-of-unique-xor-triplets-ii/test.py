class Solution:
    def uniqueXorTriplets(self, nums: list[int]) -> int:
        n = len(nums)
        pairs = set()
        for i in range(n):
            for j in range(i, n):
                pairs.add(nums[i] ^ nums[j])
        triplets = set()
        for p in pairs:
            for x in nums:
                triplets.add(p ^ x)
        return len(triplets)

def run_tests():
    s = Solution()
    assert s.uniqueXorTriplets([1, 2, 3]) == 4
    assert s.uniqueXorTriplets([2, 2, 2]) == 1
    print("All tests passed for number-of-unique-xor-triplets-ii")

if __name__ == '__main__':
    run_tests()
