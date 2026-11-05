class Solution:
    def minSensors(self, m: int, n: int, r: int) -> int:
        side = 2 * r + 1
        rows = (m + side - 1) // side
        cols = (n + side - 1) // side
        return rows * cols

def run_tests():
    sol = Solution()
    assert sol.minSensors(5, 5, 1) == 4
    assert sol.minSensors(3, 3, 1) == 1
    assert sol.minSensors(1, 1, 0) == 1
    print("All tests passed for 3648.")

if __name__ == "__main__":
    run_tests()
