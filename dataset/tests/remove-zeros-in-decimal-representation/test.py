class Solution:
    def removeZeros(self, n: int) -> int:
        s = str(n).replace('0', '')
        return int(s) if s else 0

def run_tests():
    sol = Solution()
    assert sol.removeZeros(10203) == 123
    assert sol.removeZeros(100) == 1
    assert sol.removeZeros(5) == 5
    print("All tests passed for 3726.")

if __name__ == "__main__":
    run_tests()