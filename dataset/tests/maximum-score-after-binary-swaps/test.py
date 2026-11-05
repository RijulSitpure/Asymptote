class Solution:
    def maximumScore(self, s: str, values: list[int]) -> int:
        c = s.count('1')
        if c == 0:
            return 0
        values.sort(reverse=True)
        return sum(values[:c])

def run_tests():
    sol = Solution()
    assert sol.maximumScore("101", [10, 20, 30]) == 50 # 30 + 20 = 50
    assert sol.maximumScore("000", [1, 2, 3]) == 0
    assert sol.maximumScore("111", [5, 4, 3]) == 12
    print("All tests passed for 3781.")

if __name__ == "__main__":
    run_tests()
