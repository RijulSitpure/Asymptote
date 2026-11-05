class Solution:
    def totalWavinessII(self, low: int, high: int) -> int:
        def waviness(x: int) -> int:
            s = str(x)
            if len(s) < 3: return 0
            w = 0
            for i in range(1, len(s) - 1):
                p, c, n = int(s[i-1]), int(s[i]), int(s[i+1])
                if (c > p and c > n) or (c < p and c < n):
                    w += 1
            return w
            
        total = 0
        for x in range(low, high + 1):
            total += waviness(x)
        return total

def run_tests():
    sol = Solution()
    assert sol.totalWavinessII(130, 133) == 3
    assert sol.totalWavinessII(10, 20) == 0
    print("All tests passed for 3753.")

if __name__ == "__main__":
    run_tests()