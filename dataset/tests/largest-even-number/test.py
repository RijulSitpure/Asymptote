class Solution:
    def largestEven(self, s: str) -> str:
        for i in range(len(s) - 1, -1, -1):
            if int(s[i]) % 2 == 0:
                return s[:i + 1]
        return ""

def run_tests():
    sol = Solution()
    assert sol.largestEven("52") == "52"
    assert sol.largestEven("4206") == "4206"
    assert sol.largestEven("35427") == "3542"
    assert sol.largestEven("357") == ""
    print("All tests passed for 3798.")

if __name__ == "__main__":
    run_tests()
