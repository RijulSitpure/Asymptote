class Solution:
    def maximumCalories(self, heights: list[int]) -> int:
        # Start at 0, jump between pillars. Calories burnt = (h_next - h_curr)^2
        # Maximize sum of squared differences by alternating extremes
        h = sorted(heights)
        n = len(h)
        seq = [0]
        l, r = 0, n - 1
        turn = True
        while l <= r:
            if turn:
                seq.append(h[r])
                r -= 1
            else:
                seq.append(h[l])
                l += 1
            turn = not turn
        total = 0
        for i in range(len(seq) - 1):
            diff = seq[i + 1] - seq[i]
            total += diff * diff
        return total

def run_tests():
    sol = Solution()
    # heights = [1, 3] -> 0 -> 3 -> 1: (3-0)^2 + (1-3)^2 = 9 + 4 = 13
    assert sol.maximumCalories([1, 3]) == 13
    assert sol.maximumCalories([5]) == 25 # 0 -> 5 -> 25
    print("All tests passed for 3730.")

if __name__ == "__main__":
    run_tests()