from typing import List
import math

class Solution:
    def minimizeError(self, prices: List[str], target: int) -> str:
        floors = []
        fracs = []
        for p in prices:
            val = float(p)
            f = math.floor(val)
            floors.append(f)
            frac = val - f
            if frac > 1e-9:
                fracs.append(frac)

        min_sum = sum(floors)
        max_sum = min_sum + len(fracs)
        if target < min_sum or target > max_sum:
            return "-1"

        k = target - min_sum
        fracs.sort(reverse=True)
        total_error = sum(1.0 - fracs[i] for i in range(k)) + sum(fracs[i] for i in range(k, len(fracs)))
        return f"{total_error:.3f}"

def test():
    sol = Solution()
    assert sol.minimizeError(["0.700","2.800","4.900"], 8) == "1.000", "test 1 failed"
    assert sol.minimizeError(["1.500","2.500","3.500"], 10) == "-1", "test 2 failed"
    print("✓ minimize-rounding-error-to-meet-target passed")

if __name__ == "__main__":
    test()
