from collections import Counter

class Solution:
    def numTriplets(self, nums1: list[int], nums2: list[int]) -> int:
        def count_triplets(a, b):
            prod_counts = Counter()
            m = len(b)
            for j in range(m):
                for k in range(j + 1, m):
                    prod_counts[b[j] * b[k]] += 1
            return sum(prod_counts[x * x] for x in a)
        return count_triplets(nums1, nums2) + count_triplets(nums2, nums1)

def test():
    sol = Solution()
    assert sol.numTriplets([7,4], [5,2,8,9]) == 1, "test 1 failed"
    assert sol.numTriplets([1,1], [1,1,1]) == 9, "test 2 failed"
    assert sol.numTriplets([7,7,8,3], [1,2,9,7]) == 2, "test 3 failed"
    print("✓ number-of-ways-where-square-of-number-is-equal-to-product-of-two-numbers passed")

if __name__ == "__main__":
    test()
