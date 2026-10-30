from solution import Solution

def run_tests():
    s = Solution()
    assert s.maximumInvitations([2, 2, 1, 2]) == 3
    assert s.maximumInvitations([1, 2, 0]) == 3
    assert s.maximumInvitations([3, 0, 1, 4, 1]) == 4
    print("All tests passed for maximum-employees-to-be-invited-to-a-meeting!")

if __name__ == '__main__':
    run_tests()
