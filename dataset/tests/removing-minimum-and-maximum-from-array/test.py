from solution import Solution

def run_tests():
    s = Solution()
    assert s.minimumDeletions([2, 10, 7, 5, 4, 1, 8, 6]) == 5
    assert s.minimumDeletions([0, -4, 19, 1, 8, -2, -3, 5]) == 3
    assert s.minimumDeletions([101]) == 1
    print("All tests passed for removing-minimum-and-maximum-from-array!")

if __name__ == '__main__':
    run_tests()
