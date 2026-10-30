from solution import Solution

def run_tests():
    s = Solution()
    assert s.findAllPeople(6, [[1, 2, 5], [2, 3, 8], [1, 5, 10]], 1) == [0, 1, 2, 3, 5]
    assert s.findAllPeople(4, [[3, 1, 3], [1, 2, 2], [0, 3, 3]], 3) == [0, 1, 3]
    assert s.findAllPeople(5, [[3, 4, 2], [1, 2, 10], [2, 3, 10]], 1) == [0, 1, 2, 3]
    print("All tests passed for find-all-people-with-secret!")

if __name__ == '__main__':
    run_tests()
