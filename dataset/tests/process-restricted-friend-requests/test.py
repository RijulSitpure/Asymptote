from solution import Solution

def run_tests():
    s = Solution()
    assert s.friendRequests(3, [[0, 1]], [[0, 2], [2, 1]]) == [True, False]
    assert s.friendRequests(3, [[0, 1]], [[1, 2], [0, 2]]) == [True, False]
    assert s.friendRequests(5, [[0, 1], [1, 2], [2, 3]], [[0, 4], [1, 2], [3, 1], [3, 4]]) == [True, False, True, False]
    print("All tests passed for process-restricted-friend-requests!")

if __name__ == "__main__":
    run_tests()
