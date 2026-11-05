class Solution:
    def totalWaviness(self, low: int, high: int) -> int:
        def waviness(x: int) -> int:
            s = str(x)
            if len(s) < 3:
                return 0
            w = 0
            for i in range(1, len(s) - 1):
                prev_d, cur_d, next_d = int(s[i - 1]), int(s[i]), int(s[i + 1])
                if (cur_d > prev_d and cur_d > next_d) or (cur_d < prev_d and cur_d < next_d):
                    w += 1
            return w
            
        total = 0
        for num in range(low, high + 1):
            total += waviness(num)
        return total

def run_tests():
    sol = Solution()
    # 132 has 1 peak at 3 -> waviness 1
    assert sol.totalWaviness(130, 133) == 3 # 130(1), 131(1), 132(1), 133(0) -> 3
    assert sol.totalWaviness(10, 20) == 0 # 2-digit numbers have waviness 0
    print("All tests passed for 3751.")

if __name__ == "__main__":
    run_tests()