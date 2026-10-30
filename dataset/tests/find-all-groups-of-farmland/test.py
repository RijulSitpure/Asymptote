from solution import Solution

def run_tests():
    s = Solution()
    assert s.findFarmland([[1, 0, 0], [0, 1, 1], [0, 1, 1]]) == [[0, 0, 0, 0], [1, 1, 2, 2]]
    assert s.findFarmland([[1, 1], [1, 1]]) == [[0, 0, 1, 1]]
    assert s.findFarmland([[0]]) == []
    print("All tests passed for find-all-groups-of-farmland!")

if __name__ == "__main__":
    run_tests()
