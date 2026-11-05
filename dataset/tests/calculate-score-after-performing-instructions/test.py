class Solution:
    def calculateScore(self, instructions: list[str], values: list[int]) -> int:
        n = len(instructions)
        ans = 0
        i = 0
        seen = [False] * n
        while 0 <= i < n and not seen[i]:
            seen[i] = True
            if instructions[i] == "add":
                ans += values[i]
                i += 1
            elif instructions[i] == "jump":
                i += values[i]
        return ans

def run_tests():
    s = Solution()
    assert s.calculateScore(["add", "add", "jump"], [3, 2, -1]) == 5
    assert s.calculateScore(["jump", "add"], [2, 1]) == 0
    print("All tests passed for calculate-score-after-performing-instructions")

if __name__ == '__main__':
    run_tests()
