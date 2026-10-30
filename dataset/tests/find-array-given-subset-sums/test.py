from solution import Solution

def get_subset_sums(arr):
    res = [0]
    for x in arr:
        res += [s + x for s in res]
    return sorted(res)

def run_tests():
    s = Solution()
    res1 = s.recoverArray(3, [-3, -2, -1, 0, 0, 1, 2, 3])
    assert get_subset_sums(res1) == sorted([-3, -2, -1, 0, 0, 1, 2, 3])
    res2 = s.recoverArray(2, [0, 0, 0, 0])
    assert get_subset_sums(res2) == [0, 0, 0, 0]
    res3 = s.recoverArray(4, [0, 0, 5, 5, 4, -1, 4, 9, 9, -1, 4, 3, 4, 8, 3, 8])
    assert get_subset_sums(res3) == sorted([0, 0, 5, 5, 4, -1, 4, 9, 9, -1, 4, 3, 4, 8, 3, 8])
    print("All tests passed for find-array-given-subset-sums!")

if __name__ == "__main__":
    run_tests()
