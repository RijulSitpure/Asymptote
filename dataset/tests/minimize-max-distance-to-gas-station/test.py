from typing import List

class Solution:
    def minmaxGasDist(self, stations: List[int], k: int) -> float:
        left = 0.0
        right = float(stations[-1] - stations[0])

        def possible(d: float) -> bool:
            count = 0
            for i in range(len(stations) - 1):
                count += int((stations[i + 1] - stations[i]) / d)
            return count <= k

        for _ in range(80):
            mid = (left + right) / 2.0
            if possible(mid):
                right = mid
            else:
                left = mid

        return left

def test():
    sol = Solution()
    ans1 = sol.minmaxGasDist([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 9)
    assert abs(ans1 - 0.5) < 1e-5, f"test 1 failed: {ans1}"
    ans2 = sol.minmaxGasDist([23, 24, 36, 65, 84], 14)
    assert abs(ans2 - 3.8) < 1e-4, f"test 2 failed: {ans2}"
    print("✓ minimize-max-distance-to-gas-station passed")

if __name__ == "__main__":
    test()
