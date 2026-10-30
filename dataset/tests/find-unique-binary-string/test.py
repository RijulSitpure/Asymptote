from solution import Solution

def run_tests():
    s = Solution()
    res1 = s.findDifferentBinaryString(["01", "10"])
    assert res1 not in ["01", "10"] and len(res1) == 2
    res2 = s.findDifferentBinaryString(["00", "01"])
    assert res2 not in ["00", "01"] and len(res2) == 2
    res3 = s.findDifferentBinaryString(["111", "011", "001"])
    assert res3 not in ["111", "011", "001"] and len(res3) == 3
    print("All tests passed for find-unique-binary-string!")

if __name__ == "__main__":
    run_tests()
