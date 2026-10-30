from solution import Solution

def run_tests():
    s = Solution()
    assert s.maximumAlternatingSubarraySum([3, -2, 5, 1]) == 10
    assert s.maximumAlternatingSubarraySum([1, 2, 3]) == 3
    assert s.maximumAlternatingSubarraySum([1]) == 1
    print("All tests passed for maximum-alternating-subarray-sum!")

if __name__ == "__main__":
    run_tests()
