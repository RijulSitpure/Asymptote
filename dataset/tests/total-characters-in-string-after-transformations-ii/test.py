from solution import Solution

def run_tests():
    s = Solution()
    nums1 = [1]*25 + [2]
    assert s.lengthAfterTransformations("abcyy", 2, nums1) == 7, "Example 1 failed"
    nums2 = [2] * 26
    assert s.lengthAfterTransformations("azbk", 1, nums2) == 8, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

