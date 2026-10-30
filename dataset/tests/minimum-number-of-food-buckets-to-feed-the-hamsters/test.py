from solution import Solution

def run_tests():
    s = Solution()
    assert s.minimumBuckets("H..H") == 2
    assert s.minimumBuckets(".H.H.") == 1
    assert s.minimumBuckets(".HHH.") == -1
    print("All tests passed for minimum-number-of-food-buckets-to-feed-the-hamsters!")

if __name__ == '__main__':
    run_tests()
