class Solution:
    def checkIfExist(self, arr: list[int]) -> bool:
        seen = set()
        for x in arr:
            if 2 * x in seen or (x % 2 == 0 and x // 2 in seen):
                return True
            seen.add(x)
        return False

def test():
    sol = Solution()
    assert sol.checkIfExist([10,2,5,3]) == True, "test 1 failed"
    assert sol.checkIfExist([3,1,7,11]) == False, "test 2 failed"
    print("✓ check-if-n-and-its-double-exist passed")

if __name__ == "__main__":
    test()
